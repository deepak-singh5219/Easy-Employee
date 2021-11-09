import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { dLogout } from "../http";
import { setAuth } from "../store/auth-slice";


const Navigation = () =>
{
    const {name,image} = useSelector((state)=>state.authSlice.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = async () =>
    {
        await dLogout();
        dispatch(setAuth(null))
        return history.push('/login');
    }

    return(
        <>

        <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                <ul className="navbar-nav mr-3">
                    <li><NavLink to='/' id='sidebarCollapse' data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars"></i></NavLink></li>
                    <li><NavLink to='/' data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search"></i></NavLink></li>
                </ul>
                <div className="search-element">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="250"/>
                    <button className="btn" type="submit"><i className="fas fa-search"></i></button>
                    
                </div>
                </form>
                <ul className="navbar-nav navbar-right">
                <li className="dropdown dropdown-list-toggle"><a href='#' data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep"><i className="far fa-bell"></i></a>
                    <div className="dropdown-menu dropdown-list dropdown-menu-right">
                    <div className="dropdown-header">Notifications
                        <div className="float-right">
                        <NavLink to='/'>Mark All As Read</NavLink>
                        </div>
                    </div>
                    <div className="dropdown-list-content dropdown-list-icons">
                        <NavLink to='/' className="dropdown-item dropdown-item-unread">
                        <div className="dropdown-item-icon bg-primary text-white">
                            <i className="fas fa-code"></i>
                        </div>
                        <div className="dropdown-item-desc">
                            Template update is available now!
                            <div className="time text-primary">2 Min Ago</div>
                        </div>
                        </NavLink>
                        <NavLink to='/' className="dropdown-item">
                        <div className="dropdown-item-icon bg-info text-white">
                            <i className="far fa-user"></i>
                        </div>
                        <div className="dropdown-item-desc">
                            <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                            <div className="time">10 Hours Ago</div>
                        </div>
                        </NavLink>
                        <NavLink to='/' className="dropdown-item">
                        <div className="dropdown-item-icon bg-success text-white">
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="dropdown-item-desc">
                            <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                            <div className="time">12 Hours Ago</div>
                        </div>
                        </NavLink>
                        <NavLink to='/' className="dropdown-item">
                        <div className="dropdown-item-icon bg-danger text-white">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="dropdown-item-desc">
                            Low disk space. Let's clean it!
                            <div className="time">17 Hours Ago</div>
                        </div>
                        </NavLink>
                        <NavLink to='/' className="dropdown-item">
                        <div className="dropdown-item-icon bg-info text-white">
                            <i className="fas fa-bell"></i>
                        </div>
                        <div className="dropdown-item-desc">
                            Welcome to Stisla template!
                            <div className="time">Yesterday</div>
                        </div>
                        </NavLink>
                    </div>
                    <div className="dropdown-footer text-center">
                        <NavLink to='/'>View All <i className="fas fa-chevron-right"></i></NavLink>
                    </div>
                    </div>
                </li>
                <li className="dropdown"><a href='#' data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                    <img alt="image" src={image} className="rounded-circle mr-1"/>
                    <div className="d-sm-none d-lg-inline-block">Hi, {name}</div></a>
                    <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-title">Logged in 5 min ago</div>
                    <NavLink to="features-profile.html" className="dropdown-item has-icon">
                        <i className="far fa-user"></i> Profile
                    </NavLink>
                    <NavLink to="features-activities.html" className="dropdown-item has-icon">
                        <i className="fas fa-bolt"></i> Activities
                    </NavLink>
                    <NavLink to="features-settings.html" className="dropdown-item has-icon">
                        <i className="fas fa-cog"></i> Settings
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to='/' onClick={logout} className="dropdown-item has-icon text-danger">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </NavLink>
                    </div>
                </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;