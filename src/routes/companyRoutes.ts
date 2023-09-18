import { Router } from 'express';
import { NxService } from '../shared/nx-library/nx-service';
import { CompanyController } from '../controller/companyController';
import { CompanyService } from '../service/companyService';

const router: Router = Router();
const nx = new NxService();
const ds = new CompanyService(nx);
const ctrl = new CompanyController(ds);

router.get('/findById', ctrl.findById);
router.post('/findAll', ctrl.findAll);
router.post('/create', ctrl.create);
router.post('/update', ctrl.update);
router.post('/delete', ctrl.delete);

export default router;
