import { Link } from "react-router-dom";

export default function (props) {
  return (
    <tr>
      <td>{props.FirstName}</td>
      <td>{props.LastName}</td>
      <td>{props.Teacher}</td>
      <td>{props.Type}</td>
      <td>{props.Riwaya}</td>
      <td>{props.Surah}</td>
      <td>{props.TimeFrom}</td>
      <td>{props.TimeTo}</td>
      
       
      <td>
        <Link to={`/editsession/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
        <Link to={`/studentprofile/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="bx bx-file-blank bx-tada nav__icon" data-toggle="tooltip" title="file"></i></Link>
        <a href="#" class="delete" data-toggle="modal" onClick={() => props.delete(props.id)} ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      </td>
    </tr>
  );
}
