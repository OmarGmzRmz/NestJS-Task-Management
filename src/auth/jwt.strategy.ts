import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "./model/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {
        super({
            secretOrKey: 'cualquierpedoxnxx',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User =  await this.usersRepository.findOne({ username });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}