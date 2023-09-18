
import { Types } from 'mongoose';

import { IResponseType } from '../core/IResponseType.interface';
import CategoryModel from '../model/categoryModel';
import { MESSAGE } from '../shared/constants/app.const';
import { NxService } from '../shared/nx-library/nx-service';


export class CategoryService {
    constructor(private nx: NxService) { }


    /**
     * @name create
     * @param {Object} params
     */

    create = async (params: any): Promise<IResponseType> => {
        try {
            let response: IResponseType;
            console.log('params', params);

            const { name, description, status } = params;

            const categoryModel = new CategoryModel({ name, description, status });
            const createdCategory = await categoryModel.save();
            response = { data: createdCategory, message: MESSAGE.CREATE };
            return response;
        } catch (error) {
            throw error;
        }
    };

    findAll = async (_params: any): Promise<IResponseType> => {
        // eslint-disable-next-line no-useless-catch
        try {
            let response: IResponseType;
            const data = await CategoryModel.find();
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
            const result = await CategoryModel.findOne({ _id: params.id });
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
            const { id, name, description, status } = params;

            const updateModel = {
                $set: {
                    description, name,
                    status: +status,
                    updated_at: new Date(),
                }
            };

            const result = await CategoryModel.findOneAndUpdate({ _id: id }, updateModel, { new: true });
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
            const result = await CategoryModel.findOneAndDelete({ _id: params.id });
            response = { data: result, message: MESSAGE.DELETE };
            return response;
        } catch (error) {
            throw error;
        }
    }
}