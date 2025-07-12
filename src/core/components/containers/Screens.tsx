import React, { FC, ReactElement } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { AppTheme } from '@react-navigation/native';

import { Spinner } from '../ui';
import { useAppStore } from '../../../hooks';

type ScreenProps = {
  footer?: ReactElement;
  header?: ReactElement;
  scroll?: boolean;
  loading?: boolean;
  useInsets?: boolean;
  onRefresh?: () => void;
  children: undefined | ReactElement | ReactElement[];
};

const Screen: FC<ScreenProps> = ({
  header,
  footer,
  loading,
  scroll,
  useInsets,
  onRefresh,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useAppStore();
  const styles = screenStyles(theme, useInsets ? insets.top : 0);
  const Container = scroll ? ScrollView : View;

  const viewProps = scroll
    ? {
        showsVerticalScrollIndicator: false,
        style: [styles.containerScrollable],
        contentContainerStyle: styles.contentContainerStyle,
      }
    : {
        style: [styles.container],
      };

  const refreshControl = onRefresh
    ? {
        refreshControl: (
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        ),
      }
    : {};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'default'} />
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={'padding'}>
        {header && <View style={styles.headerContainer}>{header}</View>}
        <Container {...viewProps} {...refreshControl}>
          {children}
        </Container>
        {footer && <View style={styles.footerContainer}>{footer}</View>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('screen');

export const screenStyles = ({ colors, space }: AppTheme, insets: number) =>
  StyleSheet.create({
    loadingContainer: {
      width,
      height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    keyboardAvoid: {
      width,
      height,
      backgroundColor: colors.background,
    },
    safeArea: {
      width,
      height,
      paddingTop: insets,
      backgroundColor: colors.background,
    },
    container: {
      backgroundColor: colors.background,
      flexGrow: 1,
      alignItems: 'center',
    },
    containerScrollable: {
      backgroundColor: colors.background,
      flexGrow: 1,
    },
    contentContainerStyle: {
      alignItems: 'center',
    },
    headerContainer: {
      flexGrow: 0,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    footerContainer: {
      flexGrow: 0,
      alignItems: 'center',
      backgroundColor: colors.background,
      marginBottom: space.large * 2,
    },
  });

export default Screen;
