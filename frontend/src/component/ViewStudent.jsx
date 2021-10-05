import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginStatus from "../loginstatus";
import CookieService from "../CookieService";

export default function (props) {
  const [Student, setStudent] = useState([]);

  let StudentsData = {
    Studid: props.studentsbyname[0] && props.studentsbyname[0].id_stud,
    firstname: props.studentsbyname[0] && props.studentsbyname[0].FirstName,
    lastname: props.studentsbyname[0] && props.studentsbyname[0].LastName,
    Schoolname: props.studentsbyname[0] && props.studentsbyname[0].SchoolName,
    Note: props.studentsbyname[0] && props.studentsbyname[0].Note,
    Code: props.studentsbyname[0] && props.studentsbyname[0].Code,
    Phone: props.studentsbyname[0] && props.studentsbyname[0].Phone,
    ClassName: props.studentsbyname[0] && props.studentsbyname[0].ClassName,
    Status: props.studentsbyname[0] && props.studentsbyname[0].Status,
    StatusId: props.studentsbyname[0] && props.studentsbyname[0].id_subs,
    RegisterDate:
      props.studentsbyname[0] &&
      props.studentsbyname[0].created_at.substring(0, 10),
  };

  console.log("hi1", props.studentsbyname);

  if (props.studentsbyname[0] && props.studentsbyname[0].id_stud) {
    return (
      <>
        <LoginStatus />

        {props.studentsbyname.map((st) => (
          <tr>
            <td>{st.FirstName}</td>
            <td>{st.LastName}</td>
            <td>{st.SchoolName}</td>
            <td>{st.Note}</td>
            <td>{st.Code}</td>
            <td>{st.Phone}</td>
            <td>{st.ClassName}</td>
            <td>{st.Status}</td>
            <td>{st.created_at.substring(0, 10)}</td>
            {CookieService.get("Role") != "teacher" ? (
              <td>
                <Link
                  to={{
                    pathname: `/editStudent/${StudentsData.Studid}`,
                    state: StudentsData,
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
                  onClick={() => props.delete(StudentsData.Studid)}
                >
                  <i
                    class="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            ) : (
              ""
            )}
          </tr>
        ))}
      </>
    );
  } else {
    return (
      <tr>
        <td></td>
        <td></td>
        <td colspan="5">
            لا يوجد احد بهذا الاسم !! 
           </td>
        <td></td>
        <td></td>
      </tr>
    );
  }
}
