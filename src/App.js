
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
import Team from './pages/team/team/Team';
import EditUser from './pages/user/EditUser';
import EditTeam from './pages/team/EditTeam';
import Admin from './pages/admin/Admin';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/components.css';
import Leaders from './pages/leader/Leaders';
import SideBar from './components/sidebar';
import Navigation from './components/navigation';
import Members from './pages/leaderpage/Members';
import UserTeams from './components/Employees/UserTeams';
import Attendance from './components/Employees/Attendance';
import LeaveApplications from './components/Employees/LeaveApplications';
import Salary from './components/Employees/Salary';
import ApplyForLeave from './components/Employees/ApplyForLeave';
import EmployeeTeam from './pages/team/team/EmployeeTeam';
import LeaveApplication from './components/Employees/LeaveApplication';
import DashboardEmployee from './components/DashboardEmployee';
import AttendanceView from './components/Admin/AttendanceView';
import LeaveView from './components/Admin/LeaveView';
import Leave from './components/Admin/Leave';
import AssignSalary from './components/Admin/AssignSalary';
import Salaries from './components/Admin/Salaries';
import SalaryView from './components/Admin/Salary';




// import './assets/css/asdfasdf';
// import './assets/css/asdfasdf';

const App = () =>
{
  const loading = useAutoLogin();

  return loading ? 
  <Loading/> : (
    <Switch>
      <EmployeeRoute exact path='/userTeams'>
        <UserTeams/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userteam/:id'>
        <EmployeeTeam/>
      </EmployeeRoute> 
      <EmployeeRoute exact path='/dashboardEmployee'>
        <DashboardEmployee/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userAttendance'>
        <Attendance/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/applyforleave'>
        <ApplyForLeave/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userSalary'>
        <Salary/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userLeaveApplications'>
        <LeaveApplications/>
      </EmployeeRoute>
      <EmployeeRoute exact path='/userLeaveApplications/:id'>
        <LeaveApplication/>
      </EmployeeRoute>
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
      <AdminRoute exact path='/employees'>
        <Employees/>
      </AdminRoute>
      <LeaderRoute exact path='/members'>
        <Members/>
      </LeaderRoute>
      <AdminRoute exact path='/admins'>
        <Admins/>
      </AdminRoute>
      <AdminRoute exact path='/teams'>
        <Teams/>
      </AdminRoute>
      <AdminRoute exact path='/adduser'>
        <AddUser/>
      </AdminRoute>
      <AdminRoute exact path='/attendance'>
        <AttendanceView/>
      </AdminRoute>
      <AdminRoute exact path='/leaves'>
        <LeaveView/>
      </AdminRoute>
      <AdminRoute exact path='/assignSalary'>
        <AssignSalary/>
      </AdminRoute>
      <AdminRoute exact path='/salaries'>
        <Salaries/>
      </AdminRoute>
      <AdminRoute exact path='/leaves/:id'>
        <Leave/>
      </AdminRoute>
      <AdminRoute exact path='/salary/:id'>
        <SalaryView/>
      </AdminRoute>
      <AdminRoute exact path='/addteam'>
        <AddTeam/>
      </AdminRoute>
      <AdminRoute  path='/employee/:id'>
        <Employee/>
      </AdminRoute>
      <AdminRoute  path='/team/:id'>
        <Team/>
      </AdminRoute> 
      <AdminRoute  path='/edituser/:id'>
        <EditUser/>
      </AdminRoute>
      <AdminRoute  path='/editteam/:id'>
        <EditTeam/>
      </AdminRoute>
      <AdminRoute  path='/admin/:id'>
        <Admin/>
      </AdminRoute>
      <AdminRoute  path='/leaders'>
        <Leaders/>
      </AdminRoute>
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
  const {isAuth} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return isAuth ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
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

const AdminRoute = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && user.type==='Admin' ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
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

const AdminLeaderRouter = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && (user.type==='Admin' || user.type==='Leader') ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
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


const LeaderRoute = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && user.type==='Leader' ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
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

const EmployeeRoute = ({children,...rest}) =>
{
  const {user} = useSelector((state)=>state.authSlice);
  return (
    <Route {...rest} render={({location})=>{
      return user && user.type==='Employee' || user.type==='Leader' ? (
        <>
          <SideBar/>
          <Navigation/>
          {children}
        </>) : (
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