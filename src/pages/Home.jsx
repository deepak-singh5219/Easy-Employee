import Main from "../components/DashboardAdmin";
import Navigation from "../components/navigation";
import SideBar from "../components/sidebar";

const Home = () =>
{
    return(
        <>
          <div id="app">
            <div className="main-wrapper">
              <Navigation/>
              <SideBar/>
              <Main/>
            </div>
          </div>
        </>
    )

}

export default Home;