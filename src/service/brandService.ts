
import { Types } from 'mongoose';

import { IResponseType } from '../core/IResponseType.interface';
import BrandModel from '../model/brandModel';
import { MESSAGE } from '../shared/constants/app.const';
import { NxService } from '../shared/nx-library/nx-service';


export class BrandService {
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

            const brandModel = new BrandModel({ name, status });
            const createdBrand = await brandModel.save();
            response = { data: createdBrand, message: MESSAGE.CREATE };
            return response;
        } catch (error) {
            throw error;
        }
    };

    findAll = async (_params: any): Promise<IResponseType> => {
        // eslint-disable-next-line no-useless-catch
        try {
            let response: IResponseType;
            const data = await BrandModel.find();
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
            const result = await BrandModel.findOne({ _id: params.id });
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
            const { id, name, companyId, status } = params;

            const updateModel = {
                $set: {
                    companyId, name,
                    status: +status,
                    updated_at: new Date(),
                }
            };

            const result = await BrandModel.findOneAndUpdate({ _id: id }, updateModel, { new: true });
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
            const result = await BrandModel.findOneAndDelete({ _id: params.id });
            response = { data: result, message: MESSAGE.DELETE };
            return response;
        } catch (error) {
            throw error;
        }
    }
}