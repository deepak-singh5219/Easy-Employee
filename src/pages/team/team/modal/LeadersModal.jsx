import { useSelector } from "react-redux";
import Modal from '../../../../components/modal/Modal';
import RowAddLeader from '../../../../components/rows/row-add-leader';

const LeadersModal = ({close}) =>
{
    const {freeLeaders} = useSelector(state=>state.userSlice);
    return(
      <Modal close={close} title="Set Leader">
      <table className="table table-striped table-md center-text table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            freeLeaders && freeLeaders.map((data, index) => {
              return <RowAddLeader key={index} index={index + 1} data={data} />
            })
          }
        </tbody>
      </table>
  
    </Modal>
    )
}
export default LeadersModal;