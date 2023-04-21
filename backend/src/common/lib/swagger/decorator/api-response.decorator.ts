import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { transformDTOToExample } from '../util/transform/transform-dto-to-example';
import { HttpExceptionResponseDto } from '../../../exception/dto/http-exception-response.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface CustomResponseOption {
  model?: Type<any>;
  exampleTitle: string;
  overwriteValue?: Record<string, any>;
  exampleDescription?: string;
  generic?: Type<any>;
}

export const ApiCustomExceptionResponse = (
  status: HttpStatus,
  options: CustomResponseOption[],
) => {
  const examples: Record<string, any> = {};

  options.forEach((option) => {
    const responseExample = transformDTOToExample(HttpExceptionResponseDto);

    if (option.model) {
      responseExample.errors = [transformDTOToExample(option.model)];
    } else {
      responseExample.errors = undefined;
    }

    examples[option.exampleTitle] = {
      value: responseExample,
      description: option.exampleDescription,
    };
  });

  const models: Type<any>[] = options
    .map((option) => option.model)
    .filter((model): model is Type => model != null);

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
