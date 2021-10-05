import API from "../api";
import React, { useEffect, useState } from "react";
import './UserPage/UserPage.css'

export default function CourseClasses(props) {
  const [classs, setClasss] = useState([]);

  const getData = async () => {
    await API.get(`classcourse/${props.CourseId}`).then((res) => {
      const result = res.data;
      setClasss(result);
    });
  };
  console.log(classs)

  useEffect(() => { 
    getData();
  }, [props.CourseId]);

  return (
    <ul id="outsides" onChange={props.onChange} >

      {
      (classs.length !==0) ?  ( 
      
      classs.map((cl) => (
        <li
          selected={props.id === cl.id}
          key={cl.id}
          value={cl.id}
        >
          {cl.ClassName}
        </li>
      ))

                  ) :(
                  
                    <li> لا يوجد صف</li>
                  )          
                   }

    </ul>
  
  
  
  );
}
