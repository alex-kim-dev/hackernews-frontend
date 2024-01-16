import { createTheme, type Theme } from '@mui/material/styles';
import { makeAutoObservable } from 'mobx';

class UIStore {
  theme: Theme;

  constructor() {
    makeAutoObservable(this);

    const savedColorMode = window?.localStorage.getItem('colorMode') as
      | typeof this.theme.palette.mode
      | null;

    const colorModePreference = window?.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
      ? 'dark'
      : 'light';

    this.theme = createTheme({
      palette: { mode: savedColorMode ?? colorModePreference },
    });

    if (!savedColorMode) this.saveColorMode();
  }

  saveColorMode() {
    window?.localStorage.setItem('colorMode', this.theme.palette.mode);
  }

  changeColorMode(mode: typeof this.theme.palette.mode) {
    this.theme = createTheme({ palette: { mode } });
    this.saveColorMode();
  }
}

export const ui = new UIStore();
