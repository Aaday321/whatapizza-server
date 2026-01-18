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
            service: Settings.SERVICE_NAME,
            timestamp: Date.now()
        },
        secret,
        {
            expiresIn: `${expiresInMinutes}m`,
        }
    )
}
