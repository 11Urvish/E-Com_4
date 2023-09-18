import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { CategoryController } from '../controller/categoryController';
import { CategoryService } from '../service/categoryService';

const router: Router = Router();
const nx = new NxService();
const ds = new CategoryService(nx);
const ctrl = new CategoryController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
