import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import {
  UserAccessModule,
  UserModule,
  CommonModule,
} from './modules';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      connectionFactory: connection => {
        connection.plugin(require('@meanie/mongoose-to-json'));
        return connection;
      },
    }),
    UserAccessModule,
    UserModule,
    CommonModule,
  ],
})
export class AppModule {}
