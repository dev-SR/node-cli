import { protect } from '@server/middleware/auth-protect';
import { handler } from '@server/handler';
import { getHello } from '@server/controllers/getHello';

handler.use(protect).get(getHello);

export default handler;
