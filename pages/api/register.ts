import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { sessionOptions } from 'lib/session';

const prisma = new PrismaClient();
const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = await req.body;
    const { name, username, password } = JSON.parse(body);

    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (user) {
            return res.status(403).json({ message: 'Username already exists' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username: username,
                name: name,
                password: encryptedPassword,
            },
        });

        return res.status(200).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export default withIronSessionApiRoute(register, sessionOptions);
