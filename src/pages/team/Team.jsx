import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CountsCard from "../../components/dashboard/CountsCard";
import Navigation from "../../components/Navigation";
import RowMember from "../../components/rows/row-member";
import SideBar from "../../components/Sidebar";
import Modal from '../../components/modal/Modal';
import { getFreeEmployees, getTeam, getTeamMembers } from "../../http";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setTeam, setTeamInformation } from '../../store/team-slice';
import { setFreeEmployees, setTeamMembers } from '../../store/user-slice';
import RowAddMember from "../../components/rows/row-add-member";

const Team = () => {
  const dispatch = useDispatch();
  const { team } = useSelector(state => state.teamSlice);
  const { teamMembers } = useSelector(state => state.userSlice);
  const { teamInformation } = useSelector(state => state.teamSlice);
  const { freeEmployees } = useSelector(state => state.userSlice);

  const [loading, setLoading] = useState(true);
  const [freeApiCalled, setFreeApiCalled] = useState(false);
  const [membersLoading, setMembersLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await getTeam(id);
      if (data.success) {
        dispatch(setTeam(data.data));
        dispatch(setTeamInformation(data.data.information));
        setLoading(false);
      }
      const res = await getTeamMembers(id);
      if (res.data.success) {
        dispatch(setTeamMembers(res.data.data))
        setMembersLoading(false);
      }
    })();
  }, [id])

  const modalAction = async () => {
    setShowModal(showModal ? false : true);
    if (!freeApiCalled) {
      const { data } = await getFreeEmployees();
      if (data.success) {
        dispatch(setFreeEmployees(data.data));
      }
      setFreeApiCalled(true);
    }
  }



  return (
    <>

      <ToastContainer />
      {
        showModal && (
          <Modal close={modalAction} title="Add Member">
            <table className="table table-striped table-md center-text table-striped">
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
                  !loading && freeEmployees && freeEmployees.map((data, index) => {
                    return <RowAddMember key={index} index={index + 1} data={data} />
                  })
                }
              </tbody>
            </table>

          </Modal>
        )
      }
      <Navigation />
      <SideBar />

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
              <div className="row">
                <CountsCard title='Total Employee' icon='fa-user' count={teamInformation.employee} />
                <CountsCard title='Total Employee' icon='fa-user' count={teamInformation.employee} />
                <CountsCard title='Total Employee' icon='fa-user' count={teamInformation.employee} />
                <CountsCard title='Total Employee' icon='fa-user' count={teamInformation.employee} />
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
            </>
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
                        !loading && teamMembers && teamMembers.map((data, index) => {
                          return <RowMember key={index} index={index + 1} data={data} />
                        })

                      }
                    </tbody>
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