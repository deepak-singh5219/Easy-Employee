import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getFreeEmployees } from '../../http';
import { setFreeEmployees } from '../../store/user-slice';
import RowAddMember from '../rows/row-add-member';
import  style from  './Modal.module.css';

const Modal = ({close}) =>
{
  const dispatch = useDispatch();
  const {freeEmployees} = useSelector(state=>state.userSlice);
  const [loading,setLoading] = useState(true);
    useEffect(()=>{
      fetchEmployees();
    },[])

    const  fetchEmployees = async () =>
    {
      console.log(!freeEmployees);
      if(!freeEmployees)
      {
        console.log('Employee is null so calling the method to fetch the free employees from databas server')
        const {data} = await getFreeEmployees();
        if(data.success)
        {
          dispatch(setFreeEmployees(data.data));
          setLoading(false);
        }
      }
      setLoading(false);

    }

    return (    
          <div className={`${style.modalMask}`}>
              <div className={`card ${style.modalBody}`}>
              <div className="card-header justify-content-between">
                  <h4>All Employees</h4>
                  <button className='btn' onClick={close}><i className="fas fa-times"></i></button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-md center-text table-striped">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Team</th>
                    <th>Action</th>
                  </tr>
                  {
                    !loading && freeEmployees && freeEmployees.map((data,index)=>
                    {
                      return <RowAddMember index={index+1} data={data} />
                    })

                  }
                </table>
              </div>
            </div>
              </div>
          </div>
    )
}

export default Modal;