import {Link} from 'react-router-dom'
import './UserCard.css'
export default function (props) {
    return (
        <tr>
            <td>{props.username}</td>
            <td>{props.role}</td>
            <td>
                <Link to={`/edituser/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
                <a href="#" class="delete" data-toggle="modal" onClick={() => props.delete(props.id)} >
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                </a>
            </td>
        </tr>
    );
}