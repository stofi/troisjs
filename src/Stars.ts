import { Vector3 } from 'three'

import stars from './stars.json'

export type Star = typeof stars[number]

export type StarTransformed = Star & {
  cartesian: Vector3
  phi: number
  theta: number
  count: number
}

export type StarInConstellation = StarTransformed & {
  C: string
}

export type StarNamed = StarTransformed & {
  N: string
}

export default class Stars {
  static minTemperature = 1000
  static maxTemperature = 30000

  stars: StarTransformed[] = Stars.getTransformedStars()
  constellations: { [key: string]: StarInConstellation[] } =
    Stars.getConstellations()
  namedStars: StarNamed[] = Stars.getNamedStars()
  minV = Stars.getMinV()
  maxV = Stars.getMaxV()
  count = Stars.getCount()

  getStarAt(index: number) {
    return this.stars[index]
  }

  getStarsInRegion(
    direction: Vector3,
    hFovDeg: number,
    vFovDeg: number,
    named = false
  ) {
    const spherical = Stars.cartesianToSpherical(direction)
    const hFovRad = (hFovDeg / 360) * 2 * Math.PI
    const vFovRad = (vFovDeg / 360) * 2 * Math.PI

    let minAscention = spherical.ascention - hFovRad // / 2

    let maxAscention = spherical.ascention + hFovRad // / 2

    let minDeclination = spherical.declination - vFovRad // / 2

    let maxDeclination = spherical.declination + vFovRad // / 2

    if (minAscention > maxAscention) {
      minAscention = minAscention - 2 * Math.PI
      maxAscention = maxAscention - 2 * Math.PI
    }

    if (minDeclination > maxDeclination) {
      minDeclination = minDeclination - 2 * Math.PI
      maxDeclination = maxDeclination - 2 * Math.PI
    }

    const arr = named ? this.namedStars : this.stars

    // console.log({
    //   hFovRad,
    //   vFovRad,
    //   minAscention,
    //   maxAscention,
    //   minDeclination,
    //   maxDeclination,
    //   _minAscention: Stars.angleToRightAscention(minAscention),
    //   _maxAscention: Stars.angleToRightAscention(maxAscention),
    //   _minDeclination: Stars.angleToDeclination(minDeclination),
    //   _maxDeclination: Stars.angleToDeclination(maxDeclination),
    // })

    const compare = (star: StarTransformed) =>
      (star.phi >= minAscention &&
        star.phi <= maxAscention &&
        star.theta >= minDeclination &&
        star.theta <= maxDeclination) ||
      (star.phi + 2 * Math.PI >= minAscention &&
        star.phi + 2 * Math.PI <= maxAscention &&
        star.theta >= minDeclination &&
        star.theta <= maxDeclination) ||
      (star.phi - 2 * Math.PI >= minAscention &&
        star.phi - 2 * Math.PI <= maxAscention &&
        star.theta >= minDeclination &&
        star.theta <= maxDeclination)

    return arr.filter(compare)
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
        count: 1,
      }
    })
  }

  static getNamedStars(): StarNamed[] {
    return Stars.getTransformedStars().filter((star) => !!star.N) as StarNamed[]
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

  static angleToRightAscention(angle: number) {
    const hours = Math.floor((angle * 12) / Math.PI)
    const minutes = Math.floor(((angle * 12) / Math.PI - hours) * 60)

    const seconds = Math.floor(
      (((angle * 12) / Math.PI - hours) * 60 - minutes) * 60
    )

    const hoursString = `${hours}`.padStart(2, '0')
    const minutesString = `${minutes}`.padStart(2, '0')
    const secondsString = `${seconds}`.padStart(2, '0')

    return `${hoursString}h ${minutesString}m ${secondsString}s`
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
  static angleToDeclination(angle: number) {
    const degrees = Math.floor((angle * 180) / Math.PI)
    const minutes = Math.floor(((angle * 180) / Math.PI - degrees) * 60)

    const seconds = Math.floor(
      (((angle * 180) / Math.PI - degrees) * 60 - minutes) * 60
    )
    const sign = degrees < 0 ? '-' : '+'
    const degreesString = `${Math.abs(degrees)}`.padStart(2, '0')
    const minutesString = `${minutes}`.padStart(2, '0')
    const secondsString = `${seconds}`.padStart(2, '0')

    return `${sign}${degreesString}° ${minutesString}′ ${secondsString}″`
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

  static cartesianToSpherical(cartesian: Vector3) {
    const normalized = cartesian
    const radius = 1
    let ascention = Math.atan2(normalized.x, normalized.z)
    let declination = Math.asin(normalized.y)

    // ascention is in the range of -π to π
    ascention = ascention < -Math.PI ? -Math.PI : ascention
    ascention = ascention > Math.PI ? Math.PI : ascention

    // declination is in the range of -π/2 to π/2
    declination = declination < -Math.PI / 2 ? -Math.PI / 2 : declination
    declination = declination > Math.PI / 2 ? Math.PI / 2 : declination

    return { radius, ascention, declination }
  }

  static getMinV() {
    return stars.reduce((min, star) => Math.min(min, parseFloat(star.V)), 0)
  }
  static getMaxV() {
    return stars.reduce((max, star) => Math.max(max, parseFloat(star.V)), 0)
  }
}
