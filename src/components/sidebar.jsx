import { NavLink } from "react-router-dom"

const SideBar = () =>
{
    return(
        <div className="main-sidebar">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href="index.html">Target Management</a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <a href="index.html">TM</a>
          </div>
          <ul className="sidebar-menu">
          
            <li><NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink></li>
            <li><NavLink className="nav-link" to="/employees"><i className="fas fa-fire"></i> <span>Employees</span></NavLink></li>
            <li><NavLink className="nav-link" to="/leaders"><i className="fas fa-fire"></i> <span>Leaders</span></NavLink></li>
            <li><NavLink className="nav-link" to="/admins"><i className="fas fa-fire"></i> <span>Admins</span></NavLink></li>
            <li><NavLink className="nav-link" to="/teams"><i className="fas fa-fire"></i> <span>Teams</span></NavLink></li>

            <li className="menu-header">Starter</li>
            <li><NavLink className="nav-link" to="/adduser"><i className="far fa-square"></i> <span>Add User</span></NavLink></li>
            <li><NavLink className="nav-link" to="/addteam"><i className="far fa-square"></i> <span>Add Team</span></NavLink></li>
            <li><NavLink className="nav-link" to="/home"><i className="far fa-square"></i> <span>Blank Page</span></NavLink></li>

            <li className="menu-header">Setting</li>
            <li><NavLink className="nav-link" to="/home"><i className="fas fa-pencil-ruler"></i> <span>Credits</span></NavLink></li>
            <li><NavLink className="nav-link" to="/home"><i className="fas fa-pencil-ruler"></i> <span>Credits</span></NavLink></li>
            <li><NavLink className="nav-link" to="/home"><i className="fas fa-pencil-ruler"></i> <span>Credits</span></NavLink></li>
            </ul>

            <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
              <a href="http://socialcodia.com" className="btn btn-primary btn-lg btn-block btn-icon-split">
                <i className="fas fa-rocket"></i> Social Codia
              </a>
            </div>
        </aside>
      </div>
    )
}

export default SideBar;