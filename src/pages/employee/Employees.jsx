import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import RowEmployee from "../../components/rows/row-employee";
import { getEmployees } from "../../http";

const Employees = () =>
{
    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const res = await getEmployees();
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
            <HeaderSection title='Employees'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Employees</h4>
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
                            <th>Team</th>
                            <th>Action</th>
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

export default Employees;