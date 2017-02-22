// @flow

import Image from '../../../src/shared/components/Image'
import snapshot from '../../helpers/snapshot'

const image = {
  ext: 'jpg',
  name: 'me',
}

const imageAsCircle = {
  ...image,
  circle: true,
}

const imageWithAlt = {
  ...image,
  alt: 'Neil Kistner',
}

const imageWithWidth = {
  ...image,
  width: 200,
}

describe('<Image />', () => {
  it('renders', snapshot.bind(null, Image, image))
  it('renders as circle', snapshot.bind(null, Image, imageAsCircle))
  it('renders custom alt attr', snapshot.bind(null, Image, imageWithAlt))
  it('renders custom width', snapshot.bind(null, Image, imageWithWidth))
})
