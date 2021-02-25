import { omit, pick } from './object';

describe('object', () => {
  function dummy() {
    const obj = {
      a: 'a',
      b: {
        c: 'c',
      },
      __proto__: {
        'non-own': 'non-own',
      },
    };

    return obj;
  }

  describe(pick.name, () => {
    it('pick own props', () => {
      const res = pick(dummy(), ['a', 'b']);

      expect(res).toHaveProperty('a');
      expect(res).toHaveProperty('b');

      expect(res).not.toHaveProperty('non-own');
    });

    it('and pick non-own props', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = pick(dummy(), ['a', 'non-own']);

      expect(res).toHaveProperty('a');
      expect(res).toHaveProperty('non-own');

      expect(res).not.toHaveProperty('b');
    });
  });

  describe(omit.name, () => {
    it('omit props', () => {
      const res = omit(dummy(), ['a']);

      expect(res).not.toHaveProperty('a');

      expect(res).toHaveProperty('b');
      expect(res).toHaveProperty('non-own');
    });
  });

});
