import { promises as fs } from 'node:fs'
import path from 'node:path'
import getTheme from './theme'
import type { GetThemeOptions } from './helper'

interface ThemeBuildMeta {
  base: Omit<GetThemeOptions, 'editorScheme'>
  editorThemePath: string
  UIPath: string
}

async function ensureDirectoryExists(filePath: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
}

async function buildThemes() {
  try {
    const themesDir = path.resolve(__dirname, '../src/main/resources/themes')
    await fs.mkdir(themesDir, { recursive: true })
    const VitesseThemes: ThemeBuildMeta[] = [
      {
        base: {
          name: 'XLT Nightfall Light',
          color: 'light',
        },
        editorThemePath: './src/main/resources/themes/vitesse.light.xml',
        UIPath: './src/main/resources/themes/vitesse.light.theme.json',
      },
      {
        base: {
          name: 'XLT Nightfall Light Soft',
          color: 'light',
          soft: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.light.soft.xml',
        UIPath: './src/main/resources/themes/vitesse.light.soft.theme.json',
      },
      {
        base: {
          name: 'XLT Nightfall',
          color: 'dark',
        },
        editorThemePath: './src/main/resources/themes/vitesse.dark.xml',
        UIPath: './src/main/resources/themes/vitesse.dark.theme.json',
      },
      {
        base: {
          name: 'XLT Nightfall Soft',
          color: 'dark',
          soft: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.dark.soft.xml',
        UIPath: './src/main/resources/themes/vitesse.dark.soft.theme.json',
      },
      {
        base: {
          name: 'XLT Nightfall Black',
          color: 'dark',
          black: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.black.xml',
        UIPath: './src/main/resources/themes/vitesse.black.theme.json',
      },
      {
        base: {
          name: 'XLT Nightfall Spectrum',
          color: 'dark',
          spectrum: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.dark.spectrum.xml',
        UIPath: './src/main/resources/themes/vitesse.dark.spectrum.theme.json',
      },
      {
        base: {
          name: 'XLT Daylight',
          color: 'light',
          daylight: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.daylight.xml',
        UIPath: './src/main/resources/themes/vitesse.daylight.theme.json',
      },
      {
        base: {
          name: 'XLT Daylight White',
          color: 'light',
          daylightWhite: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.daylight.white.xml',
        UIPath: './src/main/resources/themes/vitesse.daylight.white.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne',
          color: 'dark',
          nocturne: true,
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Azureus',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'azureus',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.azureus.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.azureus.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Bordo',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'bordo',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.bordo.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.bordo.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Obscuro',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'obscuro',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.obscuro.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.obscuro.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Sereno',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'sereno',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.sereno.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.sereno.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Uva',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'uva',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.uva.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.uva.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Viola',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'viola',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.viola.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.viola.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Minimus',
          color: 'dark',
          nocturne: true,
          nocturneVariant: 'minimus',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.minimus.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.minimus.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Lux',
          color: 'light',
          nocturne: true,
          nocturneVariant: 'lux',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.lux.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.lux.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Hibernus',
          color: 'light',
          nocturne: true,
          nocturneVariant: 'hibernus',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.hibernus.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.hibernus.theme.json',
      },
      {
        base: {
          name: 'XLT Nocturne Lilac',
          color: 'light',
          nocturne: true,
          nocturneVariant: 'lilac',
        },
        editorThemePath: './src/main/resources/themes/vitesse.nocturne.lilac.xml',
        UIPath: './src/main/resources/themes/vitesse.nocturne.lilac.theme.json',
      },

    ]

    const promises = []

    for (const theme of VitesseThemes) {
      const { base, editorThemePath, UIPath } = theme
      const fullEditorThemePath = path.resolve(__dirname, '..', editorThemePath)
      const fullUIThemePath = path.resolve(__dirname, '..', UIPath)

      // Ensure directories exist
      await ensureDirectoryExists(fullEditorThemePath)
      await ensureDirectoryExists(fullUIThemePath)

      const { editorTheme, UITheme } = getTheme({
        ...base,
        editorScheme: editorThemePath.replace('./src/main/resources', ''),
      })

      promises.push(
        fs.writeFile(fullEditorThemePath, editorTheme, 'utf-8').then(() => {
          // eslint-disable-next-line no-console
          console.log(`Generated: ${editorThemePath}`)
        }),
        fs.writeFile(fullUIThemePath, `${JSON.stringify(UITheme, null, 2)}\n`, 'utf-8').then(() => {
          // eslint-disable-next-line no-console
          console.log(`Generated: ${UIPath}`)
        }),
      )
    }

    await Promise.all(promises)
    // eslint-disable-next-line no-console
    console.log('All theme files generated successfully!')
  }
  catch (e) {
    console.error('Error generating theme files:', e)
    process.exit(1)
  }
}

// Run the build
buildThemes().catch((e) => {
  console.error('Unhandled error in build process:', e)
  process.exit(1)
})
