import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ui } from '~/stores';
import { DiscussionPage } from '~/views/DiscussionPage';
import { HomePage } from '~/views/HomePage';

export const App: React.FC = observer(function App() {
  const appBarRef = useRef<HTMLDivElement>();

  const handleThemeClick = () => {
    ui.changeColorMode(ui.theme.palette.mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider theme={ui.theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position='sticky'>
          <Container maxWidth='md'>
            <Toolbar disableGutters>
              <Typography
                component='h1'
                sx={{ fontWeight: 500, flexGrow: 1 }}
                variant='h5'>
                Hacker News
              </Typography>
              <Box ref={appBarRef} />
              <IconButton
                aria-label='switch theme'
                edge='end'
                size='large'
                sx={{ color: ui.theme.palette.common.white }}
                onClick={handleThemeClick}>
                {ui.theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Container maxWidth='md' sx={{ marginBlock: ui.theme.spacing(2) }}>
            <Switch>
              <Route path='/item'>
                <DiscussionPage />
              </Route>
              <Route path='/'>
                <HomePage appBarRef={appBarRef} />
              </Route>
            </Switch>
          </Container>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
});
