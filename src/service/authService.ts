import { UnauthorizedAccessErrorResult } from "../core/error-result";
import { IResponseType } from "../core/IResponseType.interface";
import UserModel from "../model/userModel";
import { MESSAGE } from "../shared/constants/app.const";
import { APP_ENUM } from "../shared/enums/app.enum";
import { NxService } from "../shared/nx-library/nx-service";



export class AuthService {

    constructor(private nx: NxService) { }

    /**
     * @name login
     */
    login = async (params: any): Promise<IResponseType> => {
        try {
            const USER_STATUS = APP_ENUM.STATUS.USER;
            let response: IResponseType;
            const { username, password } = params;

            // find user by email or mobile
            const findUser = await UserModel.findOne({
                $or: [{ email: username }, { phoneNo: username }]
            }).select(' firstName lastName gender email phoneNo user_type password status');

            if (!findUser) {
                throw new UnauthorizedAccessErrorResult(APP_ENUM.ERROR_CODE.NOT_FOUND, MESSAGE.INVALID_CREDENTIAL);
            } else if (findUser && findUser.status !== USER_STATUS.ACTIVE) {
                if (findUser.status === USER_STATUS.BLOCKED || findUser.user_type !== APP_ENUM.TYPE.USER.USER) {
                    throw new UnauthorizedAccessErrorResult(APP_ENUM.ERROR_CODE.NOT_FOUND, MESSAGE.ACCOUNT_BLOCKED);
                } else {
                    throw new UnauthorizedAccessErrorResult(APP_ENUM.ERROR_CODE.NOT_FOUND, MESSAGE.ACCOUNT_IN_ACTIVE);
                }
            }
            const isPasswordVerified = await this.nx.crypto.verifyPassword(findUser.password, password);
            if (!isPasswordVerified) {
                throw new UnauthorizedAccessErrorResult(APP_ENUM.ERROR_CODE.NOT_FOUND, MESSAGE.INVALID_CREDENTIAL);
            }

            const token = await this.nx.crypto.getToken(findUser);

            const userInfo = {
                id: findUser._id,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                email: findUser.email,
                phoneNo: findUser.phoneNo,
                user_type: findUser.user_type,
                gender: findUser.gender,
                status: findUser.status,

            };
            response = { data: { user: userInfo, token }, message: MESSAGE.LOGIN };
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

}