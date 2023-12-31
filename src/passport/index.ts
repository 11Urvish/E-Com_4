import * as passportJwt from 'passport-jwt';
import CONFIG from '../config/config';
import UserModel from '../model/userModel';
import SellerModel from '../model/sellerModel';

const JwtStrategy = passportJwt.Strategy;
module.exports = (passport: any) => {
  console.log(CONFIG.JWT_SECRET);
  const opts = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserModel.findById(jwt_payload.sub);
        // const seller = await SellerModel.findById(jwt_payload.sub);
        if (user) {
          const reqData = {
            cid: user.company_id,
            uid: user.id,
            // seltype: seller.seller_type,
            utype: user.user_type,
          };
          return done(null, reqData, { scope: 'read' });
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
