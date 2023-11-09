import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderSection from "../../components/HeaderSection";
import RowTeam from "../../components/rows/team-row";
import { getTeams } from "../../http";
import { setTeam } from "../../store/team-slice";
import { setTeamMembers } from "../../store/user-slice";

const Teams = () =>
{
  const dispatch = useDispatch();
    dispatch(setTeam(null));
    dispatch(setTeamMembers(null))
    const [loading,setLoading] = useState(true);
    const [teams,setTeams] = useState({});
    
    useEffect(()=>{
        (async ()=>{
            const res = await getTeams();
            if(res.success)
            {
                setTeams(res.data);
                setLoading(false);
            }
        })();
    },[])

    return(
        <>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Teams'/>
                <div className="card">
                  <div className="card-header">
                    <h4>All Teams</h4>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md center-text">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Leader</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          !loading && teams && teams.map((data,index)=>
                          {
                            return <RowTeam key={index} index={index+1} data={data} />
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

export default Teams;