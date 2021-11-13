import { NavLink } from "react-router-dom";
const Leader = () =>
{
    return(
    <ul className="sidebar-menu">
      <li><NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink></li>
      <li><NavLink className="nav-link" to="/members"><i className="fas fa-fire"></i> <span>Members</span></NavLink></li>
      <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-fire"></i> <span>Team</span></NavLink></li>

      <li className="menu-header">Settings</li>
        <li><NavLink className="nav-link" to="/contact"><i className="fab fa-teamspeak"></i> <span>Contact Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/about"><i className="fas fa-info-circle"></i> <span>About Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink></li>
    </ul>
    )
}

export default Leader;