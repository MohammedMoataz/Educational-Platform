import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { config } from 'dotenv'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
const SALT_ROUNDS = process.env.SALT_ROUNDS as string

/**
 * 
 * @param payload The payload to be encrypted.
 * @param callback The function to be called when the encrypted payload has been successfully
 * salt will be generated with the specified number of rounds and used.
 * 
 */
export const hash = async (payload: string | Buffer, callback?: (err: Error | null, encrypted: string) => void) =>
    await bcrypt.genSalt(parseInt(SALT_ROUNDS), async (err, salt) =>
        await bcrypt.hash(payload, salt, callback))

/**
 * 
 * @param data The data to be hashed.
 * @param hash The data to be compared against.
 * @param callback The callback to be called when the data is compared against the hash
 * 
 * @returns if that hash relevant to the data or not
 */
export const compareHashedData = (data: string, hash: string, callback?: (err: Error | null, result: boolean) => void) =>
    bcrypt.compare(data, hash, callback)

/**
 * Synchronously sign the given payload into a JSON Web Token string
 * 
 * @param payload Payload to sign, could be an literal, buffer or string
 * @param callback Callback function to call when the payload has been signed
 * 
 * @returns The JSON Web Token string
 */
export const generateAccessToken = (payload: string | Buffer | object, callback?: (err: Error | null, token: string) => void) =>
    Jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "8h" }, callback)

/**
* Synchronously sign the given payload into a JSON Web Token string
* 
* @param payload Payload to sign, could be an literal, buffer or string
* @param callback Callback function to call when the payload has been signed 
*
* @returns The JSON Web Token string
*/
export const generateRefreshToken = (payload: string | Buffer | object, callback?: (err: Error | null, token: string) => void) =>
    Jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "8h" }, callback)

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * 
 * @param token JWT string to verify
 * 
 * @returns The decoded token.
 */
export const verifyToken = (token: string, callback?: (err: Error | null, decoded: Jwt.JwtPayload | undefined) => void) =>
    Jwt.verify(token, ACCESS_TOKEN_SECRET, { complete: true }, callback)

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * 
 * @param token JWT string to verify
 * 
 * @returns The decoded token.
 */
export const verifyRefreshToken = (token: string, callback?: (err: Error | null, decoded: Jwt.JwtPayload | undefined) => void) =>
    Jwt.verify(token, REFRESH_TOKEN_SECRET, { complete: true }, callback)
