import {StackNavigationProp} from '@react-navigation/stack';
import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

export interface ImageToPdfProps {
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
export interface ImageToPdfViewProps {
  status: string;
  converter: () => void;
  convertMessage: string;
  progress: number;
  imageList: IItem[];
  onPressUp: (index: number) => void;
  onPressDown: (index: number) => void;
  onPressRemove: (index: number) => void;
  onError: (error: any) => void;
  setImageList: ({data}: {data: any}) => void;
  escolher: () => void;
  onRequestClose: () => void;
}
export interface IItem {
  filename: string;
  height: number;
  index: number;
  lastModified: number;
  path: string;
  realPath: string;
  size: number;
  type: string;
  width: number;
}
