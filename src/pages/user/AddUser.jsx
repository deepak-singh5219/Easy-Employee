import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addUser } from "../../http";
import Modal from '../../components/modal/Modal';

const AddUser = () =>
{
    const [imagePreview, setImagePreview] = useState('/assets/icons/user.png');
    const initialState = {name:'',email:'',mobile:'',password:'',type:'Employee',address:'',profile:'',adminPassword:''}
    const [formData,setFormData] = useState(initialState);
    const [showModal,setShowModal] = useState(false);

    const inputEvent = (e) =>
    {
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
        const {name,email,mobile,password,type,address,profile} = formData;
        if(!name || !email || !mobile || !password || !type || !address) return toast.error('All Field Required');
        if(!profile) return toast.error('Please choose an image');
        if(type==='Admin' && !showModal) {setShowModal(true); return};
        const fd = new FormData();
        Object.keys(formData).map((key)=>
        {
            return fd.append(key,formData[key]);
        })
        console.log(fd);
        const {success,message} = await addUser(fd);
        if(success)
        {
            toast.success(message)
            setShowModal(false);
            setFormData({...initialState});
            setImagePreview('/assets/icons/user.png');
        }
    }

    const captureImage = (e) =>
    {
        const file = e.target.files[0];
        setFormData((old)=>
        {
            return{
                ...old,
                profile:file
            }

        })
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>
        {
            setImagePreview(reader.result);
        }
    }

    const modalAction = () => setShowModal(showModal? false : true);

    return(
        <>

        {
            showModal && 
            <Modal close={modalAction} title="Add Admin" width='35%'>
                <div className="row"  style={{margin:'20px'}}>
                    <div className="col col-md-4">
                        <div className="input-group justify-content-center text-center">
                            <img className='rounded' src={imagePreview} width='120' alt="" /> 
                        </div>
                    </div>
                    <div className="col col-md-8">
                        <table className='table table-md'>
                            <tr>
                                <th>Name</th>
                                <td>{formData.name}</td>
                            </tr> 
                            <tr>
                                <th>Email</th>
                                <td>{formData.email}</td>
                            </tr>
                            <tr>
                                <th>User Type</th>
                                <td>{formData.type}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="form-group col-md-12">
                    <label>Enter Your Password</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-lock"></i>
                        </div>
                        </div>
                        <input onChange={inputEvent} value={formData.adminPassword} type="password" placeholder={`Enter Your Password To Add ${formData.name} As An Admin`} id='adminPassword' name='adminPassword' className="form-control"/>
                    </div>
                </div>
                <div className="justify-content-center text-center mb-3">
                    <button className='btn btn-primary btn-lg' type='submit' form='addUserForm' style={{width:'30vh'}}>Add {formData.type}</button>
                </div>
            </Modal>
        }

        <div className="main-content">
        <section className="section">
            <HeaderSection title='Add User'/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit} id='addUserForm'>
                        <div className="form-group col-md-12 text-center">
                            <div className="input-group justify-content-center">
                                <input type="file" id='profile' name='profile' className="form-control d-none" onChange={captureImage} accept="image/*" />
                                <label htmlFor='profile'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.name} type="text" id='name' name='name' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.email} type="email" id='email' name='email' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Mobile Number</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-phone"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.mobile} type="number" id='mobile' name='mobile' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.password} type="password" id='password' name='password' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>User Type</label>
                            <select name='type' onChange={inputEvent} value={formData.type} className="form-control select2">
                                <option>Employee</option>
                                <option>Leader</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        <div className="form-group col-md-12 ">
                            <label>Enter Address</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.address} type="text" id='address' name='address' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group text-center col-md-12">
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Add {formData.type}</button>
                        </div>

                    </form>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default AddUser;