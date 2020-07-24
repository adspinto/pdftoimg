import {StackNavigationProp} from '@react-navigation/stack';
import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

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
}
