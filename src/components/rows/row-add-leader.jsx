import { useSelector } from "react-redux";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { addLeader } from "../../http";
import { useDispatch } from "react-redux";
import { setTeamLeader } from "../../store/team-slice";

const RowAddLeader = ({index,data}) =>
{

  const {team} = useSelector(state=>state.teamSlice);
  const dispatch = useDispatch();

  const add = async () =>
  {
        const res = await addLeader({userId:data.id,teamId:team.id});
        if(res.success)
        {
            toast.success(res.message);
            console.log('data'+data)
            dispatch(setTeamLeader(data))
        }
  }

    const showDialog = () =>
    {  swal({
        title: "Are you sure?",
        text: `You want to make!\n${data.name} \nto the Leader of the Team`,
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

export default RowAddLeader;