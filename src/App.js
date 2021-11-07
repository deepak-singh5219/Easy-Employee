
import {Redirect,Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Home from './pages/Home'
import {useSelector} from 'react-redux';
// import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core';
import './App.css';
import Loading from './components/Loading';
import { useAutoLogin } from './hooks/useAutoLogin';
import Employees from './pages/employee/Employees';
import Admins from './pages/admin/Admins';
import Teams from './pages/team/Teams';
import AddUser from './pages/user/AddUser';
import AddTeam from './pages/team/AddTeam';
import Employee from './pages/employee/Employee';
import Team from './pages/team/Team';
import EditUser from './pages/user/EditUser';
import EditTeam from './pages/team/EditTeam';
import Admin from './pages/admin/Admin';

const App = () =>
{
  const loading = useAutoLogin();

  return loading ? 
  <Loading/> : (
    <Switch>
      <GuestRoute exact path='/' >
        <Login/>
      </GuestRoute>
      <GuestRoute exact path='/login' >
        <Login/>
      </GuestRoute>
      <GuestRoute exact path='/forgot' >
        <Forgot/>
      </GuestRoute>
      <ProtectedRoute exact path='/home'>
        <Home/>
      </ProtectedRoute>
      <ProtectedRoute exact path='/employees'>
        <Employees/>
      </ProtectedRoute>
      <ProtectedRoute exact path='/admins'>
        <Admins/>
      </ProtectedRoute>
      <ProtectedRoute exact path='/teams'>
        <Teams/>
      </ProtectedRoute>
      <ProtectedRoute exact path='/adduser'>
        <AddUser/>
      </ProtectedRoute>
      <ProtectedRoute exact path='/addteam'>
        <AddTeam/>
      </ProtectedRoute>
      <ProtectedRoute  path='/employee/:id'>
        <Employee/>
      </ProtectedRoute>
      <ProtectedRoute  path='/team/:id'>
        <Team/>
      </ProtectedRoute> 
      <ProtectedRoute  path='/edituser/:id'>
        <EditUser/>
      </ProtectedRoute>
      <ProtectedRoute  path='/editteam/:id'>
        <EditTeam/>
      </ProtectedRoute>
      <ProtectedRoute  path='/admin/:id'>
        <Admin/>
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


const ProtectedRoute = ({children,...rest}) =>
{
  console.log(rest);
  const {isAuth} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return isAuth ? (children ) : (
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