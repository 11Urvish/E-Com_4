import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { SellerController } from '../controller/sellerController';
import { SellerService } from '../service/sellerService';

const router: Router = Router();
const nx = new NxService();
const ds = new SellerService(nx);
const ctrl = new SellerController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
