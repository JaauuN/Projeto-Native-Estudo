import {StyleSheet ,TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, ...otherProps }: ThemedTextInputProps) {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const backgroundInput = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundInput');
  

  return <TextInput style={[styles.input,{borderColor, backgroundColor:backgroundInput}, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
 input: {
  bottom:10,
  borderRadius:15,
  borderWidth: 2
 }
})

