/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'fela-preset-web' {
  import { TPlugin } from 'fela'

  type Unit =
    | 'ch'
    | 'em'
    | 'ex'
    | 'rem'
    | 'vh'
    | 'vw'
    | 'vmin'
    | 'vmax'
    | 'px'
    | 'cm'
    | 'mm'
    | 'in'
    | 'pc'
    | 'pt'
    | 'mozmm'

  interface UnitPerProperty {
    [key: string]: string
  }

  type UnitConfig1 = [Unit]
  type UnitConfig2 = [Unit, UnitPerProperty]
  type UnitConfig3 = [Unit, UnitPerProperty, (property: string) => boolean]

  type UnitConfig = UnitConfig1 | UnitConfig2 | UnitConfig3

  const presets: TPlugin[]

  export function createWebPreset({ unit }: { unit?: UnitConfig }): TPlugin[]

  export default presets
}

declare module 'fela-sort-media-query-mobile-first' {
  import { TEnhancer } from 'fela'

  export default function(): TEnhancer
}

declare module '*.png' {
  const value: string

  export = value
}

declare module '*.png?webp' {
  const value: string

  export = value
}
