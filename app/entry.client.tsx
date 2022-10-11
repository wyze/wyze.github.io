import { RemixBrowser } from '@remix-run/react'
import { hydrate, setup } from 'otion'
import { hydrateRoot } from 'react-dom/client'

setup({})
hydrate()

hydrateRoot(document, <RemixBrowser />)
