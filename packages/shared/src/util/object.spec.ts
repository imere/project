import { omit, pick } from './object';

describe('object', () => {
  function dummy() {
    const obj = {
      a: 'a',
      b: {
        c: 'c',
      },
    };

    Object.defineProperty(Object.getPrototypeOf(obj), 'non', {
      value: 'non',
      enumerable: true,
    });

    return obj;
  }

  describe(pick.name, () => {
    it('pick own props', () => {
      const res = pick(dummy(), ['a']);

      expect(res).toHaveProperty('a');

      expect(Object.prototype.hasOwnProperty.call(res, 'non')).toBe(false);
      expect(res).not.toHaveProperty('non');

      expect(res).not.toHaveProperty('b');
    });

    it('and pick non-own props', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = pick(dummy(), ['a', 'non']);

      expect(res).toHaveProperty('a');

      expect(Object.prototype.hasOwnProperty.call(res, 'non')).toBe(false);
      expect(res).toHaveProperty('non');

      expect(res).not.toHaveProperty('b');
    });
  });

  describe(omit.name, () => {
    it('omit props', () => {
      const res = omit(dummy(), ['a']);

      expect(res).not.toHaveProperty('a');

      expect(res).toHaveProperty('b');
      expect(res).toHaveProperty('non');
    });
  });

});
