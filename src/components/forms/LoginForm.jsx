import { useState } from "react";
import { NavLink } from "react-router-dom";
import { doLogin } from "../../http";
import { useDispatch } from "react-redux";
import {setAuth} from '../../store/auth-slice';

const LoginForm = () =>
{  
    const dispatch = useDispatch();
    const [enable,setEnable] = useState(false);
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const inputEvent = (e) =>
    {
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return {
                ...old,
                [name]:value
            }
        })
        checkInput();
    }
    const checkInput = () =>
    {
        console.log(formData.password)
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEnable(() =>
            (re.test(formData.email) && formData.password.length>7) ? true : false
        )
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        const {email,password} = formData;
        if(!email || !password) return;
        const res = await doLogin({email,password});
        if(res.status===200)
        {
            // const {success,message,user} = res.data;
            const {user} = res.data;
        if(res.data.success)
            dispatch(setAuth(user));
        }
    }

    return(
     <div className="row">
         <div className="col s12 m6 offset-m3 l4 offset-l4 cusCardWrapper">
             <div className="card cusCard">
                 <div className="card-content">
                     <span className="card-title white-text bold">Login Form</span>
                     <p className="secondryText">Login into your account to continue...</p>
                     <form method="post" onSubmit={onSubmit}>
                        <div className="input-field">
                            <i className="material-icons prefix">email</i>
                            <input onChange={inputEvent} value={formData.email} type="email" name="email" id="email" />
                            <label htmlFor="email">Enter Email</label>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                            <input onChange={inputEvent} value={formData.password} type="password" name="password" id="password" />
                            <label htmlFor="password">Enter Password</label>
                        </div>
                        <div className='forgotPasswordLink'>
                            <NavLink  to='/forgot'>Forgot Password ?</NavLink>
                        </div>
                        <div className="input-field center" >
                            <input type="submit" className='btn center' value="Login" style={{cursor:!enable && 'no-drop'}}/>
                        </div>
                     </form>
                 </div>
             </div>
         </div>
     </div>   
    )
}

export default LoginForm;