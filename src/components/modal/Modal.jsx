import { useEffect, useState } from 'react';
import { getEmployees } from '../../http';
import RowAddMember from '../rows/row-add-member';
import  style from  './Modal.module.css';

const Modal = ({close}) =>
{

    const [users,setUsers] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            const {data} = await getEmployees();
            if(data.success)
            {
                setUsers(data.data);
                setLoading(false);
            }
        })();
    },[])

    return (    
        // <div className="row">
        //     <div className="col md-2"></div>
        //     <div className="col md-8 ">
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
                          !loading && users && users.map((data,index)=>
                          {
                            return <RowAddMember index={index+1} data={data} />
                          })

                        }
                      </table>
                    </div>
                  </div>
                    </div>
                </div>
        //     </div>
        //     <div className="col md-2"></div>
        // </div>
    )
}

export default Modal;