import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { store } from '~/store';
import { DiscussionPage } from '~/views/DiscussionPage';
import { HomePage } from '~/views/HomePage';

export const App: React.FC = observer(function App() {
  const handleThemeClick = () => {
    store.changeColorMode(
      store.theme.palette.mode === 'dark' ? 'light' : 'dark',
    );
  };

  return (
    <ThemeProvider theme={store.theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position='sticky'>
          <Container maxWidth='md'>
            <Toolbar>
              <Typography
                component='h1'
                sx={{ fontWeight: 500, flexGrow: 1 }}
                variant='h5'>
                Hacker News
              </Typography>
              <IconButton
                aria-label='switch theme'
                edge='end'
                size='large'
                onClick={handleThemeClick}>
                {store.theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Container maxWidth='md' sx={{ minHeight: '200vh' }}>
            <Switch>
              <Route path='/item'>
                <DiscussionPage />
              </Route>
              <Route path='/'>
                <HomePage />
              </Route>
            </Switch>
          </Container>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
});
