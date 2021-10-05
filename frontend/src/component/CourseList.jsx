import API from '../api';
import React, { useEffect, useState } from 'react';

export default function CourseList(props) {

    const [courses, setCourses] = useState([]);

    const getData = async () => {
        await API.get('getcourses')
            .then(res => {
                const result = res.data;
                setCourses(result);
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
                الدورات
            </option>
            {courses.map(course => (
                <option
                    selected={props.id === course.id}
                    key={course.id}
                    value={course.id}
                >
                    {course.CourseName}
                </option>
            ))}
        </select>
    );
}