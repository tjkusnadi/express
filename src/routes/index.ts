import { Router } from 'express';
import healthcheckRoutes from './healthcheck';


const router = Router();

router.use('', healthcheckRoutes);

export default router;