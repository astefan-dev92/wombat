import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import { sessionOptions } from 'lib/session';

const prisma = new PrismaClient();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = await req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.user = { ...user, isLoggedIn: true };

        await req.session.save();

        res.json(req.session.user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export default withIronSessionApiRoute(login, sessionOptions);
