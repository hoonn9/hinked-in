import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FederatedCredentialEntity } from '../entity/federated-credential.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { MemberEntity } from '../../../member/entity/member.entity';
import { AuthFederateProfile } from '../interface/auth-federate.interface';
import { AuthFederateEnum } from '../enum/auth-federate.enum';

@Injectable()
export class AuthFederatedService {
  constructor(
    @InjectRepository(FederatedCredentialEntity)
    private readonly federatedCredentialRepository: Repository<FederatedCredentialEntity>,

    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async validate(
    type: AuthFederateEnum,
    profile: AuthFederateProfile,
  ): Promise<MemberEntity> {
    return this.dataSource.transaction(async (manager) => {
      const federatedCredential = await manager.findOne(
        FederatedCredentialEntity,
        {
          where: {
            profileId: profile.profileId,
            type,
          },
          relations: ['member'],
        },
      );

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
  ): Promise<MemberEntity> {
    const member = await this.addMember(profile, manager);
    await this.addFederatedCredential(type, profile, member, manager);
    return member;
  }

  private async addFederatedCredential(
    type: AuthFederateEnum,
    profile: AuthFederateProfile,
    member: MemberEntity,
    manager: EntityManager,
  ): Promise<void> {
    const federatedCredential = new FederatedCredentialEntity();
    federatedCredential.type = type;
    federatedCredential.profileId = profile.profileId;
    federatedCredential.member = member;

    await manager.save(federatedCredential);
  }

  private async addMember(
    profile: AuthFederateProfile,
    manager: EntityManager,
  ): Promise<MemberEntity> {
    const member = MemberEntity.new({
      email: profile.email,
      firstName: profile.name.firstName,
      lastName: profile.name.lastName,
    });

    await manager.save(member);
    return member;
  }
}
