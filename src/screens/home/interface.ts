import {StackNavigationProp} from '@react-navigation/stack';
import {ViewStyle, TextStyle, ImageStyle, View} from 'react-native';

export interface HomeScreenProps {
  navigation: StackNavigationProp<any, 'Home'>;
}

export interface IStyles {
  adContainer: ViewStyle;
  root: ViewStyle;
  adBar: ViewStyle;
  converting: TextStyle;
  iconContainer: ViewStyle;
  buttonContainer: ViewStyle;
  bottomAdContainer: ViewStyle;
  container: ViewStyle;
  simpleButtonContainer: ViewStyle;
  iconAndButtonContainer: ViewStyle;
  rootContainer: ViewStyle;
}
export interface HomeViewProps {
  onPressSubmit: (route: string) => void;
}
