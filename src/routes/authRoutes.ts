import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { AuthController } from '../controller/authController';
import { AuthService } from '../service/authService';

const router: Router = Router();
const nx = new NxService();
const ds = new AuthService(nx);
const ctrl = new AuthController(ds);

router.post('/login', ctrl.login);

export default router;
