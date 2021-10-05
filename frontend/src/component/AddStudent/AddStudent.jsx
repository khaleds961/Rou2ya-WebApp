import "../UserPage/UserPage.css";
import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import { useHistory } from "react-router";
import "./Student.css";
import swal from "sweetalert";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";
import API from "../../api";

export default function AddStudent() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [Schoolname, setSchoolname] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [SubscribeStatus, setSubscribeStatus] = useState([]);
  const [StudentId, setStudentId] = useState("");
  const [Coursepage, setCoursepage] = useState(false);
  const [OpenTeacher, setOpenTeacher] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [TeacherId, setTeacherId] = useState("");

  const [classid, setClassid] = useState("");
  const [datasCode, setdatasCode] = useState([]);
  const [datasPhone, setdatasPhone] = useState([]);

  var datacode = [];
  var dataphone = [];

  let history = useHistory();

  const fetchData = async () => {
    await API.get("getstudents").then((res) => {
      const result = res.data;
      setdatasCode(result);
    });
  };
  for (let index = 0; index < datasCode.length; index++) {
    datacode[index] = datasCode[index].Code;
  }
  for (let index = 0; index < datasCode.length; index++) {
    dataphone[index] = datasCode[index].Phone;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    function checkCode() {
      for (let i = 0; i < datacode.length; i++) {
        if (code === datacode[i]) {
          return true;
        }
      }
    }

    function checkPhone() {
      for (let i = 0; i < dataphone.length; i++) {
        if (phone === dataphone[i]) {
          return true;
        }
      }
    }

    if (isNaN(phone)) {
      swal("ادخل رقما صحيحا",'','info');
    } else {

      if(checkCode()==true){
        swal("رمز الهاتف المدخل موجود مسبقا ",'','info');
      }else{
        if(checkPhone()==true){
          swal("الرقم المدخل موجود مسبقا ",'','info');
        }else{

          let reqBodyStudent = {
            FirstName: firstname,
            LastName: lastname,
            SchoolName: Schoolname,
            Note: note,
            Code: code,
            Phone: phone,
          };
    
          try {
          } catch (error) {
            console.log(" Error:", error);
          }
    
          if (Coursepage) {
            history.push({
              pathname: "/CourseAddStudent",
              state: reqBodyStudent,
            });
          } else {
            history.push({
              pathname: "/PrivateAddStudent",
              state: reqBodyStudent,
            });
          }
        }

        }
      }  
      
  };

  return (
    <>
      <LoginStatus />
      <TeacherBlock />
      <SideNav />
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="headers">
                <h4>اضافة طالب جديد</h4>
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
                  <label style={{ display: "block", paddingBottom: "0.6rem" }}>
                    {" "}
                    : اختر نوع الحصص{" "}
                  </label>

                  <label>
                    حصص خاصة
                    <input
                      type="radio"
                      class="form-control"
                      name="radio_sessionType"
                      style={{
                        height: "17px",
                        marginRight: "1rem",
                        display: "inline",
                      }}
                      required
                    />
                  </label>

                  <label htmlFor="">
                    دورات منظمة
                    <input
                      type="radio"
                      class="form-control"
                      name="radio_sessionType"
                      style={{
                        height: "17px",
                        marginRight: "1rem",
                        display: "inline",
                      }}
                      required
                      onClick={() => {
                        setCoursepage(true);
                      }}
                    />
                  </label>

                  <div className="courseStudentPopUp"></div>
                </div>
              </div>
              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="التالي" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
