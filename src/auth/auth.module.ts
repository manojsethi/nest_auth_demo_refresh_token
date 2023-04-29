import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

// const jwtFactory = {
//   useFactory: async (configService: ConfigService) => ({
//     secret: configService.get('ACCESS_TOKEN_SECRET'),
//     signOptions: {
//       expiresIn: configService.get('ACCESS_TOKEN_EXPIRATION'),
//     },
//   }),
//   inject: [ConfigService],
// };
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
