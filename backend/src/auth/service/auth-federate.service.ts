import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FederatedCredential } from '../entity/federated-credential.entity';
import { Repository } from 'typeorm';
import { Member } from '../../member/entity/member.entity';

@Injectable()
export class AuthFederateService {
  constructor(
    @InjectRepository(FederatedCredential)
    private readonly federatedCredentialRepository: Repository<FederatedCredential>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async validate(profileId: string): Promise<Member> {
    let federatedCredential = await this.federatedCredentialRepository.findOne({
      where: {
        profileId,
      },
      relations: ['member'],
    });

    if (federatedCredential === null) {
      federatedCredential = new FederatedCredential();
    }

    return federatedCredential.member;
  }
}
