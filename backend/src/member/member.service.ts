import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberBodyDto } from './dto/create-member-body.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly cryptoService: CryptoService,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async addMember(createMemberDto: CreateMemberBodyDto): Promise<void> {
    const entity = new Member();

    entity.email = createMemberDto.email;

    if (createMemberDto.password) {
      entity.password = await this.cryptoService.hashPassword(
        createMemberDto.password,
      );
    }

    await this.memberRepository.save(entity);
  }

  findAll() {
    return `This action returns all member`;
  }

  async findOne(id: string) {
    const member = await this.memberRepository.findOne({
      where: {
        id,
      },
    });

    if (!member) {
      throw new NotFoundException();
    }

    return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
