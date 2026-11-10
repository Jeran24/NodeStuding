import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { createAccount, findByEmail, saveSession, deleteSession } from '../module/auth.js';

export async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        if (role !== 'adder' && role !== 'remover') {
            return res.status(400).json({ message: "Role must be adder or remover" });
        }

        const hash = await bcrypt.hash(password, 10);
        const id = await createAccount(name, email, hash, role);
        res.status(201).json({ message: "User registered", id });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "server error try again!" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = randomUUID();
    await saveSession(token, user.id);
    res.json({ message: "Login successful", token });
}

export async function logout(req, res) {
    await deleteSession(req.token);
    res.json({ message: "Logged out" });
}