import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NewspaperIcon from '@mui/icons-material/Newspaper';
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
import { DiscussionPage, HomePage, NotFoundPage } from '~/views';

export const App: React.FC = observer(function App() {
  const appBarRef = useRef<HTMLDivElement>();
  const {
    theme: { palette, spacing },
  } = ui;

  const handleThemeClick = () => {
    ui.changeColorMode(palette.mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider theme={ui.theme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppBar position='static'>
          <Container maxWidth='md'>
            <Toolbar sx={{ gap: spacing(1) }} disableGutters>
              <NewspaperIcon
                aria-hidden='true'
                sx={{ marginInlineEnd: spacing(1.5) }}
              />
              <Typography
                component='h1'
                sx={{ fontWeight: 500, flexGrow: 1 }}
                variant='h5'>
                Hacker News
              </Typography>
              <Box ref={appBarRef} />
              <IconButton
                aria-label='switch theme'
                color='inherit'
                edge='end'
                size='large'
                onClick={handleThemeClick}>
                {palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Container component='main' maxWidth='md'>
          <Switch>
            <Route path='/item'>
              <DiscussionPage />
            </Route>
            <Route path='/' exact>
              <HomePage />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
});
