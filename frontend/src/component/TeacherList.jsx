import API from '../api';
import React, { useEffect, useState } from 'react';

export default function CourseList(props) {

    const [teachers, setTeacher] = useState([]);

    const getData = async () => {
        await API.get('allteacheruser')
            .then(res => {
                const result = res.data;
                setTeacher(result);
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
                الاستاذ
            </option>
            {teachers.map(teacher => (
                <option
                    selected={props.id === teacher.id}
                    key={teacher.id}
                    value={teacher.id}
                >
                    {teacher.username}
                </option>
            ))}
        </select>
    );
}