import {ViewStyle, StyleProp, TextStyle} from 'react-native';

export interface IStyles {
  buttonContainer: ViewStyle;
  text: TextStyle;
}

export interface SimpleButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
}
