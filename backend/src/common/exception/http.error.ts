import { HttpException, HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export function HttpError(error: IHttpError) {
  throw new HttpException(
    error?.response || error?.message || error?.code || 'Unknown Http Exception',
    error?.statusCode || HttpStatus.BAD_REQUEST,
  );
}

export function WSError(error: IHttpError) {
  throw new WsException(error?.response || error?.message || error?.code || 'Unknown Http Exception');
}

interface IHttpError {
  code?: any;
  response?: any;
  message?: any;
  statusCode?: any;
}
