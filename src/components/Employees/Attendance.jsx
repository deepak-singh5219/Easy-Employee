import React, { useEffect, useState } from 'react'
import { markEmployeeAttendance } from '../../http';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const Attendance = () => {
  const {user} = useSelector(state => state.authSlice);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('attendanceData');
    if(storedData) {
      setIsAttendanceMarked(true);
    }
  },[]);

  const divStyle = {
    backgroundColor: isAttendanceMarked ? 'green' : 'red',
    width: '100px',
    height: '100px',
  };

  function setExpirationTimer() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
  
    const timeRemaining = midnight - now;
    setTimeout(() => {
      sessionStorage.removeItem('attendanceData');
    }, timeRemaining);
  }

  const markAttendance = async () => {
    const res = await markEmployeeAttendance({"employeeID": user.id});
    const { success } = res;


    if(success) {
        toast.success(res.message);
        const {newAttendance} = res;
        console.log(newAttendance);
        const attendanceData = JSON.stringify(newAttendance);
        sessionStorage.setItem('attendanceData', attendanceData);
        setIsAttendanceMarked(true);
        setExpirationTimer();
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
                  <button style={divStyle} className='btn-attendance' onClick={markAttendance}>Mark Attendance</button>
                </div>
              </div>
            </div>
    </section>
  </div>
  )
}

export default Attendance;
