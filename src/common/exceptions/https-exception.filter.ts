import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { APIResponse } from "../types/APIResponse";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = exception.getStatus()

        const errorMessage = exception.getResponse()['message'] ? exception.getResponse()['message'] : exception.message || 'Internal server error'

        const error = exception.getResponse() || exception.getResponse()['error']

        delete error['message']

        const body: APIResponse = {
            success: false,
            message: errorMessage,                              
            error,
            data: null
        }

        response.status(status).json(body)
    }
}