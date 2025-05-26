import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextProps,
} from 'react-native';

interface TextoAppProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function TextoApp({ children, style, ...props }: TextoAppProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto', 
    fontSize: 16,
    color: '#000',
  },
});
