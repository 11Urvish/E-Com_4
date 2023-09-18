import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { BrandController } from '../controller/brandController';
import { BrandService } from '../service/brandService';

const router: Router = Router();
const nx = new NxService();
const ds = new BrandService(nx);
const ctrl = new BrandController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
