import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {resetPassword} from "../../../http/index";
import { toast } from "react-toastify";

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
        if(!email || !otp || !password) return toast.error('All Fields Required');
        const res = await resetPassword({email,otp,password});
        console.log(res);
        res.success ? toast.success(res.message) : toast.error(res.message);
        if(res.success)
            history.push('/login');
    }
    return(
        <div id="app">
            <section className="section">
            <div className="container mt-5">
                <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="login-brand">
                  <img src="https://www.pockethrms.com/wp-content/uploads/2022/01/Happy-Workforce.jpg" alt="logo" width="200" className=""/>
                </div>
                    <div className="card card-primary">
                    <div className="card-header"><h4>Reset Password</h4></div>

                    <div className="card-body">
                        <p className="text-muted">We have send you an OTP to reset your password</p>
                        <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input id="email" onChange={inputEvent} value={formData.email} type="email" className="form-control" name="email" tabIndex="1" required autoFocus readOnly/>
                        </div>

                        <div className="form-group">
                            <label for="otp">OTP</label>
                            <input id="otp" onChange={inputEvent} value={formData.otp} type="number" className="form-control pwstrength" data-indicator="pwindicator" name="otp" tabIndex="2" required/>
                            <div id="pwindicator" className="pwindicator">
                            <div className="bar"></div>
                            <div className="label"></div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="password">New Password</label>
                            <input id="password" onChange={inputEvent} value={formData.password} type="password" className="form-control" name="password" tabIndex="2" required/>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex="4">
                            Reset Password
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className="simple-footer">
                    Copyright &copy; Social Codia
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default ResetPassword;