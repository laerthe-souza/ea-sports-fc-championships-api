import { EnvironmentConfigModule } from '@framework/modules/environment-config.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { CustomLoggerModule } from './custom-logger.module';
import { DatabaseModule } from './database.module';
import { HealthModule } from './health/health.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    CustomLoggerModule,
    EnvironmentConfigModule,
    DatabaseModule,
    HealthModule,
    PlayersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
