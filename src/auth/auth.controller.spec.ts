import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenGuard } from '../common/gaurds/gaurd.access_token';
import { RefreshTokenGuard } from '../common/gaurds/gaurd.refresh_token';
import { UsersModule } from '../users/users.module';
import { AuthDtoStub } from '../_tests/stubs/auth.dto.stub';
import { CreateUserDtoStub } from '../_tests/stubs/create_user.dto.stub';
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
  let authService: AuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        PassportModule,
        JwtModule.register({
          secret: process.env.ACCESS_TOKEN_SECRET,
        }),
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
    authService = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
  });
  it('authController should be defined', () => {
    expect(authController).toBeDefined();
  });
  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('signin should throw error when user not found', async () => {
    await expect(authService.signIn(AuthDtoStub())).rejects.toThrowError(
      'User does not exist',
    );
  });
  it('authService should be defined', async () => {
    await expect(
      authService.signUp(CreateUserDtoStub()),
    ).resolves.toHaveProperty('accessToken');
  });
  it('signin should not throw error after sign up', async () => {
    const result = await authController.signin(AuthDtoStub());
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('name');
    expect(jwtService.verify(result.accessToken)).toBeTruthy();
  });
  it('should ensure the AccessTokenGuard is applied to the logout', async () => {
    const guards = Reflect.getMetadata(
      '__guards__',
      AuthController.prototype.logout,
    );
    const guard = new guards[0]();
    expect(guard).toBeInstanceOf(AccessTokenGuard);
  });
  it('should ensure that logout returns true after passing the id of the user', async () => {
    const signinResult = await authController.signin(AuthDtoStub());
    const jwt = jwtService.verify(signinResult.accessToken);
    await expect(authController.logout(jwt.sub)).resolves.toBe(true);
  });
  it('should ensure the RefreshTokenGuard is applied to the refresh', async () => {
    const guards = Reflect.getMetadata(
      '__guards__',
      AuthController.prototype.refreshTokens,
    );
    const guard = new guards[0]();
    expect(guard).toBeInstanceOf(RefreshTokenGuard);
  });
  it('should ensure that refresh returns updated login response with a valid refreshToken', async () => {
    const signinResult = await authController.signin(AuthDtoStub());
    const jwt = jwtService.verify(signinResult.accessToken);
    const refreshTokenResult = await authController.refreshTokens(
      jwt.sub,
      signinResult.refreshToken,
    );
    expect(refreshTokenResult).toHaveProperty('accessToken');
    expect(refreshTokenResult).toHaveProperty('refreshToken');
    expect(refreshTokenResult).toHaveProperty('id');
    expect(refreshTokenResult).toHaveProperty('email');
    expect(refreshTokenResult).toHaveProperty('name');
    expect(jwtService.verify(refreshTokenResult.accessToken)).toBeTruthy();
  });
  afterAll(async () => {
    await closeInMongodConnection();
  });
});
