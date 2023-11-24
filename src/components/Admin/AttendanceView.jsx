import React, { useEffect, useState } from 'react'
import { getAttendance, getEmployees, getLeaders } from '../../http';
import Loading from '../Loading';






const AttendanceView = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [attendance, setAttendance] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();

  const years = [2020,2021,2022, 2023, 2024]; // Customize this as needed
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthDays = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31,
  }
  const numOfDays = monthDays[selectedMonth];
  const days = Array.from({ length: numOfDays }, (_, index) => index + 1);

  useEffect(()=>{
    const dt = new Date();
    const obj = {
      "year": dt.getFullYear(),
      "month":dt.getMonth()+1,
      "date":dt.getDate(),
    }
    let empObj = {};
    const fetchData = async () => {
      const res = await getAttendance(obj);
      
      const {data} = res;
      console.log(data)
      setAttendance(data);
    } 
    const fetchEmployees = async () => {
        const emps = await getEmployees();
        const leaders = await getLeaders();
        emps.data.forEach(employee => empObj[employee.id] = [employee.name, employee.email]);
        leaders.data.forEach(leader => empObj[leader.id] = [leader.name, leader.email]);
        setEmployeeMap(empObj);
        setEmployees([...emps.data,...leaders.data]);
        
    }
    fetchEmployees();
    fetchData();
  },[]);



 


  const searchAttendance = async () => {
      const obj = {};
      if(selectedEmployee){
        obj["employeeID"] = selectedEmployee;
      }
      if(selectedYear){
        obj["year"] = selectedYear;
      }
      if(selectedMonth){
        obj["month"] = months.findIndex(month => month===selectedMonth)+1;
      }
      if(selectedDay){
        obj["date"] = selectedDay;
      }

      console.log(obj);

      const res = await getAttendance(obj);
      const {data} = res;
      setAttendance(data);
  }
  return (
    <>
    {
      attendance? ( <div className="main-content">
      <section className="section">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h4>Attendance</h4>
                  
                </div>
              </div>
        
        <div className="d-flex justify-content-center w-100">
  
        <div className="col">
          <select
            className='form-control select2'
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Employees</option>
            {employees?.map((employee) => (
              <option key={employee._id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
         
         <div className="col">
          <select
            className='form-control select2'
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
  
        <div className="col">
          <select
            className='form-control select2'
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
          className='form-control select2'
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <button onClick={searchAttendance} className="btn btn-lg btn-primary col">Search</button>
      </div>
      </section>
      <div className="table-responsive">
          <table className="table table-striped table-md center-text">
              <thead>
                 <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Status</th>
                </tr>
              </thead>
              <tbody>
               {
  
                attendance?.map((attendance,idx) => 
                <tr> 
                <td>{idx+1}</td> 
                <td>{employeeMap && employeeMap[attendance.employeeID][0]}</td>
                <td>{employeeMap && employeeMap[attendance.employeeID][1]}</td>
                <td>{attendance.date+"/"+attendance.month+"/"+attendance.year}</td>
                <td>{attendance.day}</td>
                <td>{attendance.present===true?"Present":""}</td>
                </tr> 
                )
               }            
              </tbody>
          </table>
      </div>
    </div>)
    :
    <Loading/>
    }
    </>
   
  )
}

export default AttendanceView;
