import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";

export const useAutoLogin = () =>
{
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        (async()=>
        {
            try{
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh`,{
                    withCredentials:true,
                });
                if(res.status===200)
                {
                    if(res.data.success)
                        dispatch(setAuth(res.data.user));
                    setLoading(false)
                }
                else
                    setLoading(false)

            }
            catch(err)
            {
                console.log(err)
                setLoading(false)
            }

        })();
    })
    return loading;
}