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

const nocturneExpectedForegrounds = {
  'TEXT': '#b2cacd',
  'DEFAULT_FUNCTION_DECLARATION': '#16a3b6',
  'DEFAULT_FUNCTION_CALL': '#16a3b6',
  'DEFAULT_METADATA': '#d67e5c',
  'DEFAULT_PREDEFINED_SYMBOL': '#49d6e9',
  'HTML_TAG_NAME': '#e66533',
  'HTML_CUSTOM_TAG_NAME': '#49d6e9',
  'VUE_TAG_NAME': '#49d6e9',
  'JS.KEYWORD': '#df769b',
  'JS.STRING': '#49e9a6',
  'JS.NUMBER': '#7060eb',
  'JS.LOCAL_VARIABLE': '#e4b781',
  'JS.INSTANCE_MEMBER_VARIABLE': '#e4b781',
  'JS.GLOBAL_FUNCTION': '#16a3b6',
  'JS.INSTANCE_MEMBER_FUNCTION': '#16a3b6',
  'JS.PARAMETER': '#e4b781',
  'JS.BUILTIN': '#49d6e9',
  'TS.KEYWORD': '#df769b',
  'TS.STRING': '#49e9a6',
  'TS.NUMBER': '#7060eb',
  'TS.CLASS': '#49d6e9',
  'TS.INTERFACE': '#49ace9',
  'TS.INSTANCE_MEMBER_VARIABLE': '#e4b781',
  'TS.GLOBAL_FUNCTION': '#16a3b6',
  'TS.INSTANCE_MEMBER_FUNCTION': '#16a3b6',
  'TS.PARAMETER': '#e4b781',
  'CSS.PROPERTY_NAME': '#e4b781',
  'JSON.PROPERTY_KEY': '#e4b781',
} as const

const minimusExpectedForegrounds = {
  ...nocturneExpectedForegrounds,
  'TEXT': '#c5cdd3',
  'DEFAULT_FUNCTION_DECLARATION': '#3f848d',
  'DEFAULT_FUNCTION_CALL': '#3f848d',
  'DEFAULT_METADATA': '#be856f',
  'DEFAULT_PREDEFINED_SYMBOL': '#72b7c0',
  'HTML_TAG_NAME': '#c37455',
  'HTML_CUSTOM_TAG_NAME': '#72b7c0',
  'VUE_TAG_NAME': '#72b7c0',
  'JS.KEYWORD': '#c88da2',
  'JS.STRING': '#72c09f',
  'JS.NUMBER': '#7068b1',
  'JS.LOCAL_VARIABLE': '#d3b692',
  'JS.INSTANCE_MEMBER_VARIABLE': '#d3b692',
  'JS.GLOBAL_FUNCTION': '#3f848d',
  'JS.INSTANCE_MEMBER_FUNCTION': '#3f848d',
  'JS.PARAMETER': '#d3b692',
  'JS.BUILTIN': '#72b7c0',
  'TS.KEYWORD': '#c88da2',
  'TS.STRING': '#72c09f',
  'TS.NUMBER': '#7068b1',
  'TS.CLASS': '#72b7c0',
  'TS.INTERFACE': '#5998c0',
  'TS.INSTANCE_MEMBER_VARIABLE': '#d3b692',
  'TS.GLOBAL_FUNCTION': '#3f848d',
  'TS.INSTANCE_MEMBER_FUNCTION': '#3f848d',
  'TS.PARAMETER': '#d3b692',
  'CSS.PROPERTY_NAME': '#d3b692',
  'JSON.PROPERTY_KEY': '#d3b692',
} as const

const luxExpectedForegrounds = {
  'TEXT': '#004d57',
  'DEFAULT_FUNCTION_DECLARATION': '#0095a8',
  'DEFAULT_FUNCTION_CALL': '#0095a8',
  'DEFAULT_METADATA': '#b3694d',
  'DEFAULT_PREDEFINED_SYMBOL': '#00bdd6',
  'HTML_TAG_NAME': '#e64100',
  'HTML_CUSTOM_TAG_NAME': '#00bdd6',
  'VUE_TAG_NAME': '#00bdd6',
  'JS.KEYWORD': '#ff5792',
  'JS.STRING': '#00b368',
  'JS.NUMBER': '#5842ff',
  'JS.LOCAL_VARIABLE': '#fa8900',
  'JS.INSTANCE_MEMBER_VARIABLE': '#fa8900',
  'JS.GLOBAL_FUNCTION': '#0095a8',
  'JS.INSTANCE_MEMBER_FUNCTION': '#0095a8',
  'JS.PARAMETER': '#fa8900',
  'JS.BUILTIN': '#00bdd6',
  'TS.KEYWORD': '#ff5792',
  'TS.STRING': '#00b368',
  'TS.NUMBER': '#5842ff',
  'TS.CLASS': '#00bdd6',
  'TS.INTERFACE': '#0094f0',
  'TS.INSTANCE_MEMBER_VARIABLE': '#fa8900',
  'TS.GLOBAL_FUNCTION': '#0095a8',
  'TS.INSTANCE_MEMBER_FUNCTION': '#0095a8',
  'TS.PARAMETER': '#fa8900',
  'CSS.PROPERTY_NAME': '#fa8900',
  'JSON.PROPERTY_KEY': '#fa8900',
} as const

