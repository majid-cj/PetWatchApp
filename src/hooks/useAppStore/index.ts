import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  createPetSlice,
  createThemeSlice,
  createUtilitySlice,
  PetsSlice,
  ThemeSlice,
  UtilitySlice,
  zustandStorage,
} from '../../state';

const useAppStore = create<ThemeSlice & UtilitySlice & PetsSlice>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createUtilitySlice(...args),
      ...createPetSlice(...args),
    }),
    {
      name: 'pet-watch-app',
      storage: createJSONStorage(() => zustandStorage),
      version: 1.0,
    },
  ),
);

export default useAppStore;
