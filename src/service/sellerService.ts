
import { Types } from 'mongoose';

import { IResponseType } from '../core/IResponseType.interface';
import SellerModel from '../model/sellerModel';
import { MESSAGE } from '../shared/constants/app.const';
import { NxService } from '../shared/nx-library/nx-service';


export class SellerService {
    constructor(private nx: NxService) { }


    /**
     * @name create
     * @param {Object} params
     */
    create = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            console.log('params', params);

            const { productId, description, price, phoneNumber, status } = params;

            const sellerModel = new SellerModel({ productId, description, price, phoneNumber, status });
            const createdSeller = await sellerModel.save();
            response = { data: createdSeller, message: MESSAGE.CREATE };
            return response;
        } catch (error) {
            throw error;
        }
    };

    findAll = async (_params: any): Promise<IResponseType> => {
        // eslint-disable-next-line no-useless-catch
        try {
            let response: IResponseType;
            const data = await SellerModel.find();
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
            const result = await SellerModel.findOne({ _id: params.id });
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
            const { id, productId, description, price, phoneNumber, status } = params;

            const updateModel = {
                $set: {
                    productId, description, price, phoneNumber,
                    status: +status,
                    updated_at: new Date(),
                }
            };

            const result = await SellerModel.findOneAndUpdate({ _id: id }, updateModel, { new: true });
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
            const result = await SellerModel.findOneAndDelete({ _id: params.id });
            response = { data: result, message: MESSAGE.DELETE };
            return response;
        } catch (error) {
            throw error;
        }
    }
}


//     delete = async (params: any): Promise<IResponseType> => {
//         try {
//             let response: IResponseType;
//             const { id } = params;
//             const result = await SellerModel.findOneAndDelete({ _id: params.id });
//             response = { data: result, message: MESSAGE.DELETE };
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }
// }