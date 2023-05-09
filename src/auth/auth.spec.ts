import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../_tests/utils/mongo/mongo_in_memory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

describe('AuthController', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        PassportModule,
        JwtModule.register({}),
        UsersModule,
      ],
      controllers: [AuthController],
      providers: [
        ConfigService,
        AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
      ],
    }).compile();
    authController = app.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
