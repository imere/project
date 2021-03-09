import type {
  PaintCtor,
  PaintRenderingContext2D,
  PaintSize,
  StyleMap,
} from '../../types/enhance/paint';

declare function registerPaint(name: string, ctor: PaintCtor): void

class TestPainter {
  static get inputProperties() { return ['a', 'b'] as const; }

  paint(ctx: PaintRenderingContext2D, size: PaintSize, styleMap: StyleMap<typeof TestPainter.inputProperties[number]>): void {
    console.log('test-painter', ctx, size, styleMap.get('a'));
  }
}

registerPaint('test-painter', TestPainter);
