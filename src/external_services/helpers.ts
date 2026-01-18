import jwt from 'jsonwebtoken'
import { Settings } from '../config/settings.js'
export function makeToken(
    secret: string,
    expiresInMinutes?: number | undefined,
) {
    if(expiresInMinutes === undefined) expiresInMinutes = 5
    if (expiresInMinutes > 10) {
        throw new Error('Token expiration time cannot exceed 10 minutes')
    }
    if (!secret) {
        throw new Error('Secret is required to generate a token')
    }
    return jwt.sign(
       {
            aud: 'doordash',
            iss: process.env.DOORDASH_DEVELOPER_ID,
            kid: process.env.DOORDASH_KEY_ID,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 5), // 5 mins
        },
        secret,
        {
            expiresIn: `${expiresInMinutes}m`,
        }
    )
}
