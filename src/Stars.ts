import { Vector3 } from 'three'

import stars from './stars.json'

type Star = typeof stars[number]

type StarTransformed = Star & {
  cartesian: Vector3
  phi: number
  theta: number
}

type StarInConstellation = StarTransformed & {
  C: string
}

export default class Stars {
  stars: StarTransformed[] = Stars.getTransformedStars()
  constellations: { [key: string]: StarInConstellation[] } =
    Stars.getConstellations()
  minV = Stars.getMinV()
  maxV = Stars.getMaxV()
  count = Stars.getCount()

  getStarAt(index: number) {
    return this.stars[index]
  }

  static getStars(): Star[] {
    return stars
  }
  static getCount() {
    return stars.length
  }

  static getTransformedStars(): StarTransformed[] {
    return stars.map((star) => {
      const phi = Stars.rightAscentionToAngle(star.RA)
      const theta = Stars.declinationToAngle(star.Dec)
      const cartesian = Stars.sphericalToCartesian(1, phi, theta)

      return {
        ...star,
        cartesian,
        phi,
        theta,
      }
    })
  }

  static getConstellations() {
    const filterdStars = Stars.getTransformedStars().filter(
      (star) => !!star.C
    ) as StarInConstellation[]

    const constellations = filterdStars.reduce((acc, star) => {
      if (!acc[star.C]) {
        acc[star.C] = []
      }
      acc[star.C].push(star)

      return acc
    }, {} as { [key: string]: StarInConstellation[] })

    return constellations
  }

  static rightAscentionToAngle(rightAscention: string) {
    const [hours, minutes, seconds] = rightAscention
      .split(' ')
      .map((part) => parseFloat(part.replace(/[^0-9.]/g, '')))

    const angle = ((hours + minutes / 60 + seconds / 3600) * Math.PI) / 12

    // output is in the range of 0 to 2π
    return angle
  }

  static declinationToAngle(declination: string) {
    const [degrees, minutes, seconds] = declination
      .split(' ')
      .map((part) => parseFloat(part.replace(/[^0-9.]/g, '')))

    const sign = declination[0] === '-' ? -1 : 1

    const angle =
      (sign * (Math.abs(degrees) + minutes / 60 + seconds / 3600) * Math.PI) /
      180

    return angle
  }

  static sphericalToCartesian(
    radius: number,
    ascention: number,
    declination: number
  ) {
    // spherical to cartesian XYZ Y is up
    const x = radius * Math.cos(ascention) * Math.cos(declination)
    const y = radius * Math.sin(ascention) * Math.cos(declination)
    const z = radius * Math.sin(declination)

    return new Vector3(x, z, y)
  }

  static getMinV() {
    return stars.reduce((min, star) => Math.min(min, parseFloat(star.V)), 0)
  }
  static getMaxV() {
    return stars.reduce((max, star) => Math.max(max, parseFloat(star.V)), 0)
  }
}
