import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {resetPassword} from "../../../http/index";

const ResetPassword = () =>
{
    const {email} = useSelector((state)=>state.authSlice);
    const [formData,setFormData] = useState({
        email:email,
        otp:'',
        password:''
    });

    const history = useHistory();

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
        const {email,otp,password} = formData;
        if(!email || !otp || !password) return;
        const res = await resetPassword({email,otp,password});
        if(res.status === 200)
        {
            // const {success,message}  = res.data;
            history.push('/login');
        }
    }
    return(
        <div className="row">
        <div className="col s12 m6 offset-m3 l4 offset-l4 cusCardWrapper">
            <div className="card cusCard">
                <div className="card-content">
                    <span className="card-title white-text bold">Reset Password</span>
                    <p className="secondryText">Yup..! Now you can Reset your password</p>
                    <form method="post" onSubmit={onSubmit}>
                       <div className="input-field">
                           <i className="material-icons prefix">email</i>
                           <input onChange={inputEvent} value={formData.email} type="email" name="email" id="email" readOnly />
                           <label htmlFor="email">Enter Email</label>
                       </div> 
                       <div className="input-field">
                           <i className="material-icons prefix">lock_open</i>
                           <input onChange={inputEvent} value={formData.otp} type="number" name="otp" id="otp" />
                           <label htmlFor="otp">Enter Otp</label>
                       </div> 
                       <div className="input-field">
                           <i className="material-icons prefix">lock</i>
                           <input onChange={inputEvent} value={formData.password} type="password" name="password" id="password" />
                           <label htmlFor="password">Enter New Password</label>
                       </div> 
                       <div className="input-field center">
                           <input type="submit" className='btn center' value="Reset Password" />
                       </div>
                    </form>
                   <div className='center'>
                       <span className='secondryText'>Want to try more? </span> <NavLink to='/login'><span className='bold'>Login</span></NavLink>
                   </div>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default ResetPassword;