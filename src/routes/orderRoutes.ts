import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { OrderController } from '../controller/orderController';
import { OrderService } from '../service/orderService';

const router: Router = Router();
const nx = new NxService();
const ds = new OrderService(nx);
const ctrl = new OrderController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
