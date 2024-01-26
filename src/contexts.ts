import { createContext } from 'react';

export const appBarContext = createContext<
  React.MutableRefObject<HTMLDivElement | undefined> | undefined
>(undefined);
