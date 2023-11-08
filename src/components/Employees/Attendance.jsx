import React from 'react'
import { markEmployeeAttendance } from '../../http';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const Attendance = () => {
  const {user} = useSelector(state => state.authSlice);

  const markAttendance = async () => {
    const res = await markEmployeeAttendance({"employeeID": user.id});
    const {success} = res;
    if(success) {
        toast.success(res.message);
    }
  }
  return (
    <div className="main-content">
    <section className="section">
            <div className="card">
              <div className="card-header">
                <h4>Attendance</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <button onClick={markAttendance}>Mark Attendance</button>
                </div>
              </div>
            </div>
    </section>
  </div>
  )
}

export default Attendance;
