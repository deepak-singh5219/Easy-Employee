import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCounts } from "../../http";
import { setCount } from "../../store/main-slice";
import CountsCard from './CountsCard';

const Employee = () =>
{
  const dispatch = useDispatch();
  useEffect(()=>{
    (async ()=>
    {
      const res = await getCounts();
      if(res.success)
        dispatch(setCount(res.data));
    })();
  },[])

  const {counts}  = useSelector((state)=>state.mainSlice);
  const {admin,employee,leader,team} = counts;

    return(
        <div className="row">
            <CountsCard title='Total Target' icon='fa-user' count={employee}/>
            <CountsCard title='Total Complete' icon='fa-user' count={leader}/>
            <CountsCard title='Total Remaining' icon='fa-user' count={admin}/>
            <CountsCard title='Your Rank' icon='fa-user' count={team}/>
        </div>
    )
}

export default Employee;