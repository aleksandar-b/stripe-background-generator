import React from 'react';
import { Provider } from 'mobx-react';
import Store from '../store/Store';
import RandomColorsStore from '../store/RandomColorsStore';
import NavBar from './nav/NavBar';
import Hero from './Hero';
import FabButton from './FabButton';

const App = () => {
  return (
    <Provider store={Store} randomColorStore={RandomColorsStore}>
      <>
        <NavBar />
        <Hero />
        <FabButton />
      </>
    </Provider>
  );
};

export default App;
