
import { Router } from 'express';
const router: Router = Router();

const passport = require('passport');

import authRoute from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import companyRoutes from "./routes/companyRoutes";
import brandRoutes from "./routes/brandRoutes";
import userRoutes from "./routes/userRoutes";
import customerRoutes from "./routes/customerRoutes";
//import cartRoutes from "./routes/sellerRoutes";
import orderRoutes from "./routes/orderRoutes";
import sellerRoutes from "./routes/sellerRoutes";


const passportJwt = passport.authenticate('jwt', { session: false });

router.use('/auth', authRoute);
router.use("/product", passportJwt, productRoutes);
router.use("/category", categoryRoutes);
router.use("/company", companyRoutes);
router.use("/brand", brandRoutes);
router.use("/user", userRoutes);
//router.use("/user", passportJwt, userRoutes);
router.use("/customer", passportJwt, customerRoutes);
//router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
//router.use("/seller", passportJwt, sellerRoutes);
router.use("/seller", sellerRoutes);
export default router;
