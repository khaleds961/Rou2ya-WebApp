import API from "../api";
import React, { useEffect, useState } from "react";

export default function ClassCourse(props) {
  const [classs, setclass] = useState([]);

  const getData = async () => {
    await API.get(`classcourse/${props.idCourse}`).then((res) => {
      const result = res.data;
      setclass(result);
    });
  };
//   console.log(sections)

  useEffect(() => { 
    getData();
  }, [props.idCourse]);

  return (
    <select id="outside" onChange={props.onChange} >
      <option value={null}>الصف</option>
      {classs.map((cl) => (
        <option
          selected={props.id === cl.id}
          key={cl.id}
          value={cl.id}
        >
          {cl.ClassName}
        </option>
      ))}
    </select>
  );
}
