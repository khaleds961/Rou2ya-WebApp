import '../UserPage/UserPage.css'
import React, { useState } from "react";
import { useHistory } from 'react-router';
import SideNav from '../SideNav/SideNav';
import CourseList from '../CourseList';
import {Link} from 'react-router-dom';
import LoginStatus from '../../loginstatus';
import TeacherBlock from '../../TeacherBlock';

export default function AddClass(props) {
    const [ClassName, setClassName] = useState('');
    const [TimeFrom, setTimeFrom] = useState('');
    const [TimeTo, setTimeTo] = useState('');
    const [CourseName,SetCourseName] = useState('');


    const [error, setError] = useState('');


    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const formData = new FormData();
            formData.append("ClassName", ClassName);
            formData.append("CourseId",CourseName);
            formData.append("TimeFrom",TimeFrom);
            formData.append("TimeTo",TimeTo);
            let url = `//localhost:8000/api/addclass`
            await fetch(url, {
                method: "post",
                body: formData,
                
            });
            console.log(CourseName,ClassName)
        } catch (err) {
            setError(error)
        }
        history.push('/ClassPage')
    }

    return (
        <>

        <LoginStatus/>
        <TeacherBlock/>
        <SideNav/>
    <div id="addEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <form onSubmit={handleSubmit}>
          <div class="headers">
                <h4>اضافة صف جديد</h4>
              </div>
            <div class="modal-body">
              <div class="form-group">
                <label>اسم الصف</label>
                <input
                  type="text"
                  class="form-control"
                  name="description"
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label> من الساعة</label>
                <input
                  type="time"
                  class="form-control"
                  name="description"
                  onChange={(e) => setTimeFrom(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <label> الى الساعة</label>
                <input
                  type="time"
                  class="form-control"
                  name="description"
                  onChange={(e) => setTimeTo(e.target.value)}
                  required
                />
              </div>

              <div class="form-group">
                <CourseList 
                onChange={e=>SetCourseName(e.target.value)}
                />
              </div>

            </div>
            <div class="modal-footer">
              <Link to="/classpage">
              <input
              style={{color:'white'}}
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                value="الغاء"
                // onClick={() => props.history.push("/classpage")} 
              />
              </Link>
              <input type="submit" class="btn btn-success" value="اضافة" />
              
            </div>
          </form>
        </div>
      </div>
    </div>
    </>

            );
}