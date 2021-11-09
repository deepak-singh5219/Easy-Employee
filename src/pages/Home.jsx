import Main from "../components/DashboardAdmin";
import Navigation from "../components/Navigation";
import SideBar from "../components/Sidebar";

const Home = () =>
{
    return(
        <>
          <div id="app">
            <div className="main-wrapper">
              <Main/>
            </div>
          </div>
        </>
    )

}

export default Home;