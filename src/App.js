
import {Redirect,Switch,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ForgotPage from './pages/ForgotPage'
import HomePage from './pages/HomePage'
import {useSelector} from 'react-redux';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './App.css';
import Loading from './components/Loading';
import { useAutoLogin } from './hooks/useAutoLogin';

const App = () =>
{
  const loading = useAutoLogin();

  return loading ? 
  <Loading/> : (
    <Switch>
      <GuestRoute exact path='/' >
        <LoginPage/>
      </GuestRoute>
      <GuestRoute exact path='/login' >
        <LoginPage/>
      </GuestRoute>
      <GuestRoute exact path='/forgot' >
        <ForgotPage/>
      </GuestRoute>
      <ProtectedRoute exact path='/home'>
        <HomePage/>
      </ProtectedRoute>
    </Switch>
  )
}


const GuestRoute = ({children,...rest}) =>
{
  const {isAuth} = useSelector((state)=>state.authSlice);
  return(
    <Route {...rest} render={({location})=>
    {
      return isAuth ? (
        <Redirect to={{pathname:'/home',state:{from:location}}} />
      ) : (children);
    }}>
    </Route>
  )
}


const ProtectedRoute = ({children,rest}) =>
{
  const {isAuth} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return isAuth ? (children) : (
        <Redirect
          to={{
            pathname:'/',
            state:{
              from:location
            }
          }}
        />
      );
    }} />
  );
}


export default App;