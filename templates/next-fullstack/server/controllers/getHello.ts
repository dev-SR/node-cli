import catchAsyncErrors from '@server/middleware/catchAsyncErrors';
import type { NextApiRequest, NextApiResponse } from 'next';
type Data = {
	name: string;
};

export const getHello = catchAsyncErrors(
	async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
		const user = await prisma?.user.findFirst();
		user?.role;

		res.status(200).json({ name: 'John Doe' });
	}
);
