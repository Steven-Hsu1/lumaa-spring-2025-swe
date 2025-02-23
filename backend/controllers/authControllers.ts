import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { createUser, getUserByUsername } from '../models/authModels';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const user = await createUser(username, password);
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token, user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
    }
};