import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { addMember } from "../../http";
import { useDispatch } from "react-redux";
import { setFreeEmployees, setTeamMembers } from "../../store/user-slice";
import { updateEmployeeCount } from "../../store/team-slice";

const RowAddMember = ({index,data}) =>
{

  const {team} = useSelector(state=>state.teamSlice);
  const {freeEmployees,teamMembers} = useSelector(state=>state.userSlice);
  const dispatch = useDispatch();

  const add = async () =>
  {
        const res = await addMember({userId:data.id,teamId:team.id});
        if(res.success)
        {
            toast.success(res.message);
            removeMemberFromStore(data.id);
        }
  }

  const removeMemberFromStore = (id) =>
  {
      dispatch(setFreeEmployees(freeEmployees.filter(data=> data.id!==id)));
      dispatch(setTeamMembers([...teamMembers,data]));
      dispatch(updateEmployeeCount('INCREMENT'));
  }

    const showDialog = () =>
    {  swal({
        title: "Are you sure?",
        text: `You want to add!\n${data.name} \ninto this team`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((yes) => {
        if (yes)
          add();
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
            <td><button className='btn btn-success' onClick={showDialog}><i className="fas fa-plus"></i></button></td>
        </tr>
    );
}

export default RowAddMember;