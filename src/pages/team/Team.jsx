import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/navigation";
import SideBar from "../../components/sidebar";
import { getTeam } from "../../http";

const Team = () =>
{
    const [loading,setLoading] = useState(false);
    const [team,setTeam] = useState({
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
            const {data} = await getTeam(id);
            if(data.success)
            {
                setTeam(data.data);
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
            <div className="section-header  d-flex justify-content-between">
                <h1>Employee</h1>
                <NavLink to={`/editteam/${id}`} className='btn btn-primary'>Edit Team</NavLink>
            </div>
                <div className="card">
                  <div className="card-body row">
                    <div className="col-md-3 ">
                        <img className='img-fluid img-thumbnail' src={team.image} alt="" />
                    </div>
                    <div className="col-md-9">
                       <table className='table'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{team.name}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{team.description}</td>
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

export default Team;