import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from "../../users/users.service.js";
import { ConfigService } from "@nestjs/config";
import { User } from "../../users/entities/user.entity.js";
import { UUID } from "crypto";
import { ERROR_MESSAGES } from "../../common/constants/messages.js";
import JwtPayloadInterface from "../../common/interfaces/jwt.payload.inerface.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET")!,

        })
    }
    async validate(payload: JwtPayloadInterface): Promise<User> {
        const user = await this.userService.findOneById(payload.sub);
        if (!user) {
            throw ERROR_MESSAGES.USERS.userNotFound;
        }
        return user;
    }
}