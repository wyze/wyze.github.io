/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'fela' {
  import * as Fela from 'fela'

  type TKeyFrame = ReturnType<Fela.TKeyFrame>

  export interface IStyle extends Omit<Fela.IStyle, 'animationName'> {
    animationName?: string | TKeyFrame | TKeyFrame[]
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
