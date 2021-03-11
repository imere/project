import { CSSProperties } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    $color: {
      primary: CSSProperties['color']
      secondary: CSSProperties['color']
      success: CSSProperties['color']
      warning: CSSProperties['color']
      danger: CSSProperties['color']
      info: CSSProperties['color']
    },
    $text: {
      primary: CSSProperties['color']
      regular: CSSProperties['color']
      secondary: CSSProperties['color']
      placeholder: CSSProperties['color']
    },
    $border: {
      base: CSSProperties['color']
      light: CSSProperties['color']
      lighter: CSSProperties['color']
      extraLight: CSSProperties['color']
    },
  }
}
