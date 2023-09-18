import { Request, Response } from "express";
import { UnauthorizedAccessErrorResult } from "../core/error-result";
import { IResponseType } from "../core/IResponseType.interface";
import { ResponseBuilder } from "../core/response-builder";
import { CategoryService } from "../service/categoryService";

export class CategoryController {
    constructor(private ds: CategoryService) { }

    /**
    * @name findAll
    * @method POST
    * @memberof CategoryController
    * @description Get all Category
    */
    findAll = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            const result: IResponseType = await this.ds.findAll(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

    /**
     * @name findById
     * @method POST
     * @memberof CategoryController
     * @description Find state based in unique id
     */
    findById = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            const result: IResponseType = await this.ds.findById(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

    /**
   * @name create
   * @method POST
   * @memberof CategoryController
   * @description This method is used to create Category
   */
    create = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            console.log(params);
            const result: IResponseType = await this.ds.create(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

    /**
     * @name update
     * @method POST
     * @memberof CategoryController
     * @description This method is used to update Category
     */
    update = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            const result: IResponseType = await this.ds.update(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

    /**
     * @name delete
     * @method POST
     * @memberof CategoryController
     * @description This method is used to delete Category
     */
    delete = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            const result: IResponseType = await this.ds.delete(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }
}