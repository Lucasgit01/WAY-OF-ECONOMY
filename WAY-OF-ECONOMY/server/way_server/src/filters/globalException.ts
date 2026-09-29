import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const status = exception instanceof HttpException ?
            exception.getStatus() :
            HttpStatus.INTERNAL_SERVER_ERROR;

        const errorBody = exception instanceof HttpException ?
            exception.getResponse() :
            "Desculpe, houve um erro interno. Retente mais tarde."

        const responseBody = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: typeof errorBody === "string" ? errorBody : (errorBody as Record<"message", string>)?.message,
            path: httpAdapter.getRequestUrl(ctx.getRequest())
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
}