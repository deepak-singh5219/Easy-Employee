import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/Navigation";
import SideBar from "../../components/Sidebar";
import { updateUser,getUser } from "../../http";

const EditUser = () =>
{
    const initialState = {
        name:'',
        email:'',
        mobile:'',
        password:'',
        type:'',
        address:'',
        profile:'',
        status:''
    };
    const [imagePreview, setImagePreview] = useState('/assets/icons/user.png');
    const [formData,setFormData] = useState(initialState);

    const [updateFormData,setUpdatedFormData] = useState({});

    const [userType,setUserType] = useState('User');

    const {id} = useParams();
    
    useEffect(()=>{
        (async()=>{
            const res = await getUser(id);
            if(res.success)
            {
                setUserType(res.data.type);
                setFormData(res.data)
                setImagePreview(res.data.image);
            }
        })();
    },[id])

    const inputEvent = (e) =>
    {
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return{
                ...old,
                [name]:value
            }

        });
        setUpdatedFormData((old)=>
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
        // const {name,email,mobile,password,type,address,profile} = formData;
        // if(!name || !email || !mobile || !password || !type || !address || !profile) return;

        const fd = new FormData();
        Object.keys(updateFormData).map((key)=>
        {
            return fd.append(key,updateFormData[key]);
        })
        const {success,message} = await updateUser(id,fd);
        return (success) ? toast.success(message) : toast.error(message)
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

        setUpdatedFormData((old)=>
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

    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <HeaderSection title={`Edit ${userType}`}/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit}>
                        <div className="form-group col-md-12 text-center">
                            <div className="input-group justify-content-center">
                                <input type="file" id='profile' name='profile' className="form-control d-none" onChange={captureImage} accept="image/*" />
                                <label htmlFor='profile'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
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

                        <div className="form-group col-md-4">
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
                            <label>Enter Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.username} type="username" id='username' name='username' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-3">
                            <label>Enter Mobile Number</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-phone"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.mobile} type="tel" id='mobile' name='mobile' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-3">
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

                        <div className="form-group col-md-3">
                            <label>User Type</label>
                            <select name='type' onChange={inputEvent} value={formData.type} className="form-control select2">
                                <option>Employee</option>
                                <option>Leader</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        <div className="form-group col-md-3">
                            <label>User Status</label>
                            <select name='status' onChange={inputEvent} value={formData.status} className="form-control select2">
                                <option>Active</option>
                                <option>Banned</option>
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
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Update {userType}</button>
                        </div>
                    </form>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default EditUser;