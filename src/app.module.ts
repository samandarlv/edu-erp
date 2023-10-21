import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { StudentsModule } from "./students/students.module";
import { RoleModule } from './role/role.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    StudentsModule,
    AuthModule,
    AdminModule,
    StudentsModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
