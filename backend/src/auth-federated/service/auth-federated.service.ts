import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FederatedCredential } from '../entity/federated-credential.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Member } from '../../member/entity/member.entity';
import { CreateMemberBodyDto } from '../../member/dto/create-member-body.dto';
import { AuthFederateProfile } from '../interface/auth-federate.interface';
import { AuthFederateEnum } from '../enum/auth-federate.enum';

@Injectable()
export class AuthFederatedService {
  constructor(
    @InjectRepository(FederatedCredential)
    private readonly federatedCredentialRepository: Repository<FederatedCredential>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    private readonly dataSource: DataSource,
  ) {}

  async validate(
    type: AuthFederateEnum,
    profile: AuthFederateProfile,
  ): Promise<Member> {
    return this.dataSource.transaction(async (manager) => {
      const federatedCredential = await manager.findOne(FederatedCredential, {
        where: {
          profileId: profile.profileId,
          type,
        },
        relations: ['member'],
      });

      if (federatedCredential) {
        return federatedCredential.member;
      }

      return this.joinMember(type, profile, manager);
    });
  }

  private async joinMember(
    type: AuthFederateEnum,
    profile: AuthFederateProfile,
    manager: EntityManager,
  ): Promise<Member> {
    const member = await this.addMember(profile, manager);
    await this.addFederatedCredential(type, profile, member, manager);
    return member;
  }

  private async addFederatedCredential(
    type: AuthFederateEnum,
    profile: AuthFederateProfile,
    member: Member,
    manager: EntityManager,
  ): Promise<void> {
    const federatedCredential = new FederatedCredential();
    federatedCredential.type = type;
    federatedCredential.profileId = profile.profileId;
    federatedCredential.member = member;

    await manager.save(federatedCredential);
  }

  private async addMember(
    profile: AuthFederateProfile,
    manager: EntityManager,
  ): Promise<Member> {
    const member = new Member();
    member.email = profile.email;

    await manager.save(member);
    return member;
  }
}
