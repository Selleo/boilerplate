import { useUniwind } from 'uniwind';

export function useColorScheme() {
  const { theme } = useUniwind()
  return theme;
}


