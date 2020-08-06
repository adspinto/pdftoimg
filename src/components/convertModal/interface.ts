import {ViewStyle, TextStyle} from 'react-native';

export interface IStyles {
  container: ViewStyle;
  subContainer: ViewStyle;
  buttonContainer: ViewStyle;
  buttonTextTitle: TextStyle;
  button: ViewStyle;
}

export interface ConvertModalProps {
  convertStatus: string;
  convertMessage: string;
  onRequestClose: () => void;
  adScreen: string;
}
