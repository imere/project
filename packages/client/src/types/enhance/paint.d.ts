import { Constructable } from '@package/shared/src/design/types/common';

declare function registerPaint(name: string, ctor: PaintCtor): void

interface PaintCtor extends Constructable {
  inputProperties?: readonly string[]
  inputArguments?: readonly string[]
  contextOptions?: Readonly<PaintRenderingContext2DSettings>
  prototype: PaintCtorPrototype
}

interface PaintRenderingContext2DSettings {
  alpha: true;
}

interface PaintCtorPrototype {
  paint?(ctx: PaintRenderingContext2D, size: PaintSize, styleMap: StyleMap, args: unknown): void
}

interface PaintRenderingContext2D extends CanvasState, CanvasTransform, CanvasCompositing, CanvasImageSmoothing, CanvasFillStrokeStyles, CanvasShadowStyles, CanvasRect, CanvasDrawPath, CanvasDrawImage, CanvasPathDrawingStyles, CanvasPath {}

interface PaintSize {
  readonly width: number
  readonly height: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StyleMap<K = string, V = unknown> extends Readonly<Pick<Map<K, V>, 'get'>> {}
