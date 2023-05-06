import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  getExampleByType,
  transformDTOToExample,
} from '../util/transform/transform-dto-to-example';
import {
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { HttpResponseDto } from '../../../response/http-response.dto';
import { HTTP_RESPONSE_SUCCESS_CODE } from '../../../response/constants';
import { isPrimitive } from '../../../guard/is-primitive-type';

interface ExampleOption {
  type?: boolean | ApiPropertyOptions['type'];
  title: string;
  description?: string;
  generic?: { field: string; type: Type };
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

    let data = getExampleByType(option.type);

    if (option.generic) {
      const genericExample = transformDTOToExample(option.generic.type);
      genericExample[option.generic.field] = data;
      data = genericExample;
    }

    responseExample.data = data;
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
    [
      ...options.reduce((result, option) => {
        if (Array.isArray(option.type)) {
          result.push(option.type[0]);
        } else {
          result.push(option.type);
        }
        if (option.generic) {
          result.push(option.generic.type);
        }
        return result;
      }, [] as ExampleOption['type'][]),
    ].filter((type): type is Type => type != null),
  ),
];
