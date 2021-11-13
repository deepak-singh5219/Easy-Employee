import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CountsCard from "../../../components/dashboard/CountsCard";
import RowMember from "../../../components/rows/row-member";
import { getFreeEmployees, getTeam, getTeamMembers, getFreeLeaders } from "../../../http";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setTeam, setTeamInformation } from '../../../store/team-slice';
import { setFreeEmployees, setTeamMembers,setFreeLeaders } from '../../../store/user-slice';
import LeaderModal from "./modal/LeaderModal";
import LeadersModal from "./modal/LeadersModal";
import MembersModal from "./modal/MembersModal";

const Team = () => {
  const dispatch = useDispatch();
  const { team } = useSelector(state => state.teamSlice);


  useEffect(() => {
    (async () => {
      const res = await getTeam(id);
      if (res.success) {

      }
    })();
  }, [])

  return (
    <>
      <div className="main-content">
        <section className="section">
          {
            team &&
            <>
              <div className="section-header  d-flex justify-content-between">
                <h1>Team</h1>
                <div>
                  <NavLink to={`/editteam/${id}`} className='btn btn-primary mr-4'>Edit Team</NavLink>
                  <button onClick={modalAction} className='btn btn-primary'>Add Member</button>
                </div>
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
                        <tr>
                          <th>Leader</th>
                          <td>
                            { 
                              team.leader ?
                                <button  className='badge btn badge-primary' onClick={modalLeaderAction} style={{padding:'0px 10px 0px 0px'}}>
                                <img src={team.leader.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                                {team.leader.name}
                            </button>
                            :
                            <button onClick={modalLeadersAction} className='badge badge-light btn' style={{padding:'0px 10px 0px 0px'}}>
                                <img src='../assets/icons/user.png' className='avatar avatar-sm mr-2' alt="Person"/>
                                No Leader
                            </button> 
                            }
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          }

        </section>
      </div>
    </>
  )
}

export default Team;