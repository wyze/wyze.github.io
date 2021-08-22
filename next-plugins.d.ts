declare module 'next-offline' {
  const offline: (options?: Record<string, unknown>) => Record<string, unknown>

  export = offline
}

declare module 'next-optimized-images' {
  const optimize: (
    options?: Record<string, unknown>,
    composePlugins?: Record<string, unknown>
  ) => Record<string, unknown>

  export = optimize
}

declare module 'next-compose-plugins' {
  const compose: (
    plugins: unknown[],
    nextConfig?: Record<string, unknown>
  ) => (
    phase: string,
    options: Record<string, unknown>
  ) => Record<string, unknown>

  export = compose
}
