/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'fela' {
  import * as CSS from 'csstype'
  import { TKeyFrame } from 'fela'

  export interface IStyle extends CSS.Properties<string | number> {
    animationName?: string | ReturnType<TKeyFrame>
  }
}

declare module '*.pdf' {
  const value: string

  export = value
}

declare module '*.png' {
  const value: string

  export = value
}

declare module '*.png?webp' {
  const value: string

  export = value
}
