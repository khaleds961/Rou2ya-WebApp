import { useEffect, useState } from "react";
import React from "react";
import { Card, Form } from "react-bootstrap";
import "./Student.css";
import API from "../../api";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

function PopupCourse(match) {
  const [Course, setCourse] = useState([]);
  const [Classofcourse, setClassofcourse] = useState([]);
  const [SubscribeStatus, setSubscribeStatus] = useState([]);
  const [SelectedCourse, setSelectedCourse] = useState("nothing");
  const [SelectedClass, setSelectedClass] = useState([]);

  // requests elements of add student //

  const firstname = match.location.state && match.location.state.FirstName;
  const lastname = match.location.state && match.location.state.LastName;
  const schoolname = match.location.state && match.location.state.SchoolName;
  const note = match.location.state && match.location.state.Note;
  const code = match.location.state && match.location.state.Code;
  const phone = match.location.state && match.location.state.Phone;
  const classid = parseInt(SelectedClass);

  // request off subscription //

  const status = SubscribeStatus;
  const courseid = parseInt(SelectedCourse);

  const history = useHistory();

  const Submit = async (e) => {
    e.preventDefault();

    let reqBodyStudent = {
      FirstName: firstname,
      LastName: lastname,
      SchoolName: schoolname,
      Note: note,
      Code: code,
      Phone: phone,
      ClassId: classid,
    };

    try {
      const res = await API.post("addstudent", reqBodyStudent);

      const res1 = await API.get(
        `getstudentidbycode/${match.location.state.Code}`
      );

      const studentid = res1.data[0].id_stud;
      console.log(studentid);

      let reqBodySubs = {
        Status: status,
        StudentId: studentid,
        CourseId: courseid,
        PrivateSessionId: null,
      };
      const res2 = await API.post("addsubs", reqBodySubs);
      console.log(res2);
    } catch (error) {
      console.log(" Error:", error);
    }

    history.push("/StudentPage");
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

  const getcourses = async () => {
    try {
      const res = await API.get("getcourses");
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelfunction = () => {
    history.push("/addstudent");
  };

  useEffect(() => {
    getcourses();
  }, []);

  return (
    <>
      <LoginStatus /> 
      <TeacherBlock/>

      <div style={{ margin: "auto", width: "max-content" }}>
        <form onSubmit={Submit}>
          <Card border="info" style={{ width: "24rem" }}>
            <Card.Header style={{ fontSize: "1.5rem" }}>
              {" "}
              نافذة معلومات
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ marginBottom: "2rem" }}>
                {" "}
                : دورات منظمة
              </Card.Title>
              <div>
                <label htmlFor="" style={{ display: "block" }}>
                  : اختر الدورة
                </label>
                <select
                  id="box"
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
                <div class="form-group">
                  <label htmlFor="" style={{ display: "block" }}>
                    : اختر الصف
                  </label>
                  <select
                    id="box"
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

                  <div class="form-group">
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

              <div class="modal-footer">
                <Link to="/addstudent">
                  <input
                    style={{ color: "white" }}
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    value="الغاء"
                  />
                </Link>
                <input type="submit" class="btn btn-success" value="اضافة" />
              </div>
            </Card.Body>
          </Card>
        </form>
      </div>
    </>
  );
}

export default PopupCourse;
