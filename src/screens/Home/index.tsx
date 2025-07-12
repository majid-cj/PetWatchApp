import React, { FC, useEffect } from 'react';

import { ScreenProps } from '../../navigation/types';
import { useAppStore } from '../../hooks';
import { Screen } from '../../core/components';
import { PetPreview } from '../../core/components/cards';

const HomeScreen: FC<ScreenProps> = () => {
  const {
    getPets,
    pets: { response, loading },
  } = useAppStore();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Screen scroll loading={loading} useInsets>
      {response.map((item, index) => {
        return <PetPreview key={index} pet={item} />;
      })}
    </Screen>
  );
};

export default HomeScreen;
