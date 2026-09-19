import { promises as fs } from 'node:fs'
import path from 'node:path'

const darkSchemes = [
  'vitesse.dark.xml',
  'vitesse.dark.soft.xml',
  'vitesse.black.xml',
]

const originalExpectedForegrounds = {
  'HTML_TAG_NAME': '#ffd166',
  'VUE_TAG_NAME': '#ffd166',
  'JS.KEYWORD': '#ffd166',
  'JS.STRING': '#5be7b0',
  'JS.NUMBER': '#ff7b72',
  'JS.LOCAL_VARIABLE': '#b9d5ff',
  'JS.INSTANCE_MEMBER_VARIABLE': '#ff7eb6',
  'JS.INSTANCE_MEMBER_FUNCTION': '#79c0ff',
  'TS.KEYWORD': '#ffd166',
  'TS.STRING': '#5be7b0',
  'TS.NUMBER': '#ff7b72',
  'TS.CLASS': '#c6a0ff',
  'TS.INTERFACE': '#8fb8ff',
  'TS.INSTANCE_MEMBER_VARIABLE': '#ff7eb6',
  'TS.PARAMETER': '#f0d5a8',
} as const

const spectrumExpectedForegrounds = {
  'HTML_TAG_NAME': '#ff6b9a',
  'VUE_TAG_NAME': '#62dff0',
  'JS.KEYWORD': '#ff6b9a',
  'JS.STRING': '#ffe66d',
  'JS.NUMBER': '#a99af4',
  'JS.LOCAL_VARIABLE': '#f4f0f7',
  'JS.INSTANCE_MEMBER_VARIABLE': '#62dff0',
  'JS.INSTANCE_MEMBER_FUNCTION': '#7fe29a',
  'TS.KEYWORD': '#ff6b9a',
  'TS.STRING': '#ffe66d',
  'TS.NUMBER': '#a99af4',
  'TS.CLASS': '#62dff0',
  'TS.INTERFACE': '#8de8f4',
  'TS.INSTANCE_MEMBER_VARIABLE': '#62dff0',
  'TS.PARAMETER': '#ff9d66',
} as const

const daylightExpectedForegrounds = {
  'TEXT': '#2b303b',
  'DEFAULT_FUNCTION_DECLARATION': '#1d4ed8',
  'DEFAULT_FUNCTION_CALL': '#2563eb',
  'DEFAULT_METADATA': '#a21caf',
  'DEFAULT_PREDEFINED_SYMBOL': '#0f766e',
  'HTML_TAG_NAME': '#7c3aed',
  'VUE_TAG_NAME': '#7c3aed',
  'JS.KEYWORD': '#7c3aed',
  'JS.STRING': '#15803d',
  'JS.NUMBER': '#c2410c',
  'JS.LOCAL_VARIABLE': '#2b303b',
  'JS.INSTANCE_MEMBER_VARIABLE': '#be185d',
  'JS.GLOBAL_FUNCTION': '#1d4ed8',
  'JS.INSTANCE_MEMBER_FUNCTION': '#2563eb',
  'JS.PARAMETER': '#b45309',
  'JS.BUILTIN': '#0f766e',
  'TS.KEYWORD': '#7c3aed',
  'TS.STRING': '#15803d',
  'TS.NUMBER': '#c2410c',
  'TS.CLASS': '#0e7490',
  'TS.INTERFACE': '#0369a1',
  'TS.INSTANCE_MEMBER_VARIABLE': '#be185d',
  'TS.GLOBAL_FUNCTION': '#1d4ed8',
  'TS.INSTANCE_MEMBER_FUNCTION': '#2563eb',
  'TS.PARAMETER': '#b45309',
  'CSS.PROPERTY_NAME': '#be185d',
  'JSON.PROPERTY_KEY': '#be185d',
} as const

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function verifyScheme(filename: string, expectedForegrounds: Readonly<Record<string, string>>) {
  const schemePath = path.resolve(__dirname, '../src/main/resources/themes', filename)
  const xml = await fs.readFile(schemePath, 'utf8')

  if (xml.includes('name="TypeScript.'))
    throw new Error(`${filename}: contains unsupported TypeScript.* keys`)

  for (const [key, color] of Object.entries(expectedForegrounds)) {
    const option = new RegExp(
      `<option name="${escapeRegExp(key)}">\\s*<value>\\s*<option name="FOREGROUND" value="${escapeRegExp(color)}"`,
    )
    if (!option.test(xml))
      throw new Error(`${filename}: ${key} is not mapped to ${color}`)
  }
}

async function verifyLightIdentity(filename: string, name: string, background: string) {
  const xml = await fs.readFile(path.resolve(__dirname, '../src/main/resources/themes', filename), 'utf8')
  if (!xml.includes(`<scheme name="${name}" parent_scheme="Default"`))
    throw new Error(`${filename}: scheme identity is incorrect`)
  const backgroundOption = new RegExp(`<option name="TEXT">[\\s\\S]*?<option name="BACKGROUND" value="${escapeRegExp(background)}"`)
  if (!backgroundOption.test(xml))
    throw new Error(`${filename}: editor background is not ${background}`)
}

async function main() {
  await Promise.all([
    ...darkSchemes.map(filename => verifyScheme(filename, originalExpectedForegrounds)),
    verifyScheme('vitesse.dark.spectrum.xml', spectrumExpectedForegrounds),
    verifyScheme('vitesse.daylight.xml', daylightExpectedForegrounds),
    verifyScheme('vitesse.daylight.white.xml', daylightExpectedForegrounds),
    verifyLightIdentity('vitesse.daylight.xml', 'XLT Daylight', '#fbfbfd'),
    verifyLightIdentity('vitesse.daylight.white.xml', 'XLT Daylight White', '#ffffff'),
  ])

  // eslint-disable-next-line no-console
  console.log('Verified original, Spectrum, Daylight, and Daylight White WebStorm color mappings.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
