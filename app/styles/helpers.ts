import { css } from 'otion'

export const level = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
}

export const makeRGBA = (alpha: number) => `rgba(17, 17, 17, ${alpha})`

export const thin = {
  fontWeight: 300,
}

export { css }

export function cx(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ')
}

export function small(styles: Record<string, unknown>, constrained = false) {
  return css({
    '@media': {
      [['(min-width: 768px)', constrained ? ' and (max-width: 1200px)' : '']
        .filter(Boolean)
        .join('')]: styles,
    },
  })
}

export function large(styles: Record<string, unknown>) {
  return css({
    '@media': {
      '(min-width: 1200px)': styles,
    },
  })
}
