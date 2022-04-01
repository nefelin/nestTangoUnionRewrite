import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import * as React from 'react';
import { Navigate, Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';

import Sandbox from './components/Sandbox/Sandbox';
import MobileDashContainer from './features/MobileDash/MobileDashContainer';
import MusicDash from './features/MusicDash';
import StandalonePlaylist from './features/StandalonePlaylist';
const isProd = process.env['REACT_APP_ENV'] === 'prod';
const host = isProd ? 'https://api.tangounion.net' : 'http://localhost';
const port = isProd ? 443 : 4000;

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: `${host}:${port}/graphql` }),
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename="/">
      <React.Suspense fallback={Loading}>
        <Routes>
          <Route path="/" element={<Navigate to="/player" />} />
          <Route path="/mobile" element={<MobileDashContainer />} />
          <Route path="/mobile/:saved" element={<MobileDashContainer />} />
          <Route path="/player" element={<MusicDash />} />
          <Route path="/player/:saved" element={<MusicDash />} />
          {/* <Route path="/dndtester" element={<DnDTester/>} /> */}
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/playlist/:saved" element={<StandalonePlaylist />} />
          <Route path="/notFound" element={() => <div>Not Found</div>} />
          {/* <Route path="*" element={() => <Navigate to="/notFound" />} /> */}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </ApolloProvider>
);

const Loading = () => <div>Loading</div>;

export default App;
