import { NavLink } from "react-router-dom";

const RowTeam = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td>
            <td>{data.name}</td>
            <td>
                { data.leader ?
                    <NavLink to='/' className='badge  badge-primary' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.leader.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    {data.leader.name}
                </NavLink>
                :
                <div className='badge  badge-light' style={{padding:'0px 10px 0px 0px'}}>
                    <img src='/assets/icons/user.png' className='avatar avatar-sm mr-2' alt="data" width="96" height="96"/>
                    No Leader
                </div> }
            </td>
            <td><div className={`badge ${data.status==='Active' ? 'badge-primary' :'badge-danger'}`}>{data.status}</div></td>
            <td><NavLink to={`/team/${data.id}`} className="btn btn-secondary">Detail</NavLink></td>
        </tr>
    );
}

export default RowTeam;