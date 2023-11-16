import { NavLink } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";




const Employee = () =>
{

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () =>
    {
        await dLogout();
        dispatch(setAuth(null))
        return history.push('/login');
    }
    return(
      <ul className="sidebar-menu">
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userTeams"><i className="fas fa-users"></i> <span>Team</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userAttendance"><i className="fas fa-user"></i> <span>Attendance</span></NavLink></li>
        <li><NavLink className="nav-link" to="/applyforleave"><i className="fas fa-pen"></i> <span>Apply For Leave</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userLeaveApplications"><i className="fas fa-book"></i> <span>Leave Applications</span></NavLink></li>
        <li><NavLink className="nav-link" to="/userSalary"><i class="fas fa-piggy-bank"></i> <span>Salary</span></NavLink></li>

        <li className="menu-header">Settings</li>
        <li><NavLink className="nav-link" to="/contact"><i className="fab fa-teamspeak"></i> <span>Contact me</span></NavLink></li>
        <li><NavLink className="nav-link" to="/about"><i className="fas fa-info-circle"></i> <span>About me</span></NavLink></li>
        <li><NavLink onClick={logout} className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink></li>
      </ul>
    )
}

export default Employee;