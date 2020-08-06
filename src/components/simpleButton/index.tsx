import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {SimpleButtonProps} from './interface';
import styles from './styles';
import {colors} from '../../utils';

const SimpleButton = (props: SimpleButtonProps) => {
  const {
    disabled,
    onPress,
    containerStyle,
    loading,
    contentStyle,
    title,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={colors.activeOpacity}
      onPress={onPress}
      disabled={disabled}>
      <View style={[styles.buttonContainer, containerStyle]}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={[styles.text, contentStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SimpleButton;
