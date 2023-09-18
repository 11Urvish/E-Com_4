import { Request, Response } from "express";
import { UnauthorizedAccessErrorResult } from "../core/error-result";
import { IResponseType } from "../core/IResponseType.interface";
import { ResponseBuilder } from "../core/response-builder";
import { UserService } from "../service/userService";

export class UserController {
    constructor(private ds: UserService) { }

    /**
   * @name create
   * @method POST
   * @memberof UserController
   * @description This method is used to create user
   */
    register = async (req: Request, res: Response) => {
        try {
            const params = { ...req.query, ...req.body };
            console.log(params);
            const result: IResponseType = await this.ds.register(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

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
     * @memberof UserController
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
     * @name update
     * @method POST
     * @memberof UserController
     * @description This method is used to update User
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
     * @memberof UserController
     * @description This method is used to delete User
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

    /**
  * @name updateProfile
  * @method POST
  * @memberof UserController
  * @description This method is used to delete user
  */
    updateProfile = async (req: Request, res: Response) => {
        try {
            const params = { ...req.body, ...req.user };
            const result: IResponseType = await this.ds.updateProfile(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

    /**
     * @name changePassword
     * @method POST
     * @memberof UserController
     * @description This method is used to delete user
     */
    changePassword = async (req: Request, res: Response) => {
        try {
            const params = { ...req.body, ...req.user };
            const result: IResponseType = await this.ds.changePassword(params);
            ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
            if (error instanceof UnauthorizedAccessErrorResult) {
                return ResponseBuilder.UnauthorizedAccessError(res, error);
            }
            ResponseBuilder.InternalServerError(res, error);
        }
    }

}