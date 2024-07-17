import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    this.logger.debug(
      `Exception caught by filter: ${JSON.stringify(exception.getResponse())}`,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const responseBody = {
      statusCode: status,
      message: 'Unauthorized access',
      error: 'Authentication failed. Please provide a valid token.',
      details: exceptionResponse.message || 'No additional details',
    };

    this.logger.debug(`Sending response: ${JSON.stringify(responseBody)}`);
    response.status(status).json(responseBody);
  }
}
