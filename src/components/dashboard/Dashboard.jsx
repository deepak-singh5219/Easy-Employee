import { useSelector } from "react-redux";
import HeaderSection from "../HeaderSection";
import Admin from "./Admin";
import Employee from "./Employee";
import Leader from "./Leader";

const Dashboard = () =>
{
  const {user} = useSelector(state=>state.authSlice);
    return(
        <div className="main-content">
        <section className="section">
         <HeaderSection title='Dashboard'/>
          {
            user.type==='Admin' ? <Admin/> : user.type==='Leader' ? <Leader/> : <Employee/>
          }
        </section>
      </div>
    )
}

export default Dashboard;