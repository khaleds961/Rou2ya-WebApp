import { Link } from "react-router-dom";
import LoginStatus from "../../loginstatus";
import "../UserCard/UserCard.css";
import CookieService from "../../CookieService";

export default function (props) {
  const id = props.id;
  const stat = props.status;
  const statusid = props.SubsId;
  const fn = props.Firstname;
  const ln = props.Lastname;
  const sn = props.Schoolname;
  const no = props.Note;
  const co = props.Code;
  const pho = props.Phone;
  const registerdate = props.registerdate.substring(0, 10);
  const date = props.Date;

  let privStudentsData = {
    Studid: id,
    firstname: fn,
    lastname: ln,
    Schoolname: sn,
    Note: no,
    Code: co,
    Phone: pho,
    Status: stat,
    Dat: date,
    StatusId: statusid,
    RegisterDate: registerdate,
  };

  return (
    <>
      <LoginStatus />

      <tr>
        <td>{props.Firstname}</td>
        <td>{props.Lastname}</td>
        <td>{props.Schoolname}</td>
        <td>{props.Note}</td>
        <td>{props.Code}</td>
        <td>{props.Phone}</td>
        <td>{props.Date}</td>
        <td>{props.status}</td>
        <td>{props.registerdate.substring(0, 10)}</td>
        {CookieService.get('Role') != 'teacher' ? (
        <td>
          <Link
            to={{
              pathname: `/editprivStudent/${props.id}`,
              state: privStudentsData,
            }}
            clasectionss="edit"
            data-toggle="modal"
          >
            <i class="material-icons" data-toggle="tooltip" title="Edit">
              &#xE254;
            </i>
          </Link>
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
        ): (
          ''
        )}
      </tr>
    </>
  );
}
