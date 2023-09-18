import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { CustomerController } from '../controller/customerController';
import { CustomerService } from '../service/customerService';

const router: Router = Router();
const nx = new NxService();
const ds = new CustomerService(nx);
const ctrl = new CustomerController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
