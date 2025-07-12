import useAppStore from '../useAppStore';

type AppState = {
  resetAppState: () => void;
};

const useAppState = (): AppState => {
  const {} = useAppStore();

  const resetAppState = () => {};

  return {
    resetAppState,
  };
};

export default useAppState;
