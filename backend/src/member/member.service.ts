import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberBodyDto } from './dto/create-member-body.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberBodyDto) {
    const entity = this.memberRepository.create({});

    entity.email = createMemberDto.email;
    entity.password = createMemberDto.password;

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
