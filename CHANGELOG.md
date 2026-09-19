<!-- Keep a Changelog guide -> https://keepachangelog.com -->

# intellij-vitesse-theme Changelog

## [Unreleased]

## [2.0.0] - 2026-09-19

### Changed
- Rebranded the plugin package as **XLT Themes** under author and vendor **xlt**
- Changed the plugin ID to `com.xlt.idea.idea-themes` and updated all theme-provider IDs without removing any registered themes
- Replaced the legacy plugin icons with new XLT spectrum icons for light and dark IDE appearances

## [1.5.0] - 2026-09-19

### Added
- Added **XLT Daylight White** as an eighth independent theme
- Kept the complete XLT Daylight syntax palette and changed only its base background to the pure white used by XLT Nightfall Light
- Kept all seven existing themes unchanged

## [1.4.0] - 2026-09-19

### Added
- Added **XLT Daylight** as a seventh, independent theme without changing the existing six variants
- Added explicit JavaScript, TypeScript, Vue, HTML, CSS, and JSON mappings for the Daylight semantic palette
- Distinguished blue function declarations from function calls and retained italic parameters, built-ins, and comments

## [1.3.0] - 2026-09-19

### Added
- Added **XLT Nightfall Spectrum** as a sixth, independent theme inspired by Monokai Spectrum's semantic color separation
- Assigned rose to keywords and operators, yellow to strings, green to functions, cyan to types and properties, violet to literals, and orange to parameters in the new variant
- Kept all five existing XLT Nightfall theme variants unchanged

## [1.2.0] - 2026-09-19

### Changed
- Raised XLT Nightfall accent brightness and saturation across JavaScript, TypeScript, Vue, HTML, JSON, and CSS
- Gave JavaScript and TypeScript local variables an ice-blue identity instead of neutral gray-white
- Made keywords and Vue/HTML tag names bold so structure is visibly separated from identifiers

## [1.1.1] - 2026-09-19

### Fixed
- Replaced guessed `TypeScript.*` entries with the complete `TS.*` key set used by WebStorm 2026.2
- Added the missing TypeScript/Vue SFC mappings for classes, strings, numbers, exported symbols, static members, enum members, operators, and punctuation
- Corrected JavaScript interface, exported-symbol, operator, and punctuation mappings to their real WebStorm external names

## [1.0.1] - 2026-09-19

### Fixed
- Removed Islands opacity reduction that made inactive tool windows look washed out
- Added explicit Vue, JSX, JavaScript, TypeScript, HTML, CSS, and JSON token mappings to prevent Darcula gray inheritance

### Changed
- Increased neutral text, comment, punctuation, border, and inactive-item contrast while preserving the XLT Nightfall semantic accent colors

## [1.0.0] - 2026-09-19

### Changed
- Rebranded the theme collection as XLT Nightfall
- Rebuilt dark syntax colors around the XLT Nightfall semantic palette: amber keywords and tags, mint strings, coral values, lilac types, rose-pink keys, lime decorators, and sand italic parameters

## [0.8.0] - 2026-09-19

### Changed
- Rebalanced the dark palette around cool blue and cyan syntax colors; property names are no longer yellow
- Reserved coral, gold, violet, and orange for keywords, classes, constants, and literal values to create a clearer syntax hierarchy

## [0.7.1] - 2026-09-18

### Changed
- Raised the Vitesse Nocturne property, constant, and yellow token luminance for clearer JavaScript object keys and warm syntax accents

## [0.7.0] - 2026-09-18

### Changed
- Rebuilt the dark variants as the original Vitesse Nocturne palette: neutral graphite surfaces with electric blue, violet, coral, gold, and cyan syntax accents
- Replaced GitHub Dark-derived surface and selection colors while retaining explicit WebStorm token coverage

## [0.6.0] - 2026-09-18

### Changed
- Aligned Vitesse Dark, Dark Soft, and Black with GitHub Dark's Primer surfaces, contrast, blue selection, and syntax hierarchy
- Added explicit GitHub Dark-compatible HTML, XML, JavaScript, and CSS token mappings for WebStorm

## [0.5.3] - 2026-09-18

### Fixed
- Replaced overpowering green selection overlays with restrained blue selection states

### Changed
- Restored a balanced Vitesse dark syntax hierarchy after the over-bright 0.5.2 experiment

## [0.5.2] - 2026-09-18

### Changed
- Raised only Vitesse Dark foreground and syntax-token brightness to a full-contrast, high-saturation output

## [0.5.1] - 2026-09-18

### Changed
- Increased only the brightness and saturation of existing Vitesse dark syntax colors; retained Vitesse hue families and dark-surface structure

