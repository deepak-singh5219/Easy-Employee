import { NavLink } from "react-router-dom";

const RowMember = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            <td><figure class="avatar"> <img src={data.image} alt={data.name}/> </figure></td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`badge ${data.status==='Active' ? 'badge-primary' :'badge-danger'}`}>{data.status}</div></td>
            <td><NavLink to={`/employee/${data.id}`} className="btn btn-secondary">Detail</NavLink></td>
        </tr>
    );
}

export default RowMember;