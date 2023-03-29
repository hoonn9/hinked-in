import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entity/member.entity';
import { EntityManager, Repository } from 'typeorm';
import { CoreQueryService } from '../../common/service/core-query.service';
import { MemberNotExistException } from '../exception/member-not-exist.exception';

@Injectable()
export class MemberQueryService extends CoreQueryService<Member> {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {
    super(memberRepository);
  }

  async findOneOrFail(id: string, manager?: EntityManager) {
    const member = await this.createQueryBuilder('member', manager)
      .where('id = :id', { id })
      .getOne();

    if (member == null) {
      throw new MemberNotExistException();
    }

    return member;
  }

  async findByEmail(email: string, manager?: EntityManager) {
    return this.createQueryBuilder('member', manager)
      .where('email = :email', { email })
      .getOne();
  }
}