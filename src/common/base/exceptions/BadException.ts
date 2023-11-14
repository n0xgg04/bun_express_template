import BaseException from '@/common/base/exceptions/handler/BaseException'
import HttpStatusCode from '@base/constants/HttpStatusCode.ts'
import { ErrorDetail } from '@/@type/error.ts'

export default class BadRequestException extends BaseException {
  constructor(description: string | ErrorDetail) {
    super({
      description,
      statusCode: HttpStatusCode.BAD_REQUEST,
    })
  }
}
