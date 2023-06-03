import { Injectable } from '@nestjs/common';
import { CreateMemberBodyDto } from './dto/create-member.dto';
import { UpdateMemberBodyDto } from './dto/update-member.dto';
import { EntityManager } from 'typeorm';
import { MemberEntity } from './entity/member.entity';
import { CryptoService } from '../crypto/crypto.service';
import { MemberAlreadyExistException } from './exception/member-already-exist.exception';
import { FieldError } from '../common/error/field.error';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly memberRepository: MemberRepository,
  ) {}

  async addMember(
    createMemberDto: CreateMemberBodyDto,
    manager: EntityManager,
  ): Promise<void> {
    await this.checkExistEmailOrFail(createMemberDto.email, manager);

    const hashedPassword = await this.createHashPassword(
      createMemberDto.password,
    );

    const member = MemberEntity.new({
      email: createMemberDto.email,
      password: hashedPassword,
      firstName: createMemberDto.firstName,
      lastName: createMemberDto.lastName,
    });

    await manager.save(member);
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberBodyDto,
    manager: EntityManager,
  ) {
    const member = await this.memberRepository.findOneByIdOrFail(id, manager);

    member.firstName = updateMemberDto.firstName;
    member.lastName = updateMemberDto.lastName;

    await manager.save(member);
  }

  async remove(id: string, manager: EntityManager) {
    const member = await this.memberRepository.findOneByIdOrFail(id, manager);

    await manager.softRemove(member);
  }

  private async checkExistEmailOrFail(email: string, manager: EntityManager) {
    const existMember = await this.memberRepository.findOneByEmail(
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
