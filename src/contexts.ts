import { createContext } from 'react';

export const appBarContext = createContext<HTMLDivElement | undefined>(
  undefined,
);
