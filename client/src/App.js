import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
// actions
import { loadUser } from './actions/auth';
// components
import Alert from './components/alert/Alert';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/private-route/PrivateRoute';
// containers
// import Homepage from './containers/homepage/Homepage';
// import Login from './containers/login/Login';
// import Register from './containers/register/Register';
// components
import Spinner from './components/spinner/Spinner';
// styles
import './App.css';
import './scss/App.scss';
// redux
// import { PersistGate } from 'redux-persist/integration/react';
import { store
  // persistor 
} from './store';

// react lazy - replaces the imported containers from above
const Homepage = lazy(() => import('./containers/homepage/Homepage'));
const Login = lazy(() => import('./containers/login/Login'));
const Register = lazy(() => import('./containers/register/Register'));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      {/* <Router basename={window.location.pathname || ''}> */}
      <Router>
        <Fragment>
          {/* <PersistGate persistor={persistor}>  */}
          <Switch>
            <Suspense fallback={<Spinner />}>
              <Navbar />
              <Alert />
              <Route exact path='/' component={Login} />
              <PrivateRoute exact path='/homepage' component={Homepage} />
              <Route exact path='/register' component={Register} />
              <Footer />
            </Suspense>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
