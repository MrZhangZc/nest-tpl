import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { saveToQiNIu } from '../../util';

@Controller('/')
export class CommonController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async getToken(@UploadedFile() file: any) {
    const res = await saveToQiNIu(file, 'temp.jpg');
    return res;
  }
}
