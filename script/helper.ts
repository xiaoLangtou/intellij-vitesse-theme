import { VitesseThemes, colors } from './colors'

export interface GetThemeOptions {
  color: 'light' | 'dark'
  name: string
  soft?: boolean
  black?: boolean
  spectrum?: boolean
  daylight?: boolean
  daylightWhite?: boolean
  nocturne?: boolean
  nocturneVariant?: 'azureus' | 'bordo' | 'obscuro' | 'sereno' | 'uva' | 'viola' | 'minimus' | 'lux' | 'hibernus' | 'lilac'
  editorScheme: string
}
function toArray<T>(arr: T | T[]): T[] {
  if (Array.isArray(arr))
    return arr
  return [arr]
}

export function getColors(style: 'light' | 'dark'): typeof colors {
  if (style === 'dark') {
    /* The array of light to dark colors are reversed to auto-generate dark theme */
    const darkColors: any = {}
    Object.entries(colors).forEach(([name, val]) => {
      if (name === 'black')
        darkColors.white = val

      else if (name === 'white')
        darkColors.black = val

      else
        darkColors[name] = [...toArray(val)].reverse()
    })
    return darkColors
  }
  else {
    return colors
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function createThemeHelpers({ color, soft = false, black = false, spectrum = false, daylight = false, daylightWhite = false, nocturne = false, nocturneVariant }: GetThemeOptions) {
  const pick = (options: { light?: string; dark?: string }) => options[color]

  const v = (key: keyof typeof VitesseThemes, op = '') => {
    const nocturneLightFallback = ['lux', 'hibernus', 'lilac'].includes(nocturneVariant || '')
      ? VitesseThemes[`nocturneLux${capitalize(key)}` as keyof typeof VitesseThemes]
      : undefined
    let obj = daylightWhite
      ? (VitesseThemes[`daylightWhite${capitalize(key)}` as keyof typeof VitesseThemes]
        || VitesseThemes[`daylight${capitalize(key)}` as keyof typeof VitesseThemes]
        || VitesseThemes[key])
      : daylight
        ? (VitesseThemes[`daylight${capitalize(key)}` as keyof typeof VitesseThemes] || VitesseThemes[key])
        : nocturne
          ? ((nocturneVariant && VitesseThemes[`nocturne${capitalize(nocturneVariant)}${capitalize(key)}` as keyof typeof VitesseThemes])
            || nocturneLightFallback
            || VitesseThemes[`nocturne${capitalize(key)}` as keyof typeof VitesseThemes]
            || VitesseThemes[key])
          : spectrum
            ? (VitesseThemes[`spectrum${capitalize(key)}` as keyof typeof VitesseThemes] || VitesseThemes[key])
            : black
              ? (VitesseThemes[`black${capitalize(key)}` as keyof typeof VitesseThemes] || VitesseThemes[key])
              : soft
                ? (VitesseThemes[`soft${capitalize(key)}` as keyof typeof VitesseThemes] || VitesseThemes[key])
                : VitesseThemes[key]

    if (typeof obj === 'string')
      obj = [obj, obj]

    return pick({ light: obj[1] + op, dark: obj[0] + op })
  }

  const colors = getColors(color)

  return {
    pick,
    colors,
    v,
  }
}
