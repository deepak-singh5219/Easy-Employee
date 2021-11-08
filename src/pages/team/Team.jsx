import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CountsCard from "../../components/dashboard/CountsCard";
import Navigation from "../../components/Navigation";
import RowMember from "../../components/rows/row-member";
import SideBar from "../../components/Sidebar";
import Modal from '../../components/modal/Modal';
import { getTeam,getTeamMembers } from "../../http";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {setTeam}  from '../../store/team-slice';
import {setTeamMembers} from '../../store/user-slice';

const Team = () =>
{
    const dispatch = useDispatch();
    const {team} = useSelector(state=>state.teamSlice);
    const {teamMembers} = useSelector(state=>state.userSlice);
    const [loading,setLoading] = useState(true);
    const [membersLoading,setMembersLoading] = useState(true);

    const [showModal,setShowModal] = useState(false);

    const {id} = useParams();
    useEffect(()=>{
        (async ()=>{
            const {data} = await getTeam(id);
            if(data.success)
            {
                dispatch(setTeam(data.data));
                setLoading(false);
            }
            const res = await getTeamMembers(id);
            if(res.data.success)
            {
                dispatch(setTeamMembers(res.data.data))
                setMembersLoading(false);
            }
        })();
    },[id])

    const modalAction = () =>
    {
        setShowModal(showModal? false : true);
    }

    return(
        <>
    
    <ToastContainer/>
    {
        showModal && (
            <Modal close={modalAction}/>
        )
    }
        <Navigation/>
        <SideBar/>
        
        <div className="main-content">
        <section className="section">
            <div className="section-header  d-flex justify-content-between">
                <h1>Team</h1>
                <div>
                    
                <NavLink to={`/editteam/${id}`} className='btn btn-primary mr-4'>Edit Team</NavLink>
                <button onClick={modalAction} className='btn btn-primary'>Add Member</button>
                </div>
            </div>
            <div className="row">
              <CountsCard title='Total Employee' icon='fa-user' count='125'/>
              <CountsCard title='Total Employee' icon='fa-user' count='125'/>
              <CountsCard title='Total Employee' icon='fa-user' count='125'/>
              <CountsCard title='Total Employee' icon='fa-user' count='125'/>
            </div>
                
                {
                  team &&
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
                }

                {
                  !membersLoading && 
                  <div className="card">
                  <div className="card-header">
                    <h4>All Employees</h4>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md center-text">
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        {
                          !loading && teamMembers && teamMembers.map((data,index)=>
                          {
                            return <RowMember index={index+1} data={data} />
                          })

                        }
                      </table>
                    </div>
                  </div>
                </div>
                }
        </section>
      </div>
      </>
    )
}

export default Team;