import "../UserPage/UserPage.css";
import React, { useState } from "react";
import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import { useHistory } from "react-router";
import Loginstatus from "../../loginstatus";
import swal from "sweetalert";
import API from "../../api";
import "../AddStudent/Student.css";
import { Link } from "react-router-dom";
import TeacherBlock from "../../TeacherBlock";

export default function EditStudent(props) {
  const [Course, setCourse] = useState([]);
  const [SelectedCourse, setSelectedCourse] = useState("nothing");
  const [SelectedClass, setSelectedClass] = useState([]);
  const [Classofcourse, setClassofcourse] = useState([]);
  const [SubscribeStatus, setSubscribeStatus] = useState([]);

  const [firstname, setFirstName] = useState(
    props.history.location.state && props.history.location.state.firstname
  );
  const [lastname, setLastName] = useState(
    props.history.location.state && props.history.location.state.lastname
  );
  const [Schoolname, setSchoolname] = useState(
    props.history.location.state && props.history.location.state.Schoolname
  );
  const [note, setNote] = useState(
    props.history.location.state && props.history.location.state.Note
  );
  const [code, setCode] = useState(
    props.history.location.state && props.history.location.state.Code
  );
  const [phone, setPhone] = useState(
    props.history.location.state && props.history.location.state.Phone
  );
  const classid = parseInt(SelectedClass);

  let history = useHistory();

  const getcourses = async () => {
    try {
      const res = await API.get(`getcourses`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dealwithdata = async (id) => {
    setSelectedCourse(id);

    try {
      const res = await API.get(`classesSpecificCourse/${id}`);
      setClassofcourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(phone)) {
      swal("!! ادخل رقما صحيحا");
    } else {
      let reqBodyStudent = {
        FirstName: firstname,
        LastName: lastname,
        SchoolName: Schoolname,
        Note: note,
        Code: code,
        Phone: phone,
        ClassId: classid,
      };

      console.log("this is body request of student edit");
      console.log(reqBodyStudent);

      try {
        const res = await API.put(
          `editstudent/${props.history.location.state.Studid}`,
          reqBodyStudent
        );

        console.log("this edit student response");
        console.log(res);

        let reqBodySubs = {
          Status: SubscribeStatus,
          StudentId: props.history.location.state.Studid,
          CourseId: parseInt(SelectedCourse),
        };

        const res2 = await API.put(
          `editsubs/${props.history.location.state.StatusId}`,
          reqBodySubs
        );
        console.log(res2);

        history.push("/StudentPage");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getcourses();
  }, []);

  return (
    <>
      <Loginstatus />
      <TeacherBlock/>
      <SideNav />

      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 className="modal-title" style={{ margin: "auto" }}>
                  {" "}
                  تعديل معلومات الطالب
                </h4>
              </div>

              <div class="modal-body">
                <div class="form-group">
                  <label>اسم الطالب</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="FirstName"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {console.log(firstname)}
                </div>

                <div class="form-group">
                  <label>الشهرة</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="LastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>المدرسة</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Schoolname"
                    value={Schoolname}
                    onChange={(e) => setSchoolname(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>ملاحظات</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>رمز الهاتف</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>الهاتف</label>
                  <input
                    autoComplete="off"
                    type="tel"
                    maxLength="8"
                    class="form-control"
                    name="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label htmlFor="" style={{ display: "block" }}>
                    : اختر الدورة
                  </label>
                  <select
                    className="selectCoursepopup"
                    style={{ display: "block" }}
                    name="selectCoursepopup"
                    required
                    onChange={(e) => dealwithdata(e.target.value)}
                  >
                    <option value="">None</option>
                    {Course.map((cours_data) => {
                      return (
                        <option value={cours_data.id} key={cours_data.id}>
                          {cours_data.CourseName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {SelectedCourse != "nothing" ? (
                  <div>
                    <label htmlFor="" style={{ display: "block" }}>
                      : اختر الصف
                    </label>
                    <select
                      className="selectCoursepopup"
                      style={{ display: "block" }}
                      name="selectCoursepopup"
                      required
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                      }}
                    >
                      <option value="">None</option>
                      {Classofcourse.map((class_data) => {
                        return (
                          <option value={class_data.id} key={class_data.id}>
                            {class_data.ClassName}
                          </option>
                        );
                      })}
                    </select>

                    <div class="form-group" style={{ marginTop: "15px" }}>
                      <p style={{ fontSize: "18px" }}>: الاشتراك </p>
                      <input
                        type="radio"
                        name="paid"
                        value={"تم الدفع"}
                        onChange={(e) => setSubscribeStatus(e.target.value)}
                        required
                      />{" "}
                      تم الدفع
                      <br />
                      <input
                        type="radio"
                        name="paid"
                        value={"لم يدفع بعد"}
                        onChange={(e) => setSubscribeStatus(e.target.value)}
                        required
                      />{" "}
                      لم يتم الدفع
                    </div>
                  </div>
                ) : (
                  <p> </p>
                )}
              </div>

              <div class="modal-footer">
                <Link to="/studentpage">
                  <input
                    style={{ color: "white" }}
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    value="الغاء"
                  />
                </Link>

                <input type="submit" class="btn btn-success" value="حفظ" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
