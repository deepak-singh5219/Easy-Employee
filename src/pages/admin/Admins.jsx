import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import RowAdmin from "../../components/rows/row-admin";
import { getAdmins } from "../../http";

const AdminsPage = () =>
{
    const [loading,setLoading] = useState(true);
    const [users,setUsers] = useState({});


    useEffect(()=>{
        (async ()=>{
            const res= await getAdmins();
            if(res.success)
            {
                setUsers(res.data);
                setLoading(false);
            }
        })();
    },[])

    return(
        <>
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