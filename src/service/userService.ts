

import { IResponseType } from '../core/IResponseType.interface';
import { UnauthorizedAccessErrorResult } from '../core/error-result';
import UserModel from '../model/userModel';
import { MESSAGE } from '../shared/constants/app.const';
import { NxService } from '../shared/nx-library/nx-service';
import { APP_ENUM } from "../shared/enums/app.enum";



export class UserService {
    constructor(private nx: NxService) { }


    /**
     * @name create
     * @param {Object} params
     */
    register = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            console.log('params', params);

            const { firstName, lastName, email, phoneNo, gender, password, status } = params;

            const findUser = await UserModel.findOne({ $or: [{ email }, { phoneNo }] });
            if (findUser) {
                throw new UnauthorizedAccessErrorResult(
                    APP_ENUM.TYPE.ERROR.CONFLICT,
                    MESSAGE.DUPLICATE_PHONE
                );
            }
            const passwordHash = await this.nx.crypto.hashPassword(password);

            const userModel = new UserModel({
                firstName, lastName, email, phoneNo, gender,
                user_type: APP_ENUM.TYPE.USER.USER, status: +status, password: passwordHash,
            });
            const registerUser = await userModel.save();
            response = { data: registerUser, message: MESSAGE.CREATE };
            return response;
        } catch (error) {
            throw error;
        }
    };
    // register = async (params: any): Promise<IResponseType> => {
    //     try {
    //         let response: IResponseType;
    //         const { firstName, lastName, gender, email, phoneNo, password, status } = params;

    //         const findUser = await UserModel.findOne({ $or: [{ email }, { phoneNo }] });
    //         if (findUser) {
    //             throw new UnauthorizedAccessErrorResult(
    //                 APP_ENUM.TYPE.ERROR.CONFLICT,
    //                 MESSAGE.DUPLICATE_PHONE
    //             );
    //         }
    //         const passwordHash = await this.nx.crypto.hashPassword(password);
    //         const userModel = new UserModel({
    //             firstName, lastName, email, gender, phoneNo,
    //             user_type: APP_ENUM.TYPE.USER.USER,
    //             status: +status,
    //             password: passwordHash,

    //         });
    //         const registerUser = await userModel.save();
    //         response = { data: registerUser, message: MESSAGE.CREATE };
    //         return response;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }

    findAll = async (_params: any): Promise<IResponseType> => {
        // eslint-disable-next-line no-useless-catch
        try {
            let response: IResponseType;
            const data = await UserModel.find();
            console.log(data);
            response = {
                message: MESSAGE.GET,
                data: data
            };
            return response;
        } catch (error: any) {
            throw error;
        }
    }

    /**
 * @name findById
 * @param {Object} params 
 */
    findById = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            const result = await UserModel.findOne({ _id: params.id });
            response = { data: result, message: MESSAGE.GET };
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
  * @name update
  * @param {Object} params
  */
    update = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            const { id, firstName, lastName, email, phoneNo, gender, password, status } = params;

            const updateModel = {
                $set: {
                    firstName, lastName, email, phoneNo, gender, password,
                    status: +status,
                    updated_at: new Date(),
                }
            };

            const result = await UserModel.findOneAndUpdate({ _id: id }, updateModel, { new: true });
            response = { data: result, message: MESSAGE.UPDATE };
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @name delete
     * @param {Object} params
     */
    delete = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            const result = await UserModel.findOneAndDelete({ _id: params.id });
            response = { data: result, message: MESSAGE.DELETE };
            return response;
        } catch (error) {
            throw error;
        }
    }


    /**
     * @name updateProfile
     * @param {Object} params
     */
    updateProfile = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            const { id, uid, cid, firstName, lastName, email, phoneNo } = params;

            // find user by id
            const user = await UserModel.findOne({ _id: id });
            if (!user) {
                throw new UnauthorizedAccessErrorResult(
                    APP_ENUM.TYPE.ERROR.NOT_FOUND,
                    MESSAGE.NOT_FOUND
                );
            }
            // check if email or phoneNo is already exist not in with same id
            const findUser = await UserModel.findOne({ $or: [{ email }, { phoneNo }], _id: { $ne: id } });
            if (findUser && findUser._id !== id) {
                throw new UnauthorizedAccessErrorResult(
                    APP_ENUM.TYPE.ERROR.CONFLICT,
                    MESSAGE.DUPLICATE_PHONE
                );
            }

            const updateModel = {
                $set: {
                    firstName, lastName, email, phoneNo
                }
            };
            const updatedUser = await UserModel.findOneAndUpdate({ _id: uid }, updateModel, { new: true });
            response = { data: updatedUser, message: MESSAGE.UPDATE };
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @name changePassword
     * @param {Object} params
     */
    changePassword = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            const { uid, password, new_password } = params;

            // verify password  
            const user = await UserModel.findOne({ _id: uid });
            if (!user) {
                throw new UnauthorizedAccessErrorResult(
                    APP_ENUM.TYPE.ERROR.NOT_FOUND,
                    MESSAGE.NOT_FOUND
                );
            }
            const isPasswordMatch = await this.nx.crypto.verifyPassword(user.password, password);
            if (!isPasswordMatch) {
                throw new UnauthorizedAccessErrorResult(
                    APP_ENUM.TYPE.ERROR.NOT_FOUND,
                    MESSAGE.INVALID_PASSWORD
                );
            }
            const passwordHash = await this.nx.crypto.hashPassword(new_password);
            const updateModel = {
                $set: {
                    password: passwordHash,
                }
            };
            const updatedUser = await UserModel.findOneAndUpdate({ _id: uid }, updateModel, { new: true });
            response = { data: updatedUser, message: MESSAGE.UPDATE };
            return response;
        } catch (error) {
            throw error;
        }
    }
}


