import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./model/user.entity";
import { UsersRepository } from "./users.repository";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    private logger = new Logger();
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.usersRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        const canSignIn = user ? await bcrypt.compare(password, user.password): false;
        if (canSignIn) {
            const payload: JwtPayload = { username }; // Custom payload
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Name or password are incorrect');
        }
    }
}