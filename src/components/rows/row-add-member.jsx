import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { addMember } from "../../http";
import { useDispatch } from "react-redux";
import { setFreeEmployees, setTeamMembers } from "../../store/user-slice";

const RowAddMember = ({index,data}) =>
{

  const {team} = useSelector(state=>state.teamSlice);
  const {freeEmployees,teamMembers} = useSelector(state=>state.userSlice);
  const dispatch = useDispatch();

  const add = async () =>
  {
        const res = await addMember({userId:data.id,teamId:team.id});
        if(res.status===200 && res.data.success)
        {
            toast.success(res.data.message);
            removeMemberFromStore(data.id);
        }
        else
            toast.error(res.data.message);
  }

  const removeMemberFromStore = (id) =>
  {
      dispatch(setFreeEmployees(freeEmployees.filter(data=> data.id!=id)));
      dispatch(setTeamMembers([...teamMembers,data]));
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
            <td><figure class="avatar"> <img src={data.image} alt={data.name}/> </figure></td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`badge ${data.status==='Active' ? 'badge-primary' :'badge-danger'}`}>{data.status}</div></td>
            <td>
                { data.team ?
                    <NavLink to={`/team/${data.team.id}`} className='badge  badge-primary' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.team.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    {data.team.name}
                </NavLink>
                :
                <div className='badge  badge-light' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    No Team
                </div> }
            </td>
            <td><button className='btn btn-success' onClick={showDialog}><i className="fas fa-plus"></i></button></td>
        </tr>
    );
}

export default RowAddMember;