import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdoptPetNavigationProps, AppParamsList } from './types';
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import { setAppLanguage } from '../locale';
import { useAppStore } from '../hooks';
import { Keyboard } from 'react-native';
import AdoptScreen from '../screens/Adopt';

const AppNavigationStack: FC = () => {
  const { theme, language } = useAppStore();
  const [lang, setLang] = useState<undefined | string>(undefined);
  const routeNameRef = useRef<string | null | undefined>(null);
  const { Navigator, Screen } = createNativeStackNavigator<AppParamsList>();

  const setAppReady = useCallback(async () => {
    const locale = await setAppLanguage(language);
    setLang(locale);
  }, []);

  const onStateChange = useCallback(
    async (state: NavigationState | undefined) => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = state?.routeNames[state.index];
      Keyboard.dismiss();

      if (previousRouteName !== currentRouteName) {
        routeNameRef.current = currentRouteName;
        console.log(
          `Screen tracking: navigated to: "${currentRouteName}" from: "${previousRouteName}"`,
        );
      }
    },
    [],
  );

  const linking = {
    prefixes: [''],
    config: {
      screens: {},
    },
  };

  useEffect(() => {
    setAppReady();
  }, []);

  if (lang === undefined) {
    return null;
  }

  return (
    <NavigationContainer linking={linking} onStateChange={onStateChange}>
      <Navigator
        initialRouteName={'HOME'}
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Screen name={'HOME'} key={'HOME'} component={HomeScreen} />
        <Screen
          name={'PET_DETAIL'}
          key={'PET_DETAIL'}
          component={DetailScreen}
        />
        <Screen
          name={'ADOPT'}
          key={'ADOPT'}
          options={{
            presentation: 'modal',
          }}
          component={AdoptPetStack}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const AdoptPetStack: FC = () => {
  const { theme } = useAppStore();
  const { Navigator, Screen } =
    createNativeStackNavigator<AdoptPetNavigationProps>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Screen name={'DETAIL'} key={'DETAIL'} component={AdoptScreen} />
    </Navigator>
  );
};

export default AppNavigationStack;
