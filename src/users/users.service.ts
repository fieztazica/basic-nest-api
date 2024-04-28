import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findOneByEmailOrUsername(query: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username: query }, { email: query }],
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOneById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findOneByUuid(uuid: string) {
    return this.prismaService.user.findUnique({ where: { uuid } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
