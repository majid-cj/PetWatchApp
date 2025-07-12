import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pets } from '../core/models/pets';

export type ScreenProps = {
  navigation: NavigationProp<AppParamsList>;
  route: RouteProp<ParamListBase, string>;
};

export type AppParamsList = {
  SPLASH: undefined;
  HOME: undefined;
  PET_DETAIL: { pets: Pets };
  ADOPT: {
    screen: 'DETAIL';
    params: { pets: Pets };
  };
};

export type AdoptPetParamsList = {
  DETAIL: { pets: Pets };
};

export type AppNavigationProps = NativeStackNavigationProp<AppParamsList>;

export type AdoptPetNavigationProps =
  NativeStackNavigationProp<AdoptPetParamsList>;
