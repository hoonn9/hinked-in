import { isClassRef } from '../../../../src/common/guard/is-class-ref';

describe('IsClassRef', () => {
  it('Class Reference인 경우 true를 반환한다.', () => {
    // given
    class ClassRef {}

    // when
    const result = isClassRef(ClassRef);

    // then
    expect(result).toBe(true);
  });

  it('Plain object인 경우 false를 반환한다.', () => {
    // given
    const obj = {};

    // when
    const result = isClassRef(obj);

    // then
    expect(result).toBe(false);
  });

  it('Function인 경우 false를 반환한다.', () => {
    // given
    const func = function () {
      return;
    };

    // when
    const result = isClassRef(func);

    // then
    expect(result).toBe(false);
  });

  it.each([1, BigInt(1), 'string', false, true, null, undefined, Symbol()])(
    'Primitive Type인 경우 false를 반환한다.',
    (type) => {
      expect(isClassRef(type)).toBe(false);
    },
  );
});
