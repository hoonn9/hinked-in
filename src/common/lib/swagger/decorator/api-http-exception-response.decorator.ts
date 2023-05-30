import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { transformDTOToExample } from '../util/transform/transform-dto-to-example';
import { HttpExceptionResponseDto } from '../../../exception/dto/http-exception-response.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ExceptionResponseConstant } from '../../../exception/constant';
import { invalidInputExceptionExample } from '../example/exception-example';

export interface ExceptionExampleOption {
  type?: Type;
  title: string;
  description?: string;
  generic?: Type;
  response?: ExceptionResponseConstant;
}

interface ApiHttpExceptionResponseOptions {
  isSkipValidationExample?: boolean;
}

export const ApiHttpExceptionResponse = (
  status: HttpStatus,
  exampleOptions: ExceptionExampleOption[] = [],
  options?: ApiHttpExceptionResponseOptions,
) => {
  if (status === HttpStatus.BAD_REQUEST && !options?.isSkipValidationExample) {
    exampleOptions.push(invalidInputExceptionExample);
  }

  const examples = createExamples(exampleOptions);
  validStatusCode(status, exampleOptions);

  const models = getModels(exampleOptions);

  return applyDecorators(
    ApiExtraModels(HttpExceptionResponseDto, ...models),
    ApiResponse({
      status,
      content: {
        'application/json': {
          schema: {
            additionalProperties: {
              $ref: getSchemaPath(HttpExceptionResponseDto),
            },
            oneOf: models.map((model) => ({
              $ref: getSchemaPath(model),
            })),
          },
          examples,
        },
      },
    }),
  );
};

const createExamples = (options: ExceptionExampleOption[]) => {
  const result: Record<string, any> = {};

  options.forEach((option) => {
    const responseExample = transformDTOToExample(HttpExceptionResponseDto);

    if (option.type) {
      responseExample.errors = [transformDTOToExample(option.type)];
    } else {
      responseExample.errors = undefined;
    }

    if (option.response) {
      responseExample.code = option.response.code;
      responseExample.message = option.response.message;
    }

    if (option.title) {
      result[option.title] = {
        value: responseExample,
        description: option.description,
      };
    }
  });

  return result;
};

const validStatusCode = (
  status: HttpStatus,
  options: ExceptionExampleOption[],
) => {
  if (
    options.some(
      (option) => option.response && option.response.statusCode !== status,
    )
  ) {
    throw new Error(
      'Swagger Exception Response에 잘못된 StatusCode가 할당되었습니다.',
    );
  }
};

const getModels = (options: ExceptionExampleOption[]) => [
  ...new Set(
    [...options.map((option) => option.type)].filter(
      (type): type is Type => type != null,
    ),
  ),
];
