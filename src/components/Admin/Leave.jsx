import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { updateLeave, viewLeaves } from '../../http';
import { toast } from 'react-toastify';
import Loading from '../Loading';






const Leave = () => {
    const {id} = useParams();
    const [application, setApplication] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const obj = {
                "_id":id
            }
            const res = await viewLeaves(obj);
            setApplication(res.data[0]);
        }
        fetchData();

    },[application]);

    const approveApplication = async() => {
      console.log(application)
      if(application.adminResponse==="Approved")
      {
        toast.error("Application already approved");
        return;
      }
      application["adminResponse"] = "Approved";
      const res = await updateLeave(id, application);
      const {success} = res;
      if(success) {
        toast.success("Leave Approved");
        setApplication(application);
      }
    }

    const rejectApplication = async () => {
      console.log(application)
      if(application.adminResponse==="Rejected")
      {
        toast.error("Application already rejected");
        return;
      }
      application["adminResponse"] = "Rejected";
      const res = await updateLeave(id, application);
      const {success} = res;
      if(success) {
        toast.success("Leave Rejected");
        setApplication(application);
      }
    }
    
  return (
    <>
    {
      application? (<div className="main-content">
      <section className="section">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h4>Application on {application?.appliedDate}</h4>
                </div>
              </div>
  
              <div className="col-md-9">
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
                            <th>Reason</th>
                            <td>{application?.reason}</td>
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
                      <button onClick={approveApplication} className={`${application?.adminResponse==="Approved"?"btn-secondary":"btn-success"} btn btn-lg m-4 btn-icon-split`}>Approve</button>
                      <button onClick={rejectApplication} className={`${application?.adminResponse==="Rejected"?"btn-secondary":"btn-danger"} btn btn-lg m-4 btn-icon-split`}>Reject</button>
  
                    </div>
      </section>
    </div>)
    : <Loading/>
  
    }
    </>
    
      )
}

export default Leave;
