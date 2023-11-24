import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import RowEmployee from "../../components/rows/row-employee";
import {getMembers_Leader } from "../../http";

const Members = () =>
{
    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const res = await getMembers_Leader();
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
            <HeaderSection title='Members'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Members</h4>
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
                          </tr>
                        </thead>
                        <tbody>
                        {
                          !loading && users && users.map((data,index)=>
                          {
                            return <RowEmployee key={index} index={index+1} data={data} />
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

export default Members;