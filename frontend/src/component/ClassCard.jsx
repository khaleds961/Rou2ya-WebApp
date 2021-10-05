import { Link } from "react-router-dom";

export default function (props) {
  return (
    <tr>
      <td>{props.className}</td>
      <td>{props.CourseName}</td>
      <td>{props.TimeFrom}</td>
      <td>{props.TimeTo}</td>

      <td>
        <a
          href="#"
          class="delete"
          data-toggle="modal"
          onClick={() => props.delete(props.id)}
        >
          <i class="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}
