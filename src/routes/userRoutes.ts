import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { UserController } from '../controller/userController';
import { UserService } from '../service/userService';

const router: Router = Router();
const nx = new NxService();
const ds = new UserService(nx);
const ctrl = new UserController(ds);


router.post('/register', ctrl.register);
router.post('/findAll', ctrl.findAll);
router.post('/findById', ctrl.findById);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);
router.post('/updateProfile', ctrl.updateProfile);
router.post('/changePassword', ctrl.changePassword);


export default router;
