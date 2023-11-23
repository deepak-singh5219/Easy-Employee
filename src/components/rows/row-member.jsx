import swal from "sweetalert";
import { removeMember} from "../../http/index";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setFreeEmployees, setTeamMembers } from "../../store/user-slice";
import { useSelector } from "react-redux";
import { updateEmployeeCount } from "../../store/team-slice";
import { toast } from "react-toastify";


const RowMember = ({index,data}) =>
{
    const {user} = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    const {teamMembers,freeEmployees} = useSelector(state => state.userSlice);

    const remove = async () =>
    {
        const res = await removeMember({userId:data.id});
        if(res.success)
        {
            toast.success(res.message);
            dispatch(updateEmployeeCount('DECREMENT'));
            dispatch(setTeamMembers(teamMembers.filter(member => member.id!==data.id )));
            if(freeEmployees)
                    dispatch(setFreeEmployees([...freeEmployees,data]));
                else
                    dispatch(setFreeEmployees([data]));
        }   
    }

    const showDialog = () =>
    {  
        swal({
        title: "Are you sure?",
        text: `You want to remove!\n${data.name} \nfrom this team`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((yes) => {
        if (yes)
            remove(); 
      });
    }

    return(
        <tr>
            <td>{index}</td>
            <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`badge ${data.status==='Active' ? 'badge-primary' :'badge-danger'}`}>{data.status}</div></td>
            {
                user.type==="Admin"?
                (<td><button className='btn btn-danger' onClick={showDialog}><i className="fas fa-trash-alt"></i></button></td>)
                :
                (<div></div>)
            }
            
        </tr>
    );
}

export default RowMember;