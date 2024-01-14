import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { DiscussionPage } from './views/DiscussionPage';
import { HomePage } from './views/HomePage';

export const App = () => {
  const theme = useTheme();

  return (
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
            <IconButton aria-label='switch theme' edge='end' size='large'>
              {theme.palette.mode === 'dark' ? (
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
  );
};
