import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { transformDTOToExample } from './util/transform-dto-to-example';
import { HttpExceptionResponseDto } from '../../exception/dto/http-exception-response.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface CustomResponseOption {
  model: Type<any>;
  exampleTitle: string;
  overwriteValue?: Record<string, any>;
  exampleDescription: string;
  generic?: Type<any>;
}

export const ApiCustomExceptionResponse = (
  status: HttpStatus,
  options: CustomResponseOption[],
) => {
  const examples: Record<string, any> = {};
  options.forEach((option) => {
    const responseExample = transformDTOToExample(HttpExceptionResponseDto);

    responseExample.errors = transformDTOToExample(option.model);

    examples[option.exampleTitle] = {
      value: responseExample,
      description: option.exampleDescription,
    };
  });

  const models = options.map((option) => option.model);

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
