import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { assignSalary, getEmployees, getLeaders } from "../../http";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";


const AssignSalary = () =>
{
  const initialState = {salary:'',bonus:'', reasonForBonus:''}
  const [formData,setFormData] = useState(initialState);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [employees, setEmployees] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
        const emps = await getEmployees();
        const leaders = await getLeaders();
        setEmployees([...emps.data,...leaders.data]);
    }
    fetchEmployees();

  },[]);

    const inputEvent = (e) =>
    {
      console.log(formData);
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return{
                ...old,
                [name]:value
            }

        })
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        const {salary, bonus, reasonForBonus} = formData;
        if(!salary || !bonus || !reasonForBonus) return toast.error('All Field Required');
        formData["employeeID"] = selectedEmployee;
        const res = await assignSalary(formData);
        const {success} = res;
        console.log(res)
        if(success) {
          toast.success("Salary Assigned!");
        }    

        setFormData(initialState);
    }

    return(
        <>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Salary'/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit} id='addUserForm'>
                        
        <div className="form-group col-md-4">
        <label>Employees</label>  
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

                        <div className="form-group col-md-4">
                            <label>Enter Salary</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-pen"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.salary} type="number" id='salary' name='salary' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Bonus</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-pen"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.bonus} type="number" id='bonus' name='bonus' className="form-control"/>
                            </div>
                        </div>
                           

                        <div className="form-group col-md-12 ">
                            <label>Enter Reason</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-book"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.reasonForBonus} type="text" id='reasonForBonus' name='reasonForBonus' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group text-center col-md-12">
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Assign Salary</button>
                        </div>

                    </form>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default AssignSalary;

