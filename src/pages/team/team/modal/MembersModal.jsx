import { useSelector } from "react-redux";
import Modal from '../../../../components/modal/Modal';
import RowAddMember from '../../../../components/rows/row-add-member';

const MembersModal = ({close}) =>
{
    const {freeEmployees} = useSelector(state=>state.userSlice);
    return(
        <Modal close={close} title="Add Member">
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
              freeEmployees && freeEmployees.map((data, index) => {
                return <RowAddMember key={index} index={index + 1} data={data} />
              })
            }
          </tbody>
        </table>

      </Modal>
    )
}
export default MembersModal;