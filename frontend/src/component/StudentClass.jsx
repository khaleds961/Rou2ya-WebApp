import React, { useEffect, useState } from "react";

export default function (props) {
  const [status, setStatus] = useState("");


const test = () =>{
  props.handleClick(props.id, status);
  setStatus("")
}
  
  return (
    <>
    
      <tr>
  
      <td>{props.FName}</td>
      <td>{props.LName}</td>
      <td>
        <select id="outside" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">الحضور</option>
          <option value="Present" >حاضر</option>
          <option value="Absent">غائب</option>
        </select>
      </td>
      <td>
      <button type="button" class="btn btn-primary" onClick={() =>test()}>
        تم
      </button>
      </td>
    </tr>    
    </>
  );
}
