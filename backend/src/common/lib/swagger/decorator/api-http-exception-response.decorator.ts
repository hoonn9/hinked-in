import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { transformDTOToExample } from '../util/transform/transform-dto-to-example';
import { HttpExceptionResponseDto } from '../../../exception/dto/http-exception-response.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ExceptionResponseConstant } from '../../../exception/constant';

interface ExampleOption {
  type?: Type;
  title: string;
  description?: string;
  generic?: Type;
  response?: ExceptionResponseConstant;
}

export const ApiHttpExceptionResponse = (
  status: HttpStatus,
  options: ExampleOption[],
) => {
  const examples = createExamples(options);
  validStatusCode(status, options);

  const models = getModels(options);

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

const createExamples = (options: ExampleOption[]) => {
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

    result[option.title] = {
      value: responseExample,
      description: option.description,
    };
  });

  return result;
};

const validStatusCode = (status: HttpStatus, options: ExampleOption[]) => {
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

const getModels = (options: ExampleOption[]) => [
  ...new Set(
    [...options.map((option) => option.type)].filter(
      (type): type is Type => type != null,
    ),
  ),
];
