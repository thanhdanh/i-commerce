import { isEmpty } from "class-validator"
import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    if (isEmpty(password) || password.length < 8) {
        throw new Error('Password must be at least 8 characters.')
    }

    return hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
}