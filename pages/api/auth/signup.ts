/* import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'; */
import {hash} from 'bcryptjs';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({
	log: ['query'],
});

export default async function handler(req, res) {
	if (req.method === 'POST') {
		if (!req.body) return res.status(404).json({error: "Don't have form data...!"});
		if (!req.body) {
			console.log('data');
		}
		const {name, email, password} = req.body;

		const checkexisting = await prisma.user.findUnique({
			where: {email: email},
		});
		if (checkexisting) return res.status(409).json({message: 'User Already Exists...!'});

		var hashpassword = await hash(password, 12);
		try {
			const user = await prisma.user.create({
				data: {name, email, password: hashpassword},
			});

			res.status(201).json({status: true, user});
		} catch (err) {
			console.error(err);
		}

		res.end();
	} else {
		res.status(500).json({message: 'HTTP method not valid only POST Accept'});
	}
}
