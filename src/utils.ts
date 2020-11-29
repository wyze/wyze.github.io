type Props = Record<string, unknown> | never
type EventOptions<P extends Props> = {
  props: P
  callback?: VoidFunction
}
type EventOptionsTuple<P extends Props> = P extends never
  ? [Omit<EventOptions<P>, 'props'>?]
  : [EventOptions<P>]
type Events = { [K: string]: Props }

declare global {
  interface Window {
    plausible?<E extends Events, N extends keyof E>(
      event: string,
      options?: EventOptionsTuple<E[N]>[0]
    ): void
  }
}

const formatKeyNames = (
  props: Record<string, unknown>
): Record<string, unknown> =>
  Object.keys(props)
    .map((key) => [
      key,
      key.replace(/((^| )(.))/g, (letter) => letter.toUpperCase()),
    ])
    .reduce(
      (acc, [key, formatted]) => ({ ...acc, [formatted]: props[key] }),
      {}
    )

export function log(event: string, props?: Record<string, unknown>) {
  window.plausible?.(
    event,
    props ? { props: formatKeyNames(props) } : undefined
  )
}
