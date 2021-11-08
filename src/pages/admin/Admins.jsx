import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/Navigation";
import RowAdmin from "../../components/rows/row-admin";
import SideBar from "../../components/Sidebar";
import { getAdmins } from "../../http";

const AdminsPage = () =>
{
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState({});


    useEffect(()=>{
        (async ()=>{
            const {data} = await getAdmins();
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
            <HeaderSection title='Admins'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Admins</h4>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          !loading && users && users.map((data,index)=>
                          {
                            return <RowAdmin key={index} index={index+1} data={data} />
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

export default AdminsPage;