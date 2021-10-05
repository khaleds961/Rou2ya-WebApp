import API from '../api';
import React, { useEffect, useState } from 'react';

export default function CourseList(props) {

    const [students, setStudents] = useState([]);

    const getData = async () => {
        await API.get('studentbysession')
            .then(res => {
                const result = res.data;
                setStudents(result);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <select onChange={props.onChange} id="outside" >
            <option
                value={null}
            >
                الطالب
            </option>
            {students.map(student => (
                <option
                    selected={props.id === student.id_stud}
                    key={student.id_stud}
                    value={student.id_stud}
                >
                    {student.FirstName} {student.LastName}

                </option>
            ))}
        </select>
    );
}