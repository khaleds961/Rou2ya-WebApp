import API from "../api";
import React, { useEffect, useState } from "react";


export default function (props) {
  const [attendance, setAttendance] = useState([]);

  const getData = async (e) => {
    let reqBody = {
      ClassId: props.idClass,
      datee: props.created_at,
    };
    try {
     let res = await API.post(`viewattendacestudent`, reqBody).then((res) => {
        const result = res.data;
        setAttendance(result);
    });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
}
  console.log(attendance)

  useEffect(() => {
    getData();
  }, [props.created_at,props.idClass]);

        return (
          <>
            {attendance.map((att) => (
              <tr>
                <td>{att.FirstName}</td>
                <td>{att.LastName}</td>
                <td>{att.status}</td>
              </tr>
            ))}
          </>
        );
}


