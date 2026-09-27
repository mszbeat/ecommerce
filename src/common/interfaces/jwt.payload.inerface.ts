import { UUID } from "crypto";

interface JwtPayloadInterface {
    sub: UUID,
    mobile: string,
    name: string
}

export default JwtPayloadInterface;