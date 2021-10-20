import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStategy } from "./jwt.strategy";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'cualquierpedoxnxx',
            signOptions: {
                expiresIn: 3600
            }
        }),
        TypeOrmModule.forFeature([UsersRepository]),
        ConfigModule
    ],
    providers: [AuthService, JwtStategy],
    controllers: [AuthController],
    exports: [JwtStategy, PassportModule]
})
export class AuthModule {}