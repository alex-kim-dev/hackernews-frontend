import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { DiscussionPage } from './views/DiscussionPage';
import { HomePage } from './views/HomePage';

export const App = () => {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <Link to='/item?id=38988944'>Discussion</Link>
      <Switch>
        <Route path='/item'>
          <DiscussionPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
