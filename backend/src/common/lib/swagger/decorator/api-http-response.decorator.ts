import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { transformDTOToExample } from '../util/transform/transform-dto-to-example';
import {
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { HttpResponseDto } from '../../../response/http-response.dto';
import { HTTP_RESPONSE_SUCCESS_CODE } from '../../../response/constants';
import { isClassRef } from '../../../guard/is-class-ref';
import { isPrimitive } from '../../../guard/is-primitive-type';

interface ExampleOption {
  type?: boolean | ApiPropertyOptions['type'];
  title: string;
  description?: string;
  generic?: Type;
}

export const ApiHttpResponse = (
  status: HttpStatus,
  options: ExampleOption[],
) => {
  const examples = createExamples(options);
  const models = getModels(options);

  return applyDecorators(
    ApiExtraModels(HttpResponseDto, ...models),
    ApiResponse({
      status,
      content: {
        'application/json': {
          schema: {
            additionalProperties: {
              $ref: getSchemaPath(HttpResponseDto),
            },
            oneOf: models.map((model) => {
              if (isPrimitive(model)) {
                return {
                  type: model.toString(),
                };
              }
              return {
                $ref: getSchemaPath(model),
              };
            }),
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
    const responseExample = transformDTOToExample(HttpResponseDto);
    const type = option.type;
    if (isClassRef(type)) {
      responseExample.data = [transformDTOToExample(type)];
    } else {
      responseExample.data = type;
    }

    responseExample.code = HTTP_RESPONSE_SUCCESS_CODE;

    result[option.title] = {
      value: responseExample,
      description: option.description,
    };
  });

  return result;
};

const getModels = (options: ExampleOption[]) => [
  ...new Set(
    [...options.map((option) => option.type)].filter(
      (type): type is Type => type != null,
    ),
  ),
];
