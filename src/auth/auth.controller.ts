import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { LoggerPipe } from "./pipes/logger.pipe";
import { User } from "./model/user.entity";

@Controller('auth')
export class AuthController {
constructor(
     private authservice: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(LoggerPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        console.log('AuthCreedentials', authCredentialsDto);
        return this.authservice.signUp(authCredentialsDto);
        //return Promise.resolve();
    }

    /* @Post('/signin')
    signIn(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return this.authservice.signIn(authCredentialsDto);
    } */
}