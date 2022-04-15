import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js";

export async function signUp(name, email, password) {
    const existingUsers = authRepository.getUserInfo(email);

    if (existingUsers.rowCount > 0) {
        throw { type: "conflict", message: "Email already being used" }
    }

    const hashedPassword = encryptedPassword(password);

    authRepository.createUser(name, email, hashedPassword);
}

export async function encryptedPassword(password) {
    return bcrypt.hashSync(password, 12);
}

export async function signIn(email, password) {
    const { rows } = await authRepository.getUserInfo(email);

    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw { type: "unauthorized", message: "Senha incorreta" }
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );

    return { token };
}

export async function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}