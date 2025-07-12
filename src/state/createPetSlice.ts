import { StateCreator } from 'zustand';

import { axiosInstance } from '../core/network';
import { URLS } from '../core/constants';
import { PetsList } from '../core/models/pets';

type PetResponse = {
  loading: boolean;
  response: PetsList;
  error: Error | undefined;
};

type PetAPIResponse = {
  data: PetsList;
};

export type PetsSlice = {
  pets: PetResponse;
  getPets: () => Promise<void>;
  getAppPets: () => PetResponse;
  clearPets: () => void;
};

export const createPetSlice: StateCreator<PetsSlice> = (set, get) => ({
  pets: {
    loading: false,
    response: [],
    error: undefined,
  },
  getPets: async () => {
    try {
      if (get().pets.response.length > 0) {
        set({
          pets: {
            loading: false,
            error: undefined,
            response: get().pets.response,
          },
        });
        return;
      }
      set({ pets: { loading: true, error: undefined, response: [] } });
      const response: PetAPIResponse = await axiosInstance.get(URLS.PETS);
      set({
        pets: {
          loading: false,
          error: undefined,
          response: response.data.filter(({ breeds }) => breeds.length > 0),
        },
      });
    } catch (error: any) {
      set({ pets: { loading: false, error: error, response: [] } });
    }
  },
  getAppPets: () => {
    return get().pets;
  },
  clearPets: () => {
    set(() => ({
      pets: {
        loading: false,
        response: [],
        error: undefined,
      },
    }));
  },
});
