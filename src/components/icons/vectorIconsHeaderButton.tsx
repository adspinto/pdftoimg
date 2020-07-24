import React from 'react';

import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VectorIconsHeaderButtonProps} from './interfaces';
const VectorIconsHeaderButton = (props: any) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Icon} iconSize={23} />
);

export default VectorIconsHeaderButton;
