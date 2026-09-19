import builder from 'xmlbuilder'
import pkg from '../package.json'
import type { GetThemeOptions } from './helper'
import { createThemeHelpers } from './helper'
import { FONT_TYPE } from './constant'

export default function getEditorSchemeTheme(options: GetThemeOptions) {
  const isDaylight = options.daylight || options.daylightWhite

  // Usage: `pick({ light: "lightblue", dark: "darkblue" })`
  const {
    pick,
    v,
    colors,
  } = createThemeHelpers(options)

  const foreground = v('foreground')
  const secondaryForeground = v('secondaryForeground')
  const activeForeground = v('activeForeground')
  const primary = v('primary')
  const secondary = v('secondary')
  const tertiary = v('tertiary')
  const success = v('green')
  const info = v('blue')
  const warning = v('yellow')
  const danger = v('red')
  const functionDeclaration = isDaylight ? v('functionDeclaration') : v('function')
  const functionCall = isDaylight ? v('functionCall') : v('function')

  const border = v('border')
  const background = v('background')
  const activeBackground = v('activeBackground')
  const elevatedBackground = v('elevatedBackground')
  const mainWindowBackground = v('mainWindowBackground')
  const transparentBackground = `${background}00`

  const punctuation = v('punctuation')

  const selectionBackground = v('selectionBackground')
  const selectionBackgroundActive = v('selectionBackgroundActive')
  const selectionBackgroundInActive = v('selectionBackgroundInActive')
  const successSurface = v('successSurface')
  const infoSurface = v('infoSurface')
  const warningSurface = v('warningSurface')
  const errorSurface = v('errorSurface')
  const violetSurface = v('violetSurface')

  const selectionBackground2 = isDaylight ? selectionBackgroundActive : pick({ light: '#d3d3d3', dark: '#313d58' })

  // root element
  const theme = builder.create('scheme', { encoding: 'utf-8' })
  theme.att('name', options.name)
  theme.att('parent_scheme', options.color === 'light' ? 'Default' : 'Darcula')
  theme.att('version', '1')
  /**
  ADDED_LINES_COLOR: 表示版本控制中新增行的颜色
  ANNOTATIONS_COLOR: 表示注释的颜色
  ANNOTATIONS_LAST_COMMIT_COLOR: 表示最后一次提交的注释颜色
  CARET_COLOR: 表示光标的颜色
  CARET_ROW_COLOR: 表示当前行的背景色
  CONSOLE_BACKGROUND_KEY: 表示控制台的背景色
  DELETED_LINES_COLOR: 表示版本控制中删除行的颜色
  DIFF_SEPARATORS_BACKGROUND: 表示差异分隔符的背景色
  DOCUMENTATION_COLOR: 表示文档注释的颜色
  DOC_COMMENT_GUIDE: 表示文档注释中的引导线的颜色
  DOC_COMMENT_LINK: 表示文档注释中的链接颜色
  ERROR_HINT: 表示错误提示的颜色
  FOLDED_TEXT_BORDER_COLOR: 表示折叠文本的边框颜色
  IGNORED_ADDED_LINES_BORDER_COLOR: 表示被忽略的新增行的边框颜色
  IGNORED_DELETED_LINES_BORDER_COLOR: 表示被忽略的删除行的边框颜色
  IGNORED_MODIFIED_LINES_BORDER_COLOR: 表示被忽略的修改行的边框颜色
  INDENT_GUIDE: 表示缩进线的颜色
  INFORMATION_HINT: 表示信息提示的颜色
  INLINE_REFACTORING_SETTINGS_DEFAULT: 表示内联重构默认颜色
  INLINE_REFACTORING_SETTINGS_FOCUSED: 表示被聚焦时的内联重构颜色
  INLINE_REFACTORING_SETTINGS_HOVERED: 表示被悬停时的内联重构颜色
  LINE_NUMBERS_COLOR: 表示行号的颜色
  LINE_NUMBER_ON_CARET_ROW_COLOR: 表示光标所在行号的颜色
  LOOKUP_COLOR: 表示查找提示的颜色
  METHOD_SEPARATORS_COLOR: 表示方法之间的分隔符颜色
  MODIFIED_LINES_COLOR: 表示版本控制中修改行的颜色
  NOTIFICATION_BACKGROUND: 表示通知的背景色
  PROMOTION_PANE: 表示推广面板的背景色
  QUESTION_HINT: 表示问题提示的颜色
  RECENT_LOCATIONS_SELECTION: 表示最近位置的选中颜色
  RIGHT_MARGIN_COLOR: 表示右边距的颜色
  SELECTED_INDENT_GUIDE: 表示选中缩进线的颜色
  ScrollBar.Mac.hoverThumbColor: 表示 Mac 系统悬停时滚动条的拇指颜色
  ScrollBar.Mac.thumbColor: 表示 Mac 系统滚动条的拇指颜色
  VCS_ANNOTATIONS_COLOR_1: 表示版本控制注释颜色 1
  VCS_ANNOTATIONS_COLOR_2: 表示版本控制注释颜色 2
  VCS_ANNOTATIONS_COLOR_3: 表示版本控制注释颜色 3
  VCS_ANNOTATIONS_COLOR_4: 表示版本控制注释颜色 4
  VCS_ANNOTATIONS_COLOR_5: 表示版本控制注释颜色 5
  VISUAL_INDENT_GUIDE: 表示可视化缩进线的颜色
  WHITESPACES: 表示空格和制表符的颜色
  WHITESPACES_MODIFIED_LINES_COLOR: 表示版本控制中修改后的空格和制表符的颜色
  **/
  const colorsElement = theme.ele('colors')
  const htmlTagTreeColors = options.spectrum
    ? ['#ff6b9a', '#62dff0', '#7fe29a', '#ff9d66', '#a99af4', '#ffe66d']
    : [
        pick({ light: colors.orange[5], dark: '#ffd166' }),
        pick({ light: colors.pink[5], dark: '#ff7eb6' }),
        pick({ light: colors.green[5], dark: '#5be7b0' }),
        pick({ light: colors.blue[5], dark: '#79c0ff' }),
        pick({ light: colors.purple[5], dark: '#c6a0ff' }),
        pick({ light: colors.red[5], dark: '#ff7b72' }),
      ]
  htmlTagTreeColors.forEach((value, index) => {
    colorsElement.ele('option', { name: `HTML_TAG_TREE_LEVEL${index}`, value })
  })
  // ADDED_LINES_COLOR  表示版本控制中新增行的颜色
  colorsElement.ele('option', { name: 'ADDED_LINES_COLOR', value: v('green') })
  // GUTTER_BACKGROUND 编辑区域左侧行号区域背景色
  colorsElement.ele('option', { name: 'GUTTER_BACKGROUND', value: background })
  // SELECTION_BACKGROUND 选中区域背景色
  colorsElement.ele('option', { name: 'SELECTION_BACKGROUND', value: selectionBackground2 })
  // SELECTION_FOREGROUND 选中区域前景色
  colorsElement.ele('option', { name: 'SELECTION_FOREGROUND' })
  // <option name="FILESTATUS_IDEA_FILESTATUS_IGNORED" value="a9b837" />
  colorsElement.ele('option', { name: 'FILESTATUS_IDEA_FILESTATUS_IGNORED', value: v('ignored') })
  colorsElement.ele('option', { name: 'ANNOTATIONS_COLOR', value: v('comment') })
  colorsElement.ele('option', { name: 'ANNOTATIONS_LAST_COMMIT_COLOR', value: v('comment') })
  colorsElement.ele('option', { name: 'CARET_COLOR', value: pick({ light: '#000000', dark: '#aeafad' }) })
  colorsElement.ele('option', { name: 'CARET_ROW_COLOR', value: activeBackground })
  colorsElement.ele('option', { name: 'CONSOLE_BACKGROUND_KEY', value: background })
  colorsElement.ele('option', { name: 'DELETED_LINES_COLOR', value: v('red') })
  colorsElement.ele('option', { name: 'DIFF_SEPARATORS_BACKGROUND', value: v('activeBackground') })
  colorsElement.ele('option', { name: 'DOCUMENTATION_COLOR', value: background })
  colorsElement.ele('option', { name: 'DOC_COMMENT_GUIDE', value: v('comment') })
  colorsElement.ele('option', { name: 'DOC_COMMENT_LINK', value: v('comment') })
  colorsElement.ele('option', { name: 'ERROR_HINT', value: v('red') })
  colorsElement.ele('option', { name: 'FOLDED_TEXT_BORDER_COLOR', value: activeBackground })
  colorsElement.ele('option', { name: 'IGNORED_ADDED_LINES_BORDER_COLOR', value: v('green') })
  colorsElement.ele('option', { name: 'IGNORED_DELETED_LINES_BORDER_COLOR', value: v('red') })
  colorsElement.ele('option', { name: 'IGNORED_MODIFIED_LINES_BORDER_COLOR', value: v('blue') })
  colorsElement.ele('option', { name: 'INDENT_GUIDE', value: pick({ light: colors.gray[2], dark: colors.gray[1] }) })
  colorsElement.ele('option', { name: 'INFORMATION_HINT', value: background })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_DEFAULT', value: v('primary') })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_FOCUSED', value: v('primary') })
  colorsElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_HOVERED', value: v('primary') })
  colorsElement.ele('option', { name: 'LINE_NUMBERS_COLOR', value: v('ignored') })
  colorsElement.ele('option', { name: 'LINE_NUMBER_ON_CARET_ROW_COLOR', value: activeForeground })
  colorsElement.ele('option', { name: 'LOOKUP_COLOR', value: background })
  colorsElement.ele('option', { name: 'METHOD_SEPARATORS_COLOR', value: colors.gray[3] })
  colorsElement.ele('option', { name: 'MODIFIED_LINES_COLOR', value: v('blue') })
  colorsElement.ele('option', { name: 'NOTIFICATION_BACKGROUND', value: activeBackground })
  colorsElement.ele('option', { name: 'PROMOTION_PANE', value: activeBackground })
  colorsElement.ele('option', { name: 'QUESTION_HINT', value: v('yellow') })
  colorsElement.ele('option', { name: 'RECENT_LOCATIONS_SELECTION', value: activeBackground })
  colorsElement.ele('option', { name: 'RIGHT_MARGIN_COLOR', value: v('ignored') })
  colorsElement.ele('option', { name: 'SELECTED_INDENT_GUIDE', value: v('primary') })
  colorsElement.ele('option', { name: 'ScrollBar.Mac.hoverThumbColor', value: v('ignored') })
  colorsElement.ele('option', { name: 'ScrollBar.Mac.thumbColor', value: v('faded') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_1', value: v('green') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_2', value: v('blue') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_3', value: v('yellow') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_4', value: v('red') })
  colorsElement.ele('option', { name: 'VCS_ANNOTATIONS_COLOR_5', value: v('orange') })
  colorsElement.ele('option', { name: 'VISUAL_INDENT_GUIDE', value: v('ignored') })
  colorsElement.ele('option', { name: 'WHITESPACES', value: v('ignored') })
  colorsElement.ele('option', { name: 'WHITESPACES_MODIFIED_LINES_COLOR', value: v('ignored') })

  // attributes
  const attributesElement = theme.ele('attributes')
  const TEXT = attributesElement.ele('option', { name: 'TEXT' }).ele('value')
  TEXT.ele('option', { name: 'FOREGROUND', value: foreground })
  TEXT.ele('option', { name: 'BACKGROUND', value: background })

  //   <option name="ERRORS_ATTRIBUTES">
  //   <value>
  //     <option name="EFFECT_COLOR" value="166dcd" />
  //     <option name="ERROR_STRIPE_COLOR" value="166dcd" />
  //     <option name="EFFECT_TYPE" value="2" />
  //   </value>
  // </option>
  const ERRORS_ATTRIBUTES = attributesElement.ele('option', { name: 'ERRORS_ATTRIBUTES' }).ele('value')
  ERRORS_ATTRIBUTES.ele('option', { name: 'EFFECT_COLOR', value: pick({ light: colors.red[5], dark: colors.red[4] }) })
  ERRORS_ATTRIBUTES.ele('option', { name: 'ERROR_STRIPE_COLOR', value: pick({ light: colors.red[5], dark: colors.red[4] }) })
  ERRORS_ATTRIBUTES.ele('option', { name: 'EFFECT_TYPE', value: '2' })
  //   <option name="WRONG_REFERENCES_ATTRIBUTES">
  //   <value>
  //     <option name="FOREGROUND" value="166dcd" />
  //   </value>
  // </option>
  const WRONG_REFERENCES_ATTRIBUTES = attributesElement.ele('option', { name: 'WRONG_REFERENCES_ATTRIBUTES' }).ele('value')
  WRONG_REFERENCES_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: pick({ light: colors.red[5], dark: colors.red[4] }) })

  attributesElement.ele('option', { name: 'ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES' }).ele('value')
  // ANNOTATION_NAME_ATTRIBUTES: 表示注释名称的属性
  attributesElement.ele('option', { name: 'ANNOTATION_NAME_ATTRIBUTES', baseAttributes: 'DEFAULT_METADATA' })

  // BREADCRUMBS_CURRENT : 表示当前面包屑的属性
  const BREADCRUMBS_CURRENT = attributesElement.ele('option', { name: 'BREADCRUMBS_CURRENT' }).ele('value')
  BREADCRUMBS_CURRENT.ele('option', { name: 'FOREGROUND', value: v('foreground') })
  BREADCRUMBS_CURRENT.ele('option', { name: 'BACKGROUND', value: v('activeBackground') })

  // BREADCRUMBS_DEFAULT : 表示默认面包屑的属性
  const BREADCRUMBS_DEFAULT = attributesElement.ele('option', { name: 'BREADCRUMBS_DEFAULT' }).ele('value')
  BREADCRUMBS_DEFAULT.ele('option', { name: 'FOREGROUND', value: colors.gray[5] })

  // BREADCRUMBS_HOVERED : 表示悬停面包屑的属性
  const BREADCRUMBS_HOVERED = attributesElement.ele('option', { name: 'BREADCRUMBS_HOVERED' }).ele('value')
  BREADCRUMBS_HOVERED.ele('option', { name: 'FOREGROUND', value: v('foreground') })

  // BREADCRUMBS_INACTIVE : 表示不活动面包屑的属性
  const BREADCRUMBS_INACTIVE = attributesElement.ele('option', { name: 'BREADCRUMBS_INACTIVE' }).ele('value')
  BREADCRUMBS_INACTIVE.ele('option', { name: 'FOREGROUND', value: colors.gray[4] })

  // BREAKPOINT_ATTRIBUTES : 表示断点的属性
  const BREAKPOINT_ATTRIBUTES = attributesElement.ele('option', { name: 'BREAKPOINT_ATTRIBUTES' }).ele('value')
  BREAKPOINT_ATTRIBUTES.ele('option', { name: 'BACKGROUND', value: v('red', '50') })
  BREAKPOINT_ATTRIBUTES.ele('option', { name: 'ERROR_STRIPE_COLOR', value: pick({ light: '#8c5b65', dark: '#8c5b65' }) })

  //   <option name="DEFAULT_METADATA">
  //   <value>
  //     <option name="FOREGROUND" value="1633a5" />
  //   </value>
  // </option>
  const DEFAULT_METADATA = attributesElement.ele('option', { name: 'DEFAULT_METADATA' }).ele('value')
  DEFAULT_METADATA.ele('option', { name: 'FOREGROUND', value: v('decorator') })

  // <option name="CUSTOM_STRING_ATTRIBUTES" baseAttributes="DEFAULT_STRING" />
  attributesElement.ele('option', { name: 'CUSTOM_STRING_ATTRIBUTES' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })
  // <option name="CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES" baseAttributes="DEFAULT_VALID_STRING_ESCAPE" />
  attributesElement.ele('option', { name: 'CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })

  // eg: .
  //     ^
  attributesElement.ele('option', { name: 'DEFAULT_DOT' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('punctuation') })

  // eg: ,
  //     ^
  const DEFAULT_COMMA = attributesElement.ele('option', { name: 'DEFAULT_COMMA' }).ele('value')
  DEFAULT_COMMA.ele('option', { name: 'FOREGROUND', value: v('punctuation') })

  // eg: ;
  //     ^
  const DEFAULT_SEMICOLON = attributesElement.ele('option', { name: 'DEFAULT_SEMICOLON' }).ele('value')
  DEFAULT_SEMICOLON.ele('option', { name: 'FOREGROUND', value: v('punctuation') })

  // eg: "/***/"
  attributesElement.ele('option', { name: 'DEFAULT_BLOCK_COMMENT' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('comment') })
  attributesElement.ele('option', { name: 'DEFAULT_DOC_MARKUP' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('comment') })

  // eg: "/** @tag <code>Markup<</code> */"
  attributesElement.ele('option', { name: 'DEFAULT_DOC_COMMENT_TAG' }).ele('value').ele('option', { name: 'FOREGROUND', value: primary })
  const DEFAULT_DOC_COMMENT_TAG_VALUE = attributesElement.ele('option', { name: 'DEFAULT_DOC_COMMENT_TAG_VALUE' }).ele('value')
  DEFAULT_DOC_COMMENT_TAG_VALUE.ele('option', { name: 'FOREGROUND', value: v('variable') })

  // eg: <p></p>
  //      ^   ^
  const DEFAULT_TAG = attributesElement.ele('option', { name: 'DEFAULT_TAG' }).ele('value')
  DEFAULT_TAG.ele('option', { name: 'BACKGROUND', value: background })
  DEFAULT_TAG.ele('option', { name: 'FOREGROUND', value: primary })

  // eg: class A{}
  //           ^
  attributesElement.ele('option', { name: 'DEFAULT_CLASS_NAME' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('class') })
  attributesElement.ele('option', { name: 'DEFAULT_CLASS_REFERENCE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('class') })

  // eg: const A = 'foo'
  //           ^
  const DEFAULT_CONSTANT = attributesElement.element('option', { name: 'DEFAULT_CONSTANT' }).ele('value')
  DEFAULT_CONSTANT.ele('option', { name: 'FOREGROUND', value: v('constant') })
  DEFAULT_CONSTANT.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })

  // eg: if (a === 1) return for ...
  //      ^              ^    ^
  const DEFAULT_KEYWORD = attributesElement.ele('option', { name: 'DEFAULT_KEYWORD' }).ele('value')
  DEFAULT_KEYWORD.ele('option', { name: 'FOREGROUND', value: v('keyword') })
  DEFAULT_KEYWORD.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  // eg: function foo(){}
  //                ^
  attributesElement.ele('option', { name: 'DEFAULT_FUNCTION_DECLARATION' }).ele('value').ele('option', { name: 'FOREGROUND', value: functionDeclaration })

  // eg: foo()
  //       ^
  attributesElement.ele('option', { name: 'DEFAULT_FUNCTION_CALL' }).ele('value').ele('option', { name: 'FOREGROUND', value: functionCall })

  // eg: const a = 1
  //               ^
  attributesElement.ele('option', { name: 'DEFAULT_NUMBER' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('number') })

  // eg: const a = 'foo'
  //                 ^
  attributesElement.ele('option', { name: 'DEFAULT_STRING' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })

  // 标识符
  attributesElement.ele('option', { name: 'DEFAULT_IDENTIFIER' }).ele('value').ele('option', { name: 'FOREGROUND', value: foreground })

  // var a = 1
  //     ^
  attributesElement.ele('option', { name: 'DEFAULT_GLOBAL_VARIABLE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('variable') })

  /**
   *     <option name="DEFAULT_VALID_STRING_ESCAPE">
   *       <value>
   *         <option name="FOREGROUND" value="5757c6" />
   *         <option name="FONT_TYPE" value="1" />
   *       </value>
   *     </option>
   */
  const DEFAULT_VALID_STRING_ESCAPE = attributesElement.ele('option', { name: 'DEFAULT_VALID_STRING_ESCAPE' }).ele('value')
  DEFAULT_VALID_STRING_ESCAPE.ele('option', { name: 'FOREGROUND', value: v('string') })
  DEFAULT_VALID_STRING_ESCAPE.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  const DEFAULT_ENTITY = attributesElement.ele('option', { name: 'DEFAULT_ENTITY' }).ele('value')
  DEFAULT_ENTITY.ele('option', { name: 'FOREGROUND', value: primary })
  DEFAULT_ENTITY.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  // eg: const a = new A() a.foo
  //                          ^
  attributesElement.ele('option', { name: 'DEFAULT_INSTANCE_FIELD' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })

  // eg: interface A {}
  //               ^
  const DEFAULT_INTERFACE_NAME = attributesElement.ele('option', { name: 'DEFAULT_INTERFACE_NAME' }).ele('value')
  DEFAULT_INTERFACE_NAME.ele('option', { name: 'FOREGROUND', value: v('interface') })

  // eg: Number.MAX_SAFE_INTEGER
  //                   ^
  attributesElement.ele('option', { name: 'DEFAULT_STATIC_FIELD' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })

  // eg: Number.isNaN()
  //               ^
  attributesElement.ele('option', { name: 'DEFAULT_STATIC_METHOD', baseAttributes: 'DEFAULT_FUNCTION_DECLARATION' })

  // eg: <span>{{ a }}</span>
  //              ^
  attributesElement.ele('option', { name: 'DEFAULT_TEMPLATE_LANGUAGE_COLOR' }).ele('value').ele('option', { name: 'BACKGROUND', value: background })

  // eg: <span title='foo'></span>
  //             ^
  const DEFAULT_ATTRIBUTE = attributesElement.ele('option', { name: 'DEFAULT_ATTRIBUTE' }).ele('value')
  DEFAULT_ATTRIBUTE.ele('option', { name: 'FOREGROUND', value: v('property') })

  const TEXT_SEARCH_RESULT_ATTRIBUTES = attributesElement.ele('option', { name: 'TEXT_SEARCH_RESULT_ATTRIBUTES' }).ele('value')
  TEXT_SEARCH_RESULT_ATTRIBUTES.ele('option', { name: 'BACKGROUND', value: pick({ light: '#e6cc7766', dark: '#e6cc7744' }) })
  // TEXT_SEARCH_RESULT_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: foreground })

  const DEFAULT_LABEL = attributesElement.ele('option', { name: 'DEFAULT_LABEL' }).ele('value')
  DEFAULT_LABEL.ele('option', { name: 'FOREGROUND', value: v('function') })
  DEFAULT_LABEL.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  // JAVA
  attributesElement.ele('option', { name: 'INSTANCE_FIELD_ATTRIBUTES', baseAttributes: 'DEFAULT_INSTANCE_FIELD' })

  const STATIC_FIELD_ATTRIBUTES = attributesElement.ele('option', { name: 'STATIC_FIELD_ATTRIBUTES' }).ele('value')
  STATIC_FIELD_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: v('property') })

  const STATIC_FINAL_FIELD_ATTRIBUTES = attributesElement.ele('option', { name: 'STATIC_FINAL_FIELD_ATTRIBUTES' }).ele('value')
  STATIC_FINAL_FIELD_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: v('constant') })
  STATIC_FINAL_FIELD_ATTRIBUTES.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })

  const DEFAULT_INVALID_STRING_ESCAPE = attributesElement.ele('option', { name: 'DEFAULT_INVALID_STRING_ESCAPE' }).ele('value')
  DEFAULT_INVALID_STRING_ESCAPE.ele('option', { name: 'FOREGROUND', value: v('comment') })
  DEFAULT_INVALID_STRING_ESCAPE.element('option', { name: 'EFFECT_COLOR', value: v('red') })
  DEFAULT_INVALID_STRING_ESCAPE.element('option', { name: 'EFFECT_TYPE', value: FONT_TYPE.ITALIC })

  const DEFAULT_LOCAL_VARIABLE = attributesElement.ele('option', { name: 'DEFAULT_LOCAL_VARIABLE' }).ele('value')
  DEFAULT_LOCAL_VARIABLE.ele('option', { name: 'FOREGROUND', value: v('variable') })
  const DEFAULT_PARAMETER = attributesElement.ele('option', { name: 'DEFAULT_PARAMETER' }).ele('value')
  DEFAULT_PARAMETER.ele('option', { name: 'FOREGROUND', value: (options.spectrum || isDaylight) ? v('parameter') : pick({ light: v('variable'), dark: '#f0d5a8' }) })
  DEFAULT_PARAMETER.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })

  attributesElement.ele('option', { name: 'DEFAULT_REASSIGNED_LOCAL_VARIABLE', baseAttributes: 'DEFAULT_LOCAL_VARIABLE' })
  attributesElement.ele('option', { name: 'DEFAULT_REASSIGNED_PARAMETER', baseAttributes: 'DEFAULT_PARAMETER' })

  const BAD_CHARACTER = attributesElement.ele('option', { name: 'BAD_CHARACTER' }).ele('value')
  BAD_CHARACTER.ele('option', { name: 'EFFECT_COLOR', value: v('red') })
  BAD_CHARACTER.ele('option', { name: 'EFFECT_TYPE', value: FONT_TYPE.ITALIC })

  const DEFAULT_OPERATION_SIGN = attributesElement.ele('option', { name: 'DEFAULT_OPERATION_SIGN' }).ele('value')
  DEFAULT_OPERATION_SIGN.ele('option', { name: 'FOREGROUND', value: v('operator') })

  // Explicit generic coverage prevents unmapped language tokens from falling back to Darcula gray.
  for (const name of ['DEFAULT_BRACES', 'DEFAULT_BRACKETS', 'DEFAULT_PARENTHS'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: punctuation })
  for (const name of ['DEFAULT_COMMENT', 'DEFAULT_LINE_COMMENT', 'DEFAULT_DOC_COMMENT']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: v('comment') })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  }
  attributesElement.ele('option', { name: 'DEFAULT_INSTANCE_METHOD' }).ele('value').ele('option', { name: 'FOREGROUND', value: functionCall })
  attributesElement.ele('option', { name: 'DEFAULT_HIGHLIGHTED_REFERENCE' }).ele('value').ele('option', { name: 'FOREGROUND', value: activeForeground })

  // Vue templates use the HTML/XML token family rather than generic defaults.
  // Set all of these explicitly so WebStorm does not inherit Darcula colors.
  const HTML_ATTRIBUTE_NAME = attributesElement.ele('option', { name: 'HTML_ATTRIBUTE_NAME' }).ele('value')
  HTML_ATTRIBUTE_NAME.ele('option', { name: 'FOREGROUND', value: v('property') })
  const HTML_ATTRIBUTE_VALUE = attributesElement.ele('option', { name: 'HTML_ATTRIBUTE_VALUE' }).ele('value')
  HTML_ATTRIBUTE_VALUE.ele('option', { name: 'FOREGROUND', value: v('string') })

  const HTML_TAG = attributesElement.ele('option', { name: 'HTML_TAG' }).ele('value')
  HTML_TAG.ele('option', { name: 'FOREGROUND', value: options.spectrum ? punctuation : primary })
  HTML_TAG.ele('option', { name: 'BACKGROUND', value: background })

  const HTML_TAG_NAME = attributesElement.ele('option', { name: 'HTML_TAG_NAME' }).ele('value')
  HTML_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('keyword') : primary })
  HTML_TAG_NAME.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const HTML_CUSTOM_TAG_NAME = attributesElement.ele('option', { name: 'HTML_CUSTOM_TAG_NAME' }).ele('value')
  HTML_CUSTOM_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : primary })
  const HTML_ENTITY_REFERENCE = attributesElement.ele('option', { name: 'HTML_ENTITY_REFERENCE' }).ele('value')
  HTML_ENTITY_REFERENCE.ele('option', { name: 'FOREGROUND', value: danger })
  attributesElement.ele('option', { name: 'HTML_CODE' }).ele('value').ele('option', { name: 'FOREGROUND', value: foreground })
  const HTML_COMMENT = attributesElement.ele('option', { name: 'HTML_COMMENT' }).ele('value')
  HTML_COMMENT.ele('option', { name: 'FOREGROUND', value: v('comment') })
  HTML_COMMENT.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  const VUE_TAG_NAME = attributesElement.ele('option', { name: 'VUE_TAG_NAME' }).ele('value')
  VUE_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : primary })
  VUE_TAG_NAME.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  const XML_ATTRIBUTE_NAME = attributesElement.ele('option', { name: 'XML_ATTRIBUTE_NAME' }).ele('value')
  XML_ATTRIBUTE_NAME.ele('option', { name: 'FOREGROUND', value: v('property') })
  const XML_ATTRIBUTE_VALUE = attributesElement.ele('option', { name: 'XML_ATTRIBUTE_VALUE' }).ele('value')
  XML_ATTRIBUTE_VALUE.ele('option', { name: 'FOREGROUND', value: v('string') })
  // <option name="XML_TAG">
  //   <value>
  //     <option name="FOREGROUND" value="959da5" />
  //     <option name="BACKGROUND" value="222222" />
  //   </value>
  // </option>
  const XML_TAG = attributesElement.ele('option', { name: 'XML_TAG' }).ele('value')
  XML_TAG.ele('option', { name: 'FOREGROUND', value: options.spectrum ? punctuation : primary })
  XML_TAG.ele('option', { name: 'BACKGROUND', value: background })
  // <option name="XML_TAG_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="4d9375" />
  //   </value>
  // </option>
  const XML_TAG_NAME = attributesElement.ele('option', { name: 'XML_TAG_NAME' }).ele('value')
  XML_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('keyword') : primary })
  const XML_CUSTOM_TAG_NAME = attributesElement.ele('option', { name: 'XML_CUSTOM_TAG_NAME' }).ele('value')
  XML_CUSTOM_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : primary })
  const XML_ENTITY_REFERENCE = attributesElement.ele('option', { name: 'XML_ENTITY_REFERENCE' }).ele('value')
  XML_ENTITY_REFERENCE.ele('option', { name: 'FOREGROUND', value: danger })
  const XML_NS_PREFIX = attributesElement.ele('option', { name: 'XML_NS_PREFIX' }).ele('value')
  XML_NS_PREFIX.ele('option', { name: 'FOREGROUND', value: v('orange') })
  const XML_PROLOGUE = attributesElement.ele('option', { name: 'XML_PROLOGUE' }).ele('value')
  XML_PROLOGUE.ele('option', { name: 'FOREGROUND', value: foreground })
  XML_PROLOGUE.ele('option', { name: 'BACKGROUND', value: background })

  // <option name="JS.GLOBAL_FUNCTION" baseAttributes="DEFAULT_FUNCTION_DECLARATION" />
  // <option name="JS.GLOBAL_VARIABLE" baseAttributes="DEFAULT_GLOBAL_VARIABLE" />
  // <option name="JS.LOCAL_VARIABLE" baseAttributes="DEFAULT_LOCAL_VARIABLE" />
  attributesElement.ele('option', { name: 'JS.GLOBAL_FUNCTION', baseAttributes: 'DEFAULT_FUNCTION_DECLARATION' })
  const JS_GLOBAL_VARIABLE = attributesElement.ele('option', { name: 'JS.GLOBAL_VARIABLE' }).ele('value')
  JS_GLOBAL_VARIABLE.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('namespace') : v('property') })
  const JS_LOCAL_VARIABLE = attributesElement.ele('option', { name: 'JS.LOCAL_VARIABLE' }).ele('value')
  JS_LOCAL_VARIABLE.ele('option', { name: 'FOREGROUND', value: v('variable') })

  //   <option name="JS.MODULE_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.PRIMITIVE.TYPE">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.TYPE_ALIAS">
  //   <value>
  //     <option name="FOREGROUND" value="d7c63e" />
  //   </value>
  // </option>
  // <option name="JS.INSTANCE_MEMBER_FUNCTION" baseAttributes="DEFAULT_INSTANCE_METHOD" />

  const JS_MODULE_NAME = attributesElement.ele('option', { name: 'JS.MODULE_NAME' }).ele('value')
  JS_MODULE_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('namespace') : foreground })
  const JS_PRIMITIVE_TYPE = attributesElement.ele('option', { name: 'JS.PRIMITIVE.TYPE' }).ele('value')
  JS_PRIMITIVE_TYPE.ele('option', { name: 'FOREGROUND', value: v('type') })
  const JS_TYPE_ALIAS = attributesElement.ele('option', { name: 'JS.TYPE_ALIAS' }).ele('value')
  JS_TYPE_ALIAS.ele('option', { name: 'FOREGROUND', value: v('type') })
  const JS_INSTANCE_MEMBER_FUNCTION = attributesElement.ele('option', { name: 'JS.INSTANCE_MEMBER_FUNCTION' }).ele('value')
  JS_INSTANCE_MEMBER_FUNCTION.ele('option', { name: 'FOREGROUND', value: functionCall })

  //   <option name="JS.DOC_TYPE">
  //   <value>
  //     <option name="FOREGROUND" value="cb9557" />
  //   </value>
  // </option>
  const JS_DOC_TYPE = attributesElement.ele('option', { name: 'JS.DOC_TYPE' }).ele('value')
  JS_DOC_TYPE.ele('option', { name: 'FOREGROUND', value: v('type') })

  // CSS.IMPORTANT : 表示 CSS !important 属性
  //   <option name="CSS.IMPORTANT">
  //   <value>
  //     <option name="FOREGROUND" value="CF8E6D" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>

  const CSS_IMPORTANT = attributesElement.ele('option', { name: 'CSS.IMPORTANT' }).ele('value')
  CSS_IMPORTANT.ele('option', { name: 'FOREGROUND', value: danger })

  // Code Lens border color
  // <option name="CODE_LENS_BORDER_COLOR">
  // <value>
  //   <option name="EFFECT_COLOR" value="868a91" />
  // </value>
  // </option
  attributesElement.ele('option', { name: 'CODE_LENS_BORDER_COLOR' }).ele('value').ele('option', { name: 'EFFECT_COLOR', value: border })

  // CSS.URL : Properties that display CSS URLs
  //   <option name="CSS.URL">
  // <value>
  //       <option name="FOREGROUND" value="c26d30" />
  //       <option name="EFFECT_COLOR" value="c26d30" />
  //       <option name="EFFECT_TYPE" value="1" />
  //     </value>
  // </option>
  const CSS_URL = attributesElement.ele('option', { name: 'CSS.URL' }).ele('value')
  CSS_URL.ele('option', { name: 'FOREGROUND', value: v('string') })
  CSS_URL.ele('option', { name: 'EFFECT_COLOR', value: v('number') })
  CSS_URL.ele('option', { name: 'EFFECT_TYPE', value: '1' })

  //   <option name="JS.BRACES">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  // <option name="JS.BRACKETS">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  // <option name="JS.PARENTHS">
  //   <value>
  //     <option name="FOREGROUND" value="d21e1e" />
  //   </value>
  // </option>
  //   <option name="JS.KEYWORD">
  //   <value>
  //     <option name="FOREGROUND" value="cb7676" />
  //   </value>
  // </option>
  // <option name="JS.PARAMETER">
  //     <value>
  //       <option name="EFFECT_COLOR" value="984949" />
  //       <option name="EFFECT_TYPE" value="1" />
  //     </value>
  //   </option>
  const JS_BRACES = attributesElement.ele('option', { name: 'JS.BRACES' }).ele('value')
  JS_BRACES.ele('option', { name: 'FOREGROUND', value: options.spectrum ? punctuation : primary })
  const JS_BRACKETS = attributesElement.ele('option', { name: 'JS.BRACKETS' }).ele('value')
  JS_BRACKETS.ele('option', { name: 'FOREGROUND', value: options.spectrum ? punctuation : primary })
  const JS_PARENTHS = attributesElement.ele('option', { name: 'JS.PARENTHS' }).ele('value')
  JS_PARENTHS.ele('option', { name: 'FOREGROUND', value: options.spectrum ? punctuation : primary })
  const JS_KEYWORD = attributesElement.ele('option', { name: 'JS.KEYWORD' }).ele('value')
  JS_KEYWORD.ele('option', { name: 'FOREGROUND', value: v('keyword') })
  JS_KEYWORD.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const JS_PARAMETER = attributesElement.ele('option', { name: 'JS.PARAMETER' }).ele('value')
  JS_PARAMETER.ele('option', { name: 'FOREGROUND', value: (options.spectrum || isDaylight) ? v('parameter') : pick({ light: foreground, dark: '#f0d5a8' }) })
  JS_PARAMETER.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  /**
   *     <option name="JS.REGEXP">
   *       <value>
   *         <option name="FOREGROUND" value="5050a3" />
   *       </value>
   *     </option>
   *
   */
  const JS_REGEXP = attributesElement.ele('option', { name: 'JS.REGEXP' }).ele('value')
  JS_REGEXP.ele('option', { name: 'FOREGROUND', value: v('regex') })
  const JS_STRING = attributesElement.ele('option', { name: 'JS.STRING' }).ele('value')
  JS_STRING.ele('option', { name: 'FOREGROUND', value: v('string') })
  const JS_NUMBER = attributesElement.ele('option', { name: 'JS.NUMBER' }).ele('value')
  JS_NUMBER.ele('option', { name: 'FOREGROUND', value: v('number') })
  const JS_LINE_COMMENT = attributesElement.ele('option', { name: 'JS.LINE_COMMENT' }).ele('value')
  JS_LINE_COMMENT.ele('option', { name: 'FOREGROUND', value: v('comment') })
  const JS_BLOCK_COMMENT = attributesElement.ele('option', { name: 'JS.BLOCK_COMMENT' }).ele('value')
  JS_BLOCK_COMMENT.ele('option', { name: 'FOREGROUND', value: v('comment') })
  const JS_DECORATOR = attributesElement.ele('option', { name: 'JS.DECORATOR' }).ele('value')
  JS_DECORATOR.ele('option', { name: 'FOREGROUND', value: v('decorator') })
  const JS_FUNCTION_ARROW = attributesElement.ele('option', { name: 'JS.FUNCTION_ARROW' }).ele('value')
  JS_FUNCTION_ARROW.ele('option', { name: 'FOREGROUND', value: v('operator') })
  const VUE_SCRIPT_DELIMITERS = attributesElement.ele('option', { name: 'VUE.SCRIPT_DELIMITERS' }).ele('value')
  VUE_SCRIPT_DELIMITERS.ele('option', { name: 'FOREGROUND', value: v('orange') })

  const JS_ATTRIBUTE = attributesElement.ele('option', { name: 'JS.ATTRIBUTE' }).ele('value')
  JS_ATTRIBUTE.ele('option', { name: 'FOREGROUND', value: v('property') })
  JS_ATTRIBUTE.ele('option', { name: 'BACKGROUND', value: pick({ light: '#fff0f0', dark: '#382832' }) })
  for (const name of ['JS.CLASS', 'JS.EXPORTED.CLASS'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('class') })
  attributesElement.ele('option', { name: 'JS.INTERFACE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('interface') })
  for (const name of ['JS.GLOBAL_FUNCTION', 'JS.EXPORTED.FUNCTION', 'JS.LOCAL_FUNCTION'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: functionDeclaration })
  attributesElement.ele('option', { name: 'JS.STATIC_MEMBER_FUNCTION' }).ele('value').ele('option', { name: 'FOREGROUND', value: functionCall })
  for (const name of ['JS.EXPORTED.VARIABLE', 'JS.INSTANCE_MEMBER_VARIABLE', 'JS.STATIC_MEMBER_VARIABLE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  const JS_DOT = attributesElement.ele('option', { name: 'JS.DOT' }).ele('value')
  JS_DOT.ele('option', { name: 'FOREGROUND', value: punctuation })
  const JS_JSDOC_TAG = attributesElement.ele('option', { name: 'JS.DOC_TAG' }).ele('value')
  JS_JSDOC_TAG.ele('option', { name: 'FOREGROUND', value: danger })
  for (const name of ['JS.DOC_TAG_NAMEPATH', 'JS.DOC_TAG_VALUE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: secondaryForeground })
  const JS_JSX_CLIENT_COMPONENT = attributesElement.ele('option', { name: 'JS.JSX_CLIENT_COMPONENT' }).ele('value')
  JS_JSX_CLIENT_COMPONENT.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : primary })
  const JS_VALID_STRING_ESCAPE = attributesElement.ele('option', { name: 'JS.VALID_STRING_ESCAPE' }).ele('value')
  JS_VALID_STRING_ESCAPE.ele('option', { name: 'FOREGROUND', value: foreground })

  for (const name of ['JS.ASYNC_AWAIT', 'JS.GET_SET']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: v('keyword') })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  }
  for (const name of ['JS.CONSTRUCTOR', 'JS.INLINE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: functionCall })
  attributesElement.ele('option', { name: 'JS.LABEL' }).ele('value').ele('option', { name: 'FOREGROUND', value: primary })
  const JS_DOC_COMMENT = attributesElement.ele('option', { name: 'JS.DOC_COMMENT' }).ele('value')
  JS_DOC_COMMENT.ele('option', { name: 'FOREGROUND', value: v('comment') })
  JS_DOC_COMMENT.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })

  // Keys below are the exact external names used by WebStorm 2026.2's
  // JavaScriptHighlighter. Keep punctuation and operators explicit so Vue
  // embedded expressions do not inherit these colors from Darcula.
  for (const name of ['JS.OPERATION_SIGN', 'JS.TEMPLATE_LITERAL_PLACEHOLDER_DELIMITERS'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('operator') })
  for (const name of ['JS.COMMA', 'JS.SEMICOLON'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: punctuation })
  attributesElement.ele('option', { name: 'JS.INVALID_STRING_ESCAPE' }).ele('value').ele('option', { name: 'FOREGROUND', value: danger })
  attributesElement.ele('option', { name: 'JS.BADCHARACTER' }).ele('value').ele('option', { name: 'FOREGROUND', value: danger })

  // JavaScript JSX tokens used by Vue render functions and TSX.
  for (const name of ['JSX_HTML_TAG', 'JSX_TAG'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : primary })
  attributesElement.ele('option', { name: 'JSX_ATTRIBUTE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  attributesElement.ele('option', { name: 'JSX_TEXT' }).ele('value').ele('option', { name: 'FOREGROUND', value: foreground })

  // Exact external names from WebStorm 2026.2 TypeScriptHighlighter and
  // TypeScriptHighlightDescriptor. VueTSSyntaxHighlighter subclasses this
  // highlighter, so these keys also control <script setup lang="ts"> blocks.
  for (const name of ['TS.KEYWORD', 'TS.TYPE_GUARD']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: v('keyword') })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  }
  attributesElement.ele('option', { name: 'TS.STRING' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })
  attributesElement.ele('option', { name: 'TS.NUMBER' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('number') })
  attributesElement.ele('option', { name: 'TS.REGEXP' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('regex') })
  for (const name of ['TS.CLASS', 'TS.EXPORTED_CLASS', 'TS.ENUM', 'TS.PRIMITIVE.TYPES', 'TS.TYPE.ALIAS', 'TS.TYPE_PARAMETER'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('type') })
  attributesElement.ele('option', { name: 'TS.INTERFACE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('interface') })
  attributesElement.ele('option', { name: 'TS.DECORATOR' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('decorator') })
  for (const name of ['TS.GLOBAL_FUNCTION', 'TS.EXPORTED_FUNCTION', 'TS.INSTANCE_MEMBER_FUNCTION', 'TS.LOCAL_FUNCTION', 'TS.STATIC_MEMBER_FUNCTION']) {
    const color = (isDaylight && ['TS.INSTANCE_MEMBER_FUNCTION', 'TS.STATIC_MEMBER_FUNCTION'].includes(name))
      ? functionCall
      : functionDeclaration
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: color })
  }
  for (const name of ['TS.GLOBAL_VARIABLE', 'TS.EXPORTED_VARIABLE', 'TS.INSTANCE_MEMBER_VARIABLE', 'TS.STATIC_MEMBER_VARIABLE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  attributesElement.ele('option', { name: 'TS.LOCAL_VARIABLE' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('variable') })
  attributesElement.ele('option', { name: 'TS.MODULE_NAME' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('namespace') })
  const TS_PARAMETER = attributesElement.ele('option', { name: 'TS.PARAMETER' }).ele('value')
  TS_PARAMETER.ele('option', { name: 'FOREGROUND', value: (options.spectrum || isDaylight) ? v('parameter') : pick({ light: foreground, dark: '#f0d5a8' }) })
  TS_PARAMETER.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  const TS_ENUM_MEMBER = attributesElement.ele('option', { name: 'TS.ENUM_MEMBER' }).ele('value')
  TS_ENUM_MEMBER.ele('option', { name: 'FOREGROUND', value: v('constant') })
  TS_ENUM_MEMBER.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  for (const name of ['TS.OPERATION_SIGN', 'TS.FUNCTION_ARROW', 'TS.TEMPLATE_LITERAL_PLACEHOLDER_DELIMITERS'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('operator') })
  for (const name of ['TS.BRACES', 'TS.BRACKETS', 'TS.COMMA', 'TS.DOT', 'TS.PARENTHS', 'TS.SEMICOLON'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: punctuation })
  attributesElement.ele('option', { name: 'TS.LABEL' }).ele('value').ele('option', { name: 'FOREGROUND', value: primary })
  attributesElement.ele('option', { name: 'TS.VALID_STRING_ESCAPE' }).ele('value').ele('option', { name: 'FOREGROUND', value: foreground })
  attributesElement.ele('option', { name: 'TS.INVALID_STRING_ESCAPE' }).ele('value').ele('option', { name: 'FOREGROUND', value: danger })
  attributesElement.ele('option', { name: 'TS.BADCHARACTER' }).ele('value').ele('option', { name: 'FOREGROUND', value: danger })
  attributesElement.ele('option', { name: 'TS.DOC_TAG' }).ele('value').ele('option', { name: 'FOREGROUND', value: danger })
  for (const name of ['TS.DOC_TAG_NAMEPATH', 'TS.DOC_TYPE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: secondaryForeground })
  for (const name of ['TS.BLOCK_COMMENT', 'TS.DOC_COMMENT', 'TS.LINE_COMMENT']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: v('comment') })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  }

  // Keep language built-ins visually distinct from rose keywords.
  for (const name of ['DEFAULT_PREDEFINED_SYMBOL', 'GO_BUILTIN', 'JS.BUILTIN', 'JS.CONSOLE', 'PY.BUILTIN_NAME']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: v('builtin') })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  }

  // JSON keys follow the same cyan field/property language as JavaScript and HTML.
  for (const name of ['JSON.KEYWORD', 'JSON.PROPERTY_KEY'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  attributesElement.ele('option', { name: 'JSON.STRING' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })
  attributesElement.ele('option', { name: 'JSON.NUMBER' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('number') })
  for (const name of ['JSON.STRING_KEY'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  for (const name of ['JSON.STRING_VALUE'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('string') })
  for (const name of ['JSON.BOOLEAN', 'JSON.NULL'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('number') })

  //   <option name="CSS.ATTRIBUTE_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  // <option name="CSS.CLASS_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  // <option name="CSS.FUNCTION">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  //   <option name="CSS.PROPERTY_NAME">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //     <option name="FONT_TYPE" value="1" />
  //   </value>
  // </option>
  // <option name="CSS.PSEUDO">
  //   <value>
  //     <option name="FOREGROUND" value="31b7c4" />
  //   </value>
  // </option>
  const CSS_ATTRIBUTE_NAME = attributesElement.ele('option', { name: 'CSS.ATTRIBUTE_NAME' }).ele('value')
  CSS_ATTRIBUTE_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('parameter') : v('property') })
  const CSS_CLASS_NAME = attributesElement.ele('option', { name: 'CSS.CLASS_NAME' }).ele('value')
  CSS_CLASS_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('function') : v('property') })
  const CSS_FUNCTION = attributesElement.ele('option', { name: 'CSS.FUNCTION' }).ele('value')
  CSS_FUNCTION.ele('option', { name: 'FOREGROUND', value: functionCall })
  const CSS_PROPERTY_NAME = attributesElement.ele('option', { name: 'CSS.PROPERTY_NAME' }).ele('value')
  CSS_PROPERTY_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? foreground : v('property') })
  const CSS_PSEUDO = attributesElement.ele('option', { name: 'CSS.PSEUDO' }).ele('value')
  CSS_PSEUDO.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : v('orange') })
  CSS_PSEUDO.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })

  //   <option name="CSS.BRACES">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // <option name="CSS.BRACKETS">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // </option>
  //   <option name="CSS.PARENTHESES">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>
  // </option>
  // <option name="CSS.COLON">
  //   <value>
  //     <option name="FOREGROUND" value="af1d1d" />
  //   </value>

  const CSS_BRACES = attributesElement.ele('option', { name: 'CSS.BRACES' }).ele('value')
  CSS_BRACES.ele('option', { name: 'FOREGROUND', value: punctuation })
  CSS_BRACES.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const CSS_BRACKETS = attributesElement.ele('option', { name: 'CSS.BRACKETS' }).ele('value')
  CSS_BRACKETS.ele('option', { name: 'FOREGROUND', value: punctuation })
  CSS_BRACKETS.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const CSS_PARENTHS = attributesElement.ele('option', { name: 'CSS.PARENTHESES' }).ele('value')
  CSS_PARENTHS.ele('option', { name: 'FOREGROUND', value: punctuation })
  CSS_PARENTHS.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const CSS_COLON = attributesElement.ele('option', { name: 'CSS.COLON' }).ele('value')
  CSS_COLON.ele('option', { name: 'FOREGROUND', value: v('punctuation') })
  CSS_COLON.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })

  const CSS_BAD_CHARACTER = attributesElement.ele('option', { name: 'CSS.BAD_CHARACTER' }).ele('value')
  CSS_BAD_CHARACTER.ele('option', { name: 'EFFECT_COLOR', value: danger })
  CSS_BAD_CHARACTER.ele('option', { name: 'EFFECT_TYPE', value: FONT_TYPE.ITALIC })
  for (const name of ['CSS.COLOR', 'CSS.NUMBER'])
    attributesElement.ele('option', { name }).ele('value').ele('option', { name: 'FOREGROUND', value: v('number') })
  const CSS_COMMENT = attributesElement.ele('option', { name: 'CSS.COMMENT' }).ele('value')
  CSS_COMMENT.ele('option', { name: 'FOREGROUND', value: v('comment') })
  CSS_COMMENT.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.ITALIC })
  for (const name of ['CSS.COMMA', 'CSS.DOT', 'CSS.SEMICOLON']) {
    const value = attributesElement.ele('option', { name }).ele('value')
    value.ele('option', { name: 'FOREGROUND', value: punctuation })
    value.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  }
  attributesElement.ele('option', { name: 'CSS.HASH' }).ele('value').ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('parameter') : v('property') })
  const CSS_IDENT = attributesElement.ele('option', { name: 'CSS.IDENT' }).ele('value')
  CSS_IDENT.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('namespace') : v('orange') })
  const CSS_KEYWORD = attributesElement.ele('option', { name: 'CSS.KEYWORD' }).ele('value')
  CSS_KEYWORD.ele('option', { name: 'FOREGROUND', value: danger })
  const CSS_OPERATORS = attributesElement.ele('option', { name: 'CSS.OPERATORS' }).ele('value')
  CSS_OPERATORS.ele('option', { name: 'FOREGROUND', value: danger })
  CSS_OPERATORS.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  const CSS_PROPERTY_VALUE = attributesElement.ele('option', { name: 'CSS.PROPERTY_VALUE' }).ele('value')
  CSS_PROPERTY_VALUE.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('type') : foreground })
  const CSS_STRING = attributesElement.ele('option', { name: 'CSS.STRING' }).ele('value')
  CSS_STRING.ele('option', { name: 'FOREGROUND', value: v('string') })
  const CSS_TAG_NAME = attributesElement.ele('option', { name: 'CSS.TAG_NAME' }).ele('value')
  CSS_TAG_NAME.ele('option', { name: 'FOREGROUND', value: options.spectrum ? v('keyword') : primary })
  attributesElement.ele('option', { name: 'CSS.SELECTOR' }).ele('value').ele('option', { name: 'FOREGROUND', value: v('property') })
  const CSS_UNICODE_RANGE = attributesElement.ele('option', { name: 'CSS.UNICODE.RANGE' }).ele('value')
  CSS_UNICODE_RANGE.ele('option', { name: 'FOREGROUND', value: v('magenta') })

  //   <option name="KOTLIN_MUTABLE_VARIABLE">
  //   <value>
  //     <option name="EFFECT_COLOR" value="c19f1c" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>
  const KOTLIN_MUTABLE_VARIABLE = attributesElement.ele('option', { name: 'KOTLIN_MUTABLE_VARIABLE' }).ele('value')
  KOTLIN_MUTABLE_VARIABLE.ele('option', { name: 'FOREGROUND', value: v('variable') })

  //   <option name="TODO_DEFAULT_ATTRIBUTES">
  //   <value>
  //     <option name="FOREGROUND" value="dbf00" />
  //     <option name="FONT_TYPE" value="3" />
  //     <option name="ERROR_STRIPE_COLOR" value="dbf00" />
  //   </value>
  // </option>
  const TODO_DEFAULT_ATTRIBUTES = attributesElement.ele('option', { name: 'TODO_DEFAULT_ATTRIBUTES' }).ele('value')
  TODO_DEFAULT_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: v('green') })
  TODO_DEFAULT_ATTRIBUTES.ele('option', { name: 'FONT_TYPE', value: FONT_TYPE.BOLD })
  TODO_DEFAULT_ATTRIBUTES.ele('option', { name: 'ERROR_STRIPE_COLOR', value: v('green') })

  //   <option name="CTRL_CLICKABLE">
  //   <value>
  //     <option name="FOREGROUND" value="842424" />
  //     <option name="EFFECT_COLOR" value="842424" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>
  const CTRL_CLICKABLE = attributesElement.ele('option', { name: 'CTRL_CLICKABLE' }).ele('value')
  CTRL_CLICKABLE.ele('option', { name: 'FOREGROUND', value: v('blue') })
  CTRL_CLICKABLE.ele('option', { name: 'EFFECT_COLOR', value: v('blue') })
  CTRL_CLICKABLE.ele('option', { name: 'EFFECT_TYPE', value: '1' })
  //   <option name="FOLLOWED_HYPERLINK_ATTRIBUTES">
  //   <value>
  //     <option name="FOREGROUND" value="842424" />
  //     <option name="BACKGROUND" value="e9e9e9" />
  //     <option name="EFFECT_COLOR" value="842424" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>
  const FOLLOWED_HYPERLINK_ATTRIBUTES = attributesElement.ele('option', { name: 'FOLLOWED_HYPERLINK_ATTRIBUTES' }).ele('value')
  FOLLOWED_HYPERLINK_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: v('blue') })
  FOLLOWED_HYPERLINK_ATTRIBUTES.ele('option', { name: 'BACKGROUND' })
  FOLLOWED_HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_COLOR', value: v('blue') })
  FOLLOWED_HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_TYPE', value: '1' })
  //   <option name="HYPERLINK_ATTRIBUTES">
  //   <value>
  //     <option name="FOREGROUND" value="842424" />
  //     <option name="EFFECT_COLOR" value="842424" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>

  const HYPERLINK_ATTRIBUTES = attributesElement.ele('option', { name: 'HYPERLINK_ATTRIBUTES' }).ele('value')
  HYPERLINK_ATTRIBUTES.ele('option', { name: 'FOREGROUND', value: v('blue') })
  HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_COLOR', value: v('blue') })
  HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_TYPE', value: '1' })

  //   <option name="INACTIVE_HYPERLINK_ATTRIBUTES">
  //   <value>
  //     <option name="EFFECT_COLOR" value="842424" />
  //     <option name="EFFECT_TYPE" value="1" />
  //   </value>
  // </option>
  const INACTIVE_HYPERLINK_ATTRIBUTES = attributesElement.ele('option', { name: 'INACTIVE_HYPERLINK_ATTRIBUTES' }).ele('value')
  INACTIVE_HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_COLOR', value: v('comment') })
  INACTIVE_HYPERLINK_ATTRIBUTES.ele('option', { name: 'EFFECT_TYPE', value: '1' })

  // inline parameter hint
  const INLINE_PARAMETER_HINT = attributesElement.ele('option', { name: 'INLINE_PARAMETER_HINT' }).ele('value')
  INLINE_PARAMETER_HINT.ele('option', { name: 'FOREGROUND', value: punctuation })
  INLINE_PARAMETER_HINT.ele('option', { name: 'BACKGROUND', value: activeBackground })

  const INLINE_PARAMETER_HINT_CURRENT = attributesElement.ele('option', { name: 'INLINE_PARAMETER_HINT_CURRENT' }).ele('value')
  INLINE_PARAMETER_HINT_CURRENT.ele('option', { name: 'FOREGROUND', value: punctuation })
  INLINE_PARAMETER_HINT_CURRENT.ele('option', { name: 'BACKGROUND', value: activeBackground })

  const INLINE_PARAMETER_HINT_HIGHLIGHTED = attributesElement.ele('option', { name: 'INLINE_PARAMETER_HINT_HIGHLIGHTED' }).ele('value')
  INLINE_PARAMETER_HINT_HIGHLIGHTED.ele('option', { name: 'FOREGROUND', value: punctuation })
  INLINE_PARAMETER_HINT_HIGHLIGHTED.ele('option', { name: 'BACKGROUND', value: activeBackground })

  // <option name="INLINE_REFACTORING_SETTINGS_DEFAULT" value="ad1010" />
  // <option name="INLINE_REFACTORING_SETTINGS_FOCUSED" value="ad1010" />
  // <option name="INLINE_REFACTORING_SETTINGS_HOVERED" value="ad1010" />
  attributesElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_DEFAULT', value: activeBackground })
  attributesElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_FOCUSED', value: activeBackground })
  attributesElement.ele('option', { name: 'INLINE_REFACTORING_SETTINGS_HOVERED', value: activeBackground })

  return {
    editorTheme: theme.end({ pretty: true }),
    UITheme: {
      name: options.name,
      dark: options.color === 'dark',
      editorScheme: options.editorScheme,
      parentTheme: options.color === 'dark' ? 'Islands Dark' : 'Islands Light',
      author: pkg.author,
      ui: {
        '*': {
          foreground,
          background,
          borderColor: border,
          disabledText: v('comment'),
          disabledForeground: v('comment'),
          disabledBackground: background,
          inactiveForeground: foreground,

          lightSelectionBackground: selectionBackground,
          hoverBackground: selectionBackground,

          selectionForeground: foreground,
          selectionBackground: selectionBackgroundActive,
          selectionInactiveForeground: foreground,
          selectionInactiveBackground: selectionBackgroundInActive,

          focusColor: v('secondary', '80'),

          infoForeground: v('comment'),

          primaryText: primary,
        },
        'Islands': 1,
        'Island': {
          'arc': 20,
          'arc.compact': 16,
          'borderArcLength': 14,
          'borderArcLength.compact': 10,
          'borderWidth': 6,
          'borderWidth.compact': 4,
          'borderColor': background,
          'inactiveAlpha': 1,
          'toolWindowAlpha': 1,
        },
        'MainWindow': {
          background: mainWindowBackground,
        },
        'MainToolbar': {
          background: mainWindowBackground,
          inactiveBackground: mainWindowBackground,
          borderColor: transparentBackground,
        },
        'StatusBar': {
          background: mainWindowBackground,
          borderColor: transparentBackground,
          topBorderWidth: 0,
        },
        'Component': {
          borderColor: pick({ light: colors.gray[3], dark: colors.gray[1] }),
          focusColor: secondary,
          errorFocusColor: danger,
          warningFocusColor: warning,
        },
        'Button': {
          foreground,
          startBackground: activeBackground,
          endBackground: activeBackground,
          startBorderColor: activeBackground,
          endBorderColor: activeBackground,
          focusedBorderColor: border,
          default: {
            foreground: background,
            startBackground: primary,
            endBackground: primary,
            startBorderColor: primary,
            endBorderColor: primary,
            focusedBorderColor: border,
          },
        },
        'Link': {
          activeForeground: info,
          hoverForeground: secondary,
          pressedForeground: info,
          visitedForeground: tertiary,
          secondaryForeground,
        },
        'Notification': {
          linkForeground: info,
        },
        'Banner': {
          errorBackground: errorSurface,
          errorBorderColor: danger,
          errorForeground: foreground,
          informativeBackground: infoSurface,
          informativeBorderColor: info,
          informativeForeground: foreground,
          warningBackground: warningSurface,
          warningBorderColor: warning,
          warningForeground: foreground,
        },
        'ActionButton': {
          hoverBackground: selectionBackground,
          pressedBackground: selectionBackgroundActive,
        },
        'GotItTooltip': {
          linkForeground: primary,
          Button: {
            foreground,
            startBackground: background,
            endBackground: background,
            startBorderColor: border,
            endBorderColor: border,
          },
        },
        'ToolTip': {
          background: elevatedBackground,
          borderColor: border,
          foreground,
          infoForeground: foreground,
          shortcutForeground: foreground,
        },
        'Tooltip.Learning': {
          background: elevatedBackground,
          borderColor: border,
          spanBackground: background,
          spanForeground: foreground,
          foreground,
          stepNumberForeground: foreground,
        },
        'ToolWindow': {
          background,
          borderColor: transparentBackground,
          Header: {
            background: activeBackground,
            inactiveBackground: background,
          },
          Button: {
            selectedForeground: foreground,
            selectedBackground: selectionBackgroundActive,
          },
          Stripe: {
            background: mainWindowBackground,
            borderColor: transparentBackground,
          },
        },
        'EditorTabs': {
          background,
          hoverBackground: selectionBackground,
          hoverInactiveBackground: selectionBackgroundInActive,
          underTabsBorderColor: transparentBackground,
          underlinedBorderColor: primary,
          underlinedTabBackground: selectionBackgroundActive,
          inactiveUnderlinedTabBorderColor: v('primary', '80'),
          inactiveUnderlinedTabBackground: selectionBackgroundInActive,
        },
        'CompletionPopup': {
          background: elevatedBackground,
          foreground,
          matchForeground: foreground,
          selectionBackground: selectionBackgroundActive,
          Advertiser: {
            foreground,
            background: elevatedBackground,
          },
        },
        'ParameterInfo': {
          background: elevatedBackground,
          foreground,
          currentOverloadBackground: selectionBackground,
          currentParameterForeground: foreground,
        },
        // 'SearchOption': {
        //   selectedBackground: selectionBackground,
        //   selectedHoveredBackground: selectionBackgroundActive,
        //   selectedPressedBackground: selectionBackgroundInActive,
        // },
        'SpeedSearch': {
          background: elevatedBackground,
          foreground,
          borderColor: border,
        },
        'SearchMatch': {
          startBackground: pick({ light: '#e6cc7766', dark: '#e6cc7744' }),
          endBackground: pick({ light: '#e6cc7766', dark: '#e6cc7744' }),
        },
        'SearchEverywhere': {
          Tab: {
            selectedBackground: selectionBackgroundActive,
            selectedForeground: foreground,
          },
        },
        'ProgressBar': {
          progressColor: primary,
          indeterminateStartColor: primary,
          indeterminateEndColor: secondary,
          passedColor: success,
          passedEndColor: primary,
          failedColor: danger,
          failedEndColor: v('orange'),
          trackColor: selectionBackground,
        },
        'RunWidget': {
          activeBackground: successSurface,
          activeForeground: success,
          hoverBackground: selectionBackground,
          pressedBackground: selectionBackgroundActive,
        },
        'Panel': {
          foreground,
          background,
        },
        'Tree': {
          background,
          foreground,
          hoverBackground: selectionBackground,
          hoverInactiveBackground: selectionBackgroundInActive,
          selectionBackground: selectionBackgroundActive,
          selectionForeground: foreground,
          errorForeground: danger,
        },
        'List': {
          background,
          foreground,
          selectionBackground: selectionBackgroundActive,
          selectionForeground: foreground,
          selectionInactiveBackground: selectionBackgroundInActive,
          selectionInactiveForeground: foreground,
        },
        // 'MainMenu': {
        //   selectionForeground: foreground,
        //   selectionBackground: activeBackground,
        // },
        'Menu': {
          background: elevatedBackground,
          separatorColor: border,
        },
        'MenuItem': {
          background: elevatedBackground,
          foreground,
          selectionBackground: selectionBackgroundActive,
          selectionForeground: foreground,
        },
        'PopupMenu': {
          background: elevatedBackground,
        },
        'Popup': {
          background: elevatedBackground,
          borderColor: border,
          Header: {
            activeBackground: elevatedBackground,
          },
        },
        'CheckBox': {
          background,
        },
        'CheckBoxMenuItem': {
          background: elevatedBackground,
          foreground,
          selectionBackground: selectionBackgroundActive,
          selectionForeground: foreground,
        },
        'Editor': {
          background,
          foreground,
          shortcutForeground: primary,
        },
        'ColorChooser': {
          foreground,
          background: elevatedBackground,
        },
        'ComboBox': {
          foreground,
          background: activeBackground,
          selectionForeground: foreground,
          selectionBackground: selectionBackgroundActive,
          nonEditableBackground: background,
          modifiedItemForeground: primary,
          ArrowButton: {
            background,
            iconColor: foreground,
            nonEditableBackground: background,
          },
        },
        'FileColor': {
          Yellow: warningSurface,
          Green: successSurface,
          Blue: infoSurface,
          Violet: violetSurface,
          Orange: v('orange', '24'),
          Rose: v('magenta', '24'),
          Gray: pick({ light: '#6a737d1a', dark: '#dedcd51a' }),
        },
        'Bookmark': {
          mnemonicForeground: tertiary,
          mnemonicBackground: violetSurface,
        },
        'icons': {
          ColorPalette: {
            'Actions.Grey': pick({ light: colors.gray[3], dark: colors.gray[1] }),
            'Actions.Red': v('red'),
            'Actions.Yellow': v('yellow'),
            'Actions.Green': v('green'),
            'Actions.Blue': v('blue'),
            'Actions.Purple': v('violet'),

            // 'Objects.Grey': '#9790ad',
            // 'Objects.RedStatus': '#dd3962',
            'Objects.Red': v('red'),
            'Objects.Pink': v('magenta'),
            'Objects.Yellow': v('yellow'),
            'Objects.Green': v('green'),
            'Objects.Blue': v('blue'),
            'Objects.Purple': v('violet'),
            'Objects.BlackText': foreground,
            'Objects.YellowDark': v('orange'),
            'Objects.GreenAndroid': success,

            [`Checkbox.Background.Default${options.color === 'dark' ? '.Dark' : ''}`]: background,
            [`Checkbox.Border.Default${options.color === 'dark' ? '.Dark' : ''}`]: pick({ light: colors.gray[3], dark: colors.gray[1] }),
            [`Checkbox.Foreground.Selected${options.color === 'dark' ? '.Dark' : ''}`]: foreground,
            [`Checkbox.Focus.Wide${options.color === 'dark' ? '.Dark' : ''}`]: v('secondary', '80'),
            [`Checkbox.Focus.Thin.Default${options.color === 'dark' ? '.Dark' : ''}`]: secondary,
            [`Checkbox.Focus.Thin.Selected${options.color === 'dark' ? '.Dark' : ''}`]: secondary,
            [`Checkbox.Background.Disabled${options.color === 'dark' ? '.Dark' : ''}`]: v('comment'),
            [`Checkbox.Border.Disabled${options.color === 'dark' ? '.Dark' : ''}`]: pick({ light: colors.gray[3], dark: colors.gray[1] }),
            [`Checkbox.Foreground.Disabled${options.color === 'dark' ? '.Dark' : ''}`]: foreground,
            // "Checkbox.Border.Default": "Grey8",
            // "Checkbox.Background.Selected": "Blue4",
            // "Checkbox.Border.Selected": "Blue4",
            // "Checkbox.Focus.Thin.Default": "Grey14",
            // "Checkbox.Focus.Thin.Selected": "Grey14",
            // "Checkbox.Focus.Wide": "Blue4",
            // "Checkbox.Foreground.Disabled": "Grey8",
            // "Checkbox.Border.Disabled": "Grey11",
            // "Checkbox.Background.Disabled": "Grey13"
          },
        },

      },
    },
  }
}