const nocturneVariants = [
  { slug: 'nocturne', name: 'XLT Nocturne', background: '#052529', primary: '#40d4e7', foreground: '#b2cacd', color: 'dark' },
  { slug: 'nocturne.azureus', name: 'XLT Nocturne Azureus', background: '#07273b', primary: '#49ace9', foreground: '#becfda', color: 'dark' },
  { slug: 'nocturne.bordo', name: 'XLT Nocturne Bordo', background: '#322a2d', primary: '#f18eb0', foreground: '#cbbec2', color: 'dark' },
  { slug: 'nocturne.obscuro', name: 'XLT Nocturne Obscuro', background: '#031417', primary: '#40d4e7', foreground: '#b2cacd', color: 'dark' },
  { slug: 'nocturne.sereno', name: 'XLT Nocturne Sereno', background: '#062e32', primary: '#40d4e7', foreground: '#b2cacd', color: 'dark' },
  { slug: 'nocturne.uva', name: 'XLT Nocturne Uva', background: '#292640', primary: '#998ef1', foreground: '#c5c2d6', color: 'dark' },
  { slug: 'nocturne.viola', name: 'XLT Nocturne Viola', background: '#30243d', primary: '#bf8ef1', foreground: '#ccbfd9', color: 'dark' },
  { slug: 'nocturne.minimus', name: 'XLT Nocturne Minimus', background: '#1b2932', primary: '#5998c0', foreground: '#c5cdd3', color: 'dark' },
  { slug: 'nocturne.lux', name: 'XLT Nocturne Lux', background: '#fef8ec', primary: '#0099ad', foreground: '#004d57', color: 'light' },
  { slug: 'nocturne.hibernus', name: 'XLT Nocturne Hibernus', background: '#f4f6f6', primary: '#0099ad', foreground: '#004d57', color: 'light' },
  { slug: 'nocturne.lilac', name: 'XLT Nocturne Lilac', background: '#f2f1f8', primary: '#7060eb', foreground: '#0c006b', color: 'light' },
] as const

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

async function verifySchemeIdentity(filename: string, name: string, parentScheme: 'Default' | 'Darcula', background: string) {
  const xml = await fs.readFile(path.resolve(__dirname, '../src/main/resources/themes', filename), 'utf8')
  if (!xml.includes(`<scheme name="${name}" parent_scheme="${parentScheme}"`))
    throw new Error(`${filename}: scheme identity is incorrect`)
  const backgroundOption = new RegExp(`<option name="TEXT">[\\s\\S]*?<option name="BACKGROUND" value="${escapeRegExp(background)}"`)
  if (!backgroundOption.test(xml))
    throw new Error(`${filename}: editor background is not ${background}`)
}

async function verifyUITheme(filename: string, name: string, background: string, primary: string, color: 'light' | 'dark') {
  const contents = await fs.readFile(path.resolve(__dirname, '../src/main/resources/themes', filename), 'utf8')
  const theme = JSON.parse(contents)
  if (theme.name !== name || theme.dark !== (color === 'dark') || theme.parentTheme !== `Islands ${color === 'dark' ? 'Dark' : 'Light'}`)
    throw new Error(`${filename}: UI theme identity is incorrect`)
  if (theme.ui?.['*']?.background !== background)
    throw new Error(`${filename}: UI background is not ${background}`)
  if (theme.ui?.EditorTabs?.underlinedBorderColor !== primary)
    throw new Error(`${filename}: active tab accent is not ${primary}`)
  if (theme.colors?.['layer-0-bg'] !== background || theme.colors?.['text-default'] !== theme.ui?.['*']?.foreground)
    throw new Error(`${filename}: Islands named colors are not aligned with the theme palette`)
  if (theme.ui?.Island?.borderWidth !== 6 || theme.ui?.Island?.borderColor !== background)
    throw new Error(`${filename}: Islands workspace spacing is not configured correctly`)
  if (theme.ui?.ToolWindow?.borderColor !== `${background}00` || theme.ui?.EditorTabs?.underTabsBorderColor === `${background}00`)
    throw new Error(`${filename}: outer tool-window or editor-tab border is incorrect`)
}

async function main() {
  await Promise.all([
    ...darkSchemes.map(filename => verifyScheme(filename, originalExpectedForegrounds)),
    verifyScheme('vitesse.dark.spectrum.xml', spectrumExpectedForegrounds),
    verifyScheme('vitesse.daylight.xml', daylightExpectedForegrounds),
    verifyScheme('vitesse.daylight.white.xml', daylightExpectedForegrounds),
    verifySchemeIdentity('vitesse.daylight.xml', 'XLT Daylight', 'Default', '#fbfbfd'),
    verifySchemeIdentity('vitesse.daylight.white.xml', 'XLT Daylight White', 'Default', '#ffffff'),
    ...nocturneVariants.flatMap(({ slug, name, background, primary, foreground, color }) => {
      const editorFilename = `vitesse.${slug}.xml`
      const uiFilename = `vitesse.${slug}.theme.json`
      const expected = slug === 'nocturne.minimus'
        ? minimusExpectedForegrounds
        : color === 'light'
          ? { ...luxExpectedForegrounds, TEXT: foreground }
          : { ...nocturneExpectedForegrounds, TEXT: foreground }
      return [
        verifyScheme(editorFilename, expected),
        verifySchemeIdentity(editorFilename, name, color === 'dark' ? 'Darcula' : 'Default', background),
        verifyUITheme(uiFilename, name, background, primary, color),
      ]
    }),
  ])

  // eslint-disable-next-line no-console
  console.log('Verified original, Spectrum, Daylight, Daylight White, and all eleven Nocturne WebStorm color mappings.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
