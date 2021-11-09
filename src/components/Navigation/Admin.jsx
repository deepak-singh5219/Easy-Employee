import { NavLink } from "react-router-dom";

const Admin = () =>
{
    return(
        <ul className="sidebar-menu">
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-home"></i> <span>Dashboard</span></NavLink></li>
        <li><NavLink className="nav-link" to="/employees"><i className="fas fa-users"></i> <span>Employees</span></NavLink></li>
        <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-user-friends"></i> <span>Leaders</span></NavLink></li>
        <li><NavLink className="nav-link" to="/admins"><i className="fas fa-users-cog"></i> <span>Admins</span></NavLink></li>
        <li><NavLink className="nav-link" to="/teams"><i className="fas fa-fire"></i> <span>Teams</span></NavLink></li>

        <li className="menu-header">Starter</li>
        <li><NavLink className="nav-link" to="/adduser"><i className="fas fa-user-plus"></i> <span>Add User</span></NavLink></li>
        <li><NavLink className="nav-link" to="/addteam"><i className="fas fa-address-card"></i> <span>Add Team</span></NavLink></li>
        <li><NavLink className="nav-link" to="/home"><i className="far fa-square"></i> <span>Blank Page</span></NavLink></li>

        <li className="menu-header">Settings</li>
        <li><NavLink className="nav-link" to="/contact"><i className="fab fa-teamspeak"></i> <span>Contact Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/about"><i className="fas fa-info-circle"></i> <span>About Us</span></NavLink></li>
        <li><NavLink className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink></li>
      </ul>
    )
}

export default Admin;