## [0.5.0] - 2026-09-18

### Changed
- Added explicit high-contrast Vue, HTML, XML, and JavaScript token colors for WebStorm instead of inheriting Darcula defaults

## [0.4.4] - 2026-09-18

### Changed
- Increased dark-theme foreground, comment, syntax, status, and accent brightness for clearer code readability

## [0.4.3] - 2026-09-18

### Changed
- Removed the green cast from dark-surface layers and replaced it with neutral charcoal gray

## [0.4.2] - 2026-09-18

### Changed
- Lifted dark-surface brightness and separation across Dark, Dark Soft, and Black for a less oppressive editor workspace

## [0.4.1] - 2026-09-18

### Changed
- Increased selection, hover, and focus contrast so the revised UI is immediately visible
- Reworked Dark Soft into a distinct deep-green layered surface and increased syntax-color separation

## [0.4.0] - 2026-09-18

### Fixed
- Improved the readability of ignored and excluded files in project trees

### Changed
- Added a multi-accent Vitesse system for focus, links, bookmarks, project file colors, and action icons
- Added semantic success, information, warning, and error surfaces for banners, run controls, and progress indicators
- Preserved Vitesse green as the primary action color while improving visual separation across editor UI states

## [0.3.0] - 2026-09-18

### Added
- Added native Islands UI support for all five theme variants

### Changed
- Target IntelliJ IDEA 2026.2.2 with IntelliJ Platform Gradle Plugin 2.x
- Require IntelliJ Platform 2025.3 or newer

## [0.2.10] - 2025-09-22

### Optimize
- sync color form vscode-theme-vitesse，improve the contrast

## [0.2.9] - 2025-09-05

### Optimize
- Enhanced syntax highlighting for string escape sequences and regex patterns
- Fixed UI selection background color issues
- Improved parameter hints background color for light soft theme
- Updated styling for LABEL, STATIC_FIELD, and STATIC_FINAL_FIELD elements

### Other
- Updated Java version to 17
- Refactored font type definitions to use enum
- Updated CI configuration and build system
- Enhanced development documentation
- fix plugin verification error

## [0.2.8] - 2023-12-02

### Optimize
- Update `Inlay Hints` style
- Better background color when UI panel is selected

### Other
- Synchronize the script with the [vscode-theme-vitesse](https://github.com/antfu/vscode-theme-vitesse)

## [0.2.7] - 2023-08-07

### Optimize
- breakpoint background
- file status background color

## [0.2.6] - 2023-07-27

### Optimize
- VSC ignore Color
- Tool color
- shortcut color

## [0.2.5] - 2023-06-23
- update`KEYWORD` color

## [0.2.3] - 2023-06-11

### Optimize
- Todo Color
- HTTP Link
- DEFAULT_GLOBAL_VARIABLE
- `ERRORS` and `WRONG`
- Console background on selected
- `KOTLIN_MUTABLE_VARIABLE`

### Other
- sync colors

## [0.2.2] - 2023-04-24

### Optimize
- JS.PARAMETER
- JS_KEYWORD

## [0.2.1] - 2023-04-14

### Added
- HTML Custom Tag

### Fix
- `SELECTION_BACKGROUND` color not obvious
- `INSTANCE_MEMBER_FUNCTION` color

## [0.2.0] - 2023-04-07

### Added
- add support for `CSS`

### Optimize
- optimize `JS` keyword,function,variable,bracket,type,module
- optimize `HTML` Attribute

## [0.1.0] - 2023-04-05

### Added
- add support for `html` and `xml`
- add support for `punctuation`
- add support for `operator`
- add support for `ComboBox`
- add support for `SearchEverywhereTab`
- add support for `CONSOLE`
- add support for `SearchMatch`

### Optimize
- optimize `Button`
- optimize `ProgressBar`
- optimize `focusColor`
- optimize dark `selectionColor`

## [0.0.1] - 2023-04-03

### Added
- first release

[Unreleased]: https://github.com/loosheng/intellij-vitesse-theme/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.5.0...v2.0.0
[1.5.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.0.1...v1.1.1
[1.0.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.8.0...v1.0.0
[0.8.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.7.1...v0.8.0
[0.7.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.5.3...v0.6.0
[0.5.3]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.4.4...v0.5.0
[0.4.4]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.10...v0.3.0
[0.2.10]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.9...v0.2.10
[0.2.9]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.8...v0.2.9
[0.2.8]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.7...v0.2.8
[0.2.7]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.6...v0.2.7
[0.2.6]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.3...v0.2.5
[0.2.3]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/loosheng/intellij-vitesse-theme/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/loosheng/intellij-vitesse-theme/commits/v0.0.1
