import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Navigation from "../../components/Navigation";
import SideBar from "../../components/Sidebar";
import { getUser } from "../../http";

const Employee = () =>
{
    const [loading,setLoading] = useState(false);
    console.log(loading)
    const [user,setUser] = useState({
        name:'',
        email:'',
        mobile:'',
        image:'',
        address:'',
        status:''
    });
    const {id} = useParams();
    console.log(useParams())
    useEffect(()=>{
        (async ()=>{
            const {data} = await getUser(id);
            if(data.success)
            {
                setUser(data.data);
                setLoading(false);
            }
        })();
    },[id])


    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <div className="section-header  d-flex justify-content-between">
                <h1>Employee</h1>
                <NavLink to={`/edituser/${id}`} className='btn btn-primary'>Edit User</NavLink>
            </div>
                <div className="card">
                  <div className="card-body row">
                    <div className="col-md-3 ">
                        <img className='img-fluid img-thumbnail' src={user.image} alt="" />
                    </div>
                    <div className="col-md-9">
                       <table className='table'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td>{user.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{user.address}</td>
                                </tr>
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

export default Employee;