import { Player } from '@core/domain/entities/player.entity';
import { IFindPlayerInputDTO } from '@core/domain/entities/repositories/dtos/find-player-input.dto';
import { IPlayersRepository } from '@core/domain/entities/repositories/players.repository';
import { PrismaProvider } from '@framework/infra/database/prisma/prisma.provider';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlayersRepository implements IPlayersRepository {
  constructor(
    @Inject(PrismaProvider) private readonly prisma: PrismaProvider,
  ) {}

  async insert(player: Player): Promise<Player> {
    const createdPlayer = await this.prisma.player.create({
      data: {
        ...player.getData,
        password: player.getPassword.getValue,
      },
    });

    return Player.restore(createdPlayer);
  }

  async delete(player: Player): Promise<void> {
    await this.prisma.player.delete({
      where: { id: player.getData.id },
    });
  }

  async save(player: Player): Promise<Player> {
    const updatedPlayer = await this.prisma.player.update({
      data: {
        ...player.getData,
        password: player.getPassword.getValue,
      },
      where: {
        id: player.getData.id,
      },
    });

    return Player.restore(updatedPlayer);
  }

  async find({ username, id }: IFindPlayerInputDTO): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: { username, id },
    });

    if (!player) {
      return null;
    }

    return Player.restore(player);
  }
}