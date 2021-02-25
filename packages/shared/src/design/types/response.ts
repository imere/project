import { ApiProperty } from '@nestjs/swagger';

interface BaseResponse {
  code: number
  text?: string
}

export interface SuccessResponse<T = unknown> extends BaseResponse {
  data?: T
}

export interface ErrorResponse extends BaseResponse {
  msg?: string
}

export type ServerResponse<T = unknown> = SuccessResponse<T> & ErrorResponse

export function isSuccessResponse<T>(data?: unknown): data is SuccessResponse<T> {
  if ((<SuccessResponse<T>>data)?.code < 400) return true;

  return false;
}

export function isErrorResponse(data?: unknown): data is ErrorResponse {
  if ((<ErrorResponse>data)?.code >= 400) return true;

  return false;
}

export class ResponseShape implements SuccessResponse, ErrorResponse {
  @ApiProperty()
  code!: number

  @ApiProperty()
  text?: string

  @ApiProperty()
  data?: unknown

  @ApiProperty()
  msg?: string
}

export class ResponseBuilder {
  static create<T>(
    data: SuccessResponse<T>['data'],
    params: Omit<ServerResponse<T>, 'data'> = { code: 200 }
  ): ServerResponse<T> {

    const res = {
      data,
      ...params,
    };

    if (isErrorResponse(res)) {
      res.msg ??= '';
    }

    return res;
  }
}