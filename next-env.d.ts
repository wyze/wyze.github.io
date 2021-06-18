/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'next-offline' {
  const offline: (options?: object) => object

  export = offline
}

declare module 'next-optimized-images' {
  const optimize: (options?: object, composePlugins?: object) => object

  export = optimize
}

declare module 'next-compose-plugins' {
  const compose: (
    plugins: any[],
    nextConfig?: object
  ) => (phase: string, options: object) => object

  export = compose
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
