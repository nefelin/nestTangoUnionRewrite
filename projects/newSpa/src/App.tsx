import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import * as React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import LandingPage from './features/LandingPage';
import MusicDash from './features/MusicDash';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  connectToDevTools: process.env['REACT_APP_ENV'] !== 'prod',
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <React.Suspense fallback={Loading}>
        <Switch>
          <Route exact path="/" component={MusicDash} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

const Loading = () => <div>Loading</div>;

export default App;
