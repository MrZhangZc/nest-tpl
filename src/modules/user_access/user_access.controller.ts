import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { Role, User } from '../../secmas';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../../dto'

@Controller('/')
export class UserAccessController {
  constructor(private readonly userAccessService: UserAccessService) {}

  @Post('login')
  async login(@Body() {account, password}: CreateUserDto) {
    const user:any = await this.userAccessService.findUser({account});
    const trueUser = await user.conparePassword(password)
    if (trueUser) {
      return {
        token: await this.userAccessService.getToken({
          account,
          id: user._id,
          role: user.role.access,
        }),
      };
    } else {
      return {
        state: 400,
        msg: '用户名或密码错误',
      };
    }
  }

  @Post('role')
  async createRole(@Body() body: any) {
    return this.userAccessService.createRole(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/current')
  async current(@Request() request) {
    return await this.userAccessService.findUser({ account: 'zzchm' });
  }
}
