import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import Modal from '../../../../components/modal/Modal';
import { removeLeader } from '../../../../http';
import { setTeamLeader } from '../../../../store/team-slice';

const LeaderModal = ({close}) =>
{
    const {user} = useSelector(state => state.authSlice);
    const {team} = useSelector(state=>state.teamSlice);
    const {leader} = team;
    const dispatch = useDispatch();

    const remove = async () =>
    {
        const {success,message} = await removeLeader({userId:leader.id,teamId:team.id});
        if(success)
        {
            toast.success(message);
            dispatch(setTeamLeader(null))
            close();
        }
    }

    const showDialog = () =>
    {  swal({
        title: "Are you sure?",
        text: `You want to remove Leader !\n${leader.name} \nto lead the team`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((yes) => {
        if (yes)
        remove();
      });
    }

    return (
        <Modal close={close} title="Leader Information" width='30%'>
        {
            leader && 
            <div className="text-center">
            <div className="input-group justify-content-center text-center">
                <img className='rounded' src={leader.image} width='120' alt="" /> 
            </div>
            <table className='table table-md'>
                <tr>
                    <th>Name</th>
                    <td>{leader.name}</td>
                </tr> 
                <tr>
                    <th>Email</th>
                    <td>{leader.email}</td>
                </tr>
                <tr>
                    <th>Mobile</th>
                    <td>{leader.mobile}</td>
                </tr>
                
            </table>
            {
                user.type==="Admin"?
                (<button  onClick={showDialog} className='btn btn-danger mb-4'>Remove</button>)
                :
                (<div></div>)
            }
            
                    
        </div>
        }
    </Modal>
    )
}

export default LeaderModal;