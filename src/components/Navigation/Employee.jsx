import { NavLink } from "react-router-dom";
const Employee = () =>
{
    return(
      <ul className="sidebar-menu">
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink></li>
        <li><NavLink className="nav-link" to="/employees"><i className="fas fa-fire"></i> <span>Collections</span></NavLink></li>
        <li><NavLink className="nav-link" to="/teams"><i className="fas fa-users"></i> <span>Team</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-user"></i> <span>Attendance</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-pen"></i> <span>Apply For Leave</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-book"></i> <span>Leave Applications</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaders"><i class="fas fa-piggy-bank"></i> <span>Salary</span></NavLink></li>

        <li className="menu-header">Settings</li>
        <li><NavLink className="nav-link" to="/contact"><i className="fab fa-teamspeak"></i> <span>Contact Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/about"><i className="fas fa-info-circle"></i> <span>About Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink></li>
      </ul>
    )
}

export default Employee;