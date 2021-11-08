import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/Navigation";
import RowEmployee from "../../components/rows/row-employee";
import RowLeader from "../../components/rows/row-leader";
import SideBar from "../../components/Sidebar";
import { getLeaders } from "../../http";

const Leaders = () =>
{
    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const {data} = await getLeaders();
            if(data.success)
            {
                setUsers(data.data);
                setLoading(false);
            }
        })();
    },[])

    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Leaders'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Leaders</h4>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md center-text">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Leading Team</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          !loading && users && users.map((data,index)=>
                          {
                            return <RowLeader key={index} index={index+1} data={data} />
                          })
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default Leaders;