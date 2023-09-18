
import { Types } from 'mongoose';

import { IResponseType } from '../core/IResponseType.interface';
import CompanyModel from '../model/companyModel';
import { MESSAGE } from '../shared/constants/app.const';
import { NxService } from '../shared/nx-library/nx-service';


export class CompanyService {
    constructor(private nx: NxService) { }


    /**
     * @name create
     * @param {Object} params
     */
    create = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            console.log('params', params);

            const { name, status } = params;

            const companyModel = new CompanyModel({ name, status });
            const createdCompany = await companyModel.save();
            response = { data: createdCompany, message: MESSAGE.CREATE };
            return response;
        } catch (error) {
            throw error;
        }
    };

    findAll = async (_params: any): Promise<IResponseType> => {
        // eslint-disable-next-line no-useless-catch
        try {
            let response: IResponseType;
            const data = await CompanyModel.find();
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
            const result = await CompanyModel.findOne({ _id: params.id });
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
            const { id, name, status } = params;

            const updateModel = {
                $set: {
                    name,
                    status: +status,
                    updated_at: new Date(),
                }
            };

            const result = await CompanyModel.findOneAndUpdate({ _id: id }, updateModel, { new: true });
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
            const result = await CompanyModel.findOneAndDelete({ _id: params.id });
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
//             const result = await CompanyModel.findOneAndDelete({ _id: params.id });
//             response = { data: result, message: MESSAGE.DELETE };
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }
// }