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
import { UserService } from './user.service';
import { CreateUserDto } from '../../dto'
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async userList(@Query() query) {
    const res = await this.userService.findList(query);
    console.log(res);
    return res;
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const role = await this.userService.findAdminRole();
    Object.assign(body, { role });
    return this.userService.createUser(body);
  }

  @Post('role')
  async createRole(@Body() body) {
    return await this.userService.createRole(body);
  }

  @Get('role')
  async roleList(@Query() query) {
    return await this.userService.findRole(query);
  }

  @Delete('role/:id')
  async deleteRole(@Param() { id }) {
    await this.userService.deleteRole(id);
    return 'success';
  }
}
