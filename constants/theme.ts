/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

//  Icone selecionado
const tintColorLight = '#F0F3F5';
const tintColorDark = '#F0F3F5';

export const Colors = {
  light: {
    text: '#000000ff',
    background: '#dadadaff',
    backgroundInput: '#F0F3F5',
    border:'#3F72AF',
    tint: tintColorLight,
    tabBackground: '#19535F',
    icon: '#969696ff',
    tabIconDefault: '#969696ff',
    tabIconSelected: tintColorLight,
    dotBack: '#E6E6E6',
    dotActive: '#969696ff',
  },
  dark: {
    text: '#F0F3F5',
    background: '#091e22ff',
    backgroundInput: '#F0F3F5',
    border:'#19535F',
    tint: tintColorDark,
    tabBackground: '#19535F',
    icon: '##969696ff',
    tabIconDefault: '#969696ff',
    tabIconSelected: tintColorDark,
    dotBack: '#E6E6E6',
    dotActive: '#969696ff',
  },
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
