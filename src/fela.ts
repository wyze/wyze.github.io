import { createRenderer } from 'fela'
import typescript from 'fela-plugin-typescript'
import webPreset from 'fela-preset-web'

export const renderer = createRenderer({
  plugins: [...webPreset, typescript()],
})
