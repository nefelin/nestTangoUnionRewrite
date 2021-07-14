import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import MusicDash from './features/MusicDash';
// import Playground from './features/Playground';
const isProd = process.env['REACT_APP_ENV'] === 'prod';
const host = isProd ? 'https://api.tangounion.net' : 'http://localhost';
const port = isProd ? 443 : 4000;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: `${host}:${port}/graphql` }),
  connectToDevTools: true,
  // connectToDevTools: process.env['REACT_APP_ENV'] !== 'prod',
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename="/">
      <React.Suspense fallback={Loading}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/player" />} />
          <Route exact path="/player" component={MusicDash} />
          <Route exact path="/player/:saved" component={MusicDash} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

const Loading = () => <div>Loading</div>;

export default App;
