import React, { FC, ReactElement } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { toolBarStyles } from './styles';
import { useAppStore } from '../../../hooks';
import { BackButton } from '../buttons';
import { SubTitle } from '../texts';

interface ToolBarProps {
  back?: boolean;
  menuButton?: ReactElement;
  leftButton?: ReactElement;
  center?: ReactElement | string;
}

export const ToolBar: FC<ToolBarProps> = ({
  back,
  center,
  menuButton,
  leftButton,
}) => {
  const { theme } = useAppStore();
  const styles = toolBarStyles(theme);
  const { goBack } = useNavigation();

  const saveArea = <View style={styles.area} />;

  return (
    <View style={styles.container}>
      {back ? <BackButton backAction={goBack} /> : leftButton || saveArea}
      {typeof center === 'string' ? <SubTitle text={center} /> : center}
      {menuButton || saveArea}
    </View>
  );
};
