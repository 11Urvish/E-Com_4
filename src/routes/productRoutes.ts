import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { ProductController } from '../controller/productController';
import { ProductService } from '../service/productService';

const router: Router = Router();
const nx = new NxService();
const ds = new ProductService(nx);
const ctrl = new ProductController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
