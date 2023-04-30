import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/gaurds/gaurd.access_token';
import { RefreshTokenGuard } from 'src/common/gaurds/gaurd.refresh_token';
import { AuthDto } from 'src/_dtos/auth.dto';
import { CreateUserDto } from 'src/_dtos/create_user.dto';
import { AuthRequest } from 'src/_types/req.auth.interface';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: AuthRequest) {
    this.authService.logout(req.user['sub']);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: AuthRequest) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}