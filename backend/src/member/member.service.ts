import { Injectable } from '@nestjs/common';
import { CreateMemberBodyDto } from './dto/create-member-body.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { EntityManager } from 'typeorm';
import { Member } from './entity/member.entity';
import { CryptoService } from '../crypto/crypto.service';
import { MemberQueryService } from './service/member-query.service';
import { MemberAlreadyExistException } from './exception/member-already-exist.exception';
import { FieldError } from '../common/error/field.error';

@Injectable()
export class MemberService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly memberQueryService: MemberQueryService,
  ) {}

  async addMember(
    createMemberDto: CreateMemberBodyDto,
    manager: EntityManager,
  ): Promise<void> {
    await this.checkExistEmailOrFail(createMemberDto.email, manager);

    const hashedPassword = await this.createHashPassword(
      createMemberDto.password,
    );

    const member = Member.new({
      email: createMemberDto.email,
      password: hashedPassword,
      firstName: createMemberDto.firstName,
      lastName: createMemberDto.lastName,
    });

    await manager.save(member);
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
    manager: EntityManager,
  ) {
    const member = await this.memberQueryService.findOneOrFail(id, manager);

    member.firstName = updateMemberDto.firstName;
    member.lastName = updateMemberDto.lastName;

    await manager.save(member);
  }

  async remove(id: string, manager: EntityManager) {
    const member = await this.memberQueryService.findOneOrFail(id, manager);

    await manager.softRemove(member);
  }

  private async checkExistEmailOrFail(email: string, manager: EntityManager) {
    const existMember = await this.memberQueryService.findByEmail(
      email,
      manager,
    );

    if (existMember) {
      throw new MemberAlreadyExistException([
        new FieldError('email', email, '이미 사용 중인 이메일입니다.'),
      ]);
    }
  }

  private async createHashPassword(password: string) {
    return this.cryptoService.hashPassword(password);
  }
}
