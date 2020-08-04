import React, { Lazy, suspense } from 'react';
import Homepage from './containers/homepage/Homepage';

// styles
import './App.css';
import './scss/App.scss';

// redux
import { store, 
  // persistor 
} from './store';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Homepage />
      </div>
    </Provider>
  );
}

export default App;
