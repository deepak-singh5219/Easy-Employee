import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const DashboardEmployee = () => {
  const {user} = useSelector(state => state.authSlice);
  console.log(user)
  
  return (
    <div className="main-content">
    <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4>Welcome {user?.name}</h4>
              </div>
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
                                    <th>Username</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Usertype</th>
                                    <td>{user.type}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{user.status}</td>
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

            {/* <div className="col-md-9">
                    <table className='table'>
                      <tbody>
                        <tr>
                          <th>Title</th>
                          <td>{application?.title}</td>
                        </tr>
                        <tr>
                          <th>Type</th>
                          <td>{application?.type}</td>
                        </tr>
                        <tr>
                          <th>Start Date</th>
                          <td>
                           {application?.startDate}
                        </td>
                        </tr>
                        <tr>
                          <th>End Date</th>
                          <td>
                           {application?.endDate}
                        </td>
                        </tr>
                        <tr>
                          <th>Applied Date</th>
                          <td>
                           {application?.appliedDate}
                        </td>
                        </tr>
                        <tr>
                          <th>Period</th>
                          <td>
                           {application?.period}
                        </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td className={`${application?.adminResponse==="Rejected"?"text-danger":application?.adminResponse==="Pending"?"text-primary":"text-success"}`}>
                           {application?.adminResponse}
                        </td>
                        </tr>

                      </tbody>
                    </table>
                  </div> */}
    </section>
  </div>
  )
}

export default DashboardEmployee;
