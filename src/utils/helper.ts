import * as bcrypt from "bcrypt"
import {
    sign,
    verify,
    JwtPayload
} from "jsonwebtoken"
import { config } from 'dotenv'

config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
const SALT_ROUNDS = process.env.SALT_ROUNDS as string

/**
 * Encrypts a payload using bcrypt.
 *
 * @param payload The payload to be encrypted.
 * @param callback The function to be called when the encrypted payload has been successfully
 * generated. The callback will be passed two arguments: an error (which will be null if there were
 * no errors), and the encrypted payload.
 */
export const hashData = async (
    payload: string | Buffer,
    callback?: (err: Error | null, encrypted: string) => void
): Promise<string> => {
    // Generate a salt with the specified number of rounds.
    const saltRounds = parseInt(SALT_ROUNDS)
    const salt = await new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            err ? reject(err) : resolve(salt)
        })
    })

    console.log({ payload, salt })
    // Generate the hashed payload using the generated salt.
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(payload, salt, (err, encrypted) => {
            err ? reject(err) : resolve(encrypted)
        })
    })
        .then((encrypted) => {
            // If a callback was specified, call it with the encrypted payload.
            if (callback) callback(null, encrypted)

            // Always return the encrypted payload.
            return encrypted
        })
}

/**
 * Compares a piece of data against a hash to see if the hash is relevant to the data.
 * 
 * @param data The data to be compared against the hash. This should be the data that was originally
 * hashed. The data can be a string or a Buffer.
 * @param hash The hash to be compared against. This should be the hash that was generated when the
 * data was originally hashed.
 * 
 * @returns Nothing. The result of the comparison will be returned via a callback.
 */
export const compareHashedData = async (
    data: string,
    encrypted: string
): Promise<boolean> =>
    await bcrypt.compare(data, encrypted)

/**
 * Synchronously sign the given payload into a JSON Web Token string
 * 
 * @param payload Payload to sign, could be an literal, buffer or string
 * @param callback Callback function to call when the payload has been signed
 * 
 * @returns Nothing. The JSON Web Token string will be returned via a callback.
 */
export const generateAccessToken = (
    payload: string | Buffer | object,
    callback: (err: Error | null, token: string) => void
): void => {
    /**
     * Sign the given payload into a JSON Web Token string.
     * 
     * The generated token will expire in 7 days.
     */
    sign(
        payload, // Payload to sign
        ACCESS_TOKEN_SECRET, // Secret to sign the payload with
        { expiresIn: '7d' }, // Expiration time of the token
        (err, token) => callback(err, token) // Callback function
    )
}

/**
 * Synchronously sign the given payload into a JSON Web Token string
 * 
 * @param payload Payload to sign, could be an literal, buffer or string
 * @param callback Callback function to call when the payload has been signed
 * 
 * @returns Nothing. The JSON Web Token string will be returned via a callback.
 */
export const generateRefreshToken = (
    payload: string | Buffer | object,
    callback: (err: Error | null, token: string) => void
): void => {
    /**
     * Sign the given payload into a JSON Web Token string.
     * 
     * The generated token will expire in 7 days.
     */
    sign(
        payload, // Payload to sign
        REFRESH_TOKEN_SECRET, // Secret to sign the payload with
        { expiresIn: '7d' }, // Expiration time of the token
        (err, token) => callback(err, token) // Callback function
    )
}

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * 
 * @param token JWT string to verify
 * @param callback Callback function to call when the token has been verified. It will be
 * called with two arguments: an error (if verification failed) and the decoded token (if
 * verification succeeded)
 * 
 * @returns Nothing. The decoded token will be returned via the callback function.
 */
export const verifyToken = (
    token: string,
    callback: (err: Error | null, decoded: JwtPayload | undefined) => void
): void =>
    verify(
        token, // JWT string to verify
        ACCESS_TOKEN_SECRET, // Secret or public key to verify the token with
        { complete: true }, // Options for verification (see https://github.com/auth0/node-jsonwebtoken)
        (err, decoded) => callback(err, decoded) // Callback function
    )

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * 
 * @param token JWT string to verify
 * @param callback Callback function to call when the token has been verified. It will be
 * called with two arguments: an error (if verification failed) and the decoded token (if
 * verification succeeded)
 * 
 * @returns Nothing. The decoded token will be returned via the callback function.
 */
export const verifyRefreshToken = (
    token: string,
    callback: (err: Error | null, decoded: JwtPayload | undefined) => void
): void =>
    verify(
        token, // JWT string to verify
        REFRESH_TOKEN_SECRET, // Secret or public key to verify the token with
        { complete: true }, // Options for verification (see https://github.com/auth0/node-jsonwebtoken)
        (err, decoded) => callback(err, decoded) // Callback function
    )
