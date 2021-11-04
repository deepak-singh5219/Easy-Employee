import { useState } from "react";
import { NavLink } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { setEmail } from "../../../store/auth-slice";
import { forgotPassword } from "../../../http";

const ForgotPassword = ({onNext}) =>
{
    const dispatch = useDispatch();
    const storeEmail = useSelector((state)=>state.authSlice.email);
    const [emailAddress,setEmailAddress] = useState(storeEmail);
    const onSubmit = async (e) =>
    {
        e.preventDefault();
        if(!emailAddress) return;
        const {data} = await forgotPassword({email:emailAddress});
        if(!data.success) return;
        dispatch(setEmail(emailAddress))
        onNext();
    }
    return(
        <div className="row">
        <div className="col s12 m6 offset-m3 l4 offset-l4 cusCardWrapper">
            <div className="card cusCard">
                <div className="card-content">
                    <span className="card-title white-text bold">Forgot Password</span>
                    <p className="secondryText">Verify your account and set a new password.</p>
                    <form method="post" onSubmit={onSubmit}>
                       <div className="input-field">
                           <i className="material-icons prefix">email</i>
                           <input onChange={(e)=>setEmailAddress(e.target.value)} value={emailAddress} type="email" name="email" id="email" />
                           <label htmlFor="email">Enter Email</label>
                       </div> 
                       <div className="input-field center">
                           <input type="submit" className='btn center' value="Send OTP" />
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

export default ForgotPassword;