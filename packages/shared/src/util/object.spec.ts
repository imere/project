import {
  assign,
  createMirror,
  omit,
  pick,
} from './object';

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
    it('omit own props', () => {
      const res = omit(dummy(), ['a']);

      expect(res).not.toHaveProperty('a');

      expect(res).toHaveProperty('b');

      expect(res).not.toHaveProperty('non-own');
    });
  });

  describe(assign.name, () => {
    it('assign value by path', () => {
      const a = {};
      assign(a, 'a.b.c', 'value');
      expect(a).toStrictEqual({ a: { b: { c: 'value' } } });

      const b = {};
      assign(b, '...', 'value');
      expect(b).toStrictEqual({ '': { '': { '': { '': 'value' } } } });
    });
  });

  describe(createMirror.name, () => {
    it('create key mirror', () => {
      const o = createMirror('a', 'b', 'c');

      expect(o).toStrictEqual({
        a: 'a',
        b: 'b',
        c: 'c',
      });
    });
  });

});
