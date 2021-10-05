import API from "../../api";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import StudentTeacherSession from "../StudentTeacherSession";
import LoginStatus from "../../loginstatus";
import SearchSession from "../../SearchSession";

export default function UserPage() {
  const [students, setstudent] = useState([]);
  const [studentsbyname, setstudentsbyname] = useState([]);
  const [fname, SetFname] = useState("");
  const [lname, SetLname] = useState("");
  const [inputSearch, SetInputSearch] = useState("");
  const [test, settest] = useState(0);

  const getData = async () => {
    await API.get("joinstudentuser").then((res) => {
      const result = res.data;
      setstudent(result);
      console.log(result);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (value) => {
    SetInputSearch(value);
    let res = value.split(" ");
    if (res.length == 3) {
      SetFname(res[0]);
      SetLname(res[2]);
    } else if (res.length == 2) {
      SetFname(res[0]);
      SetLname(res[1]);
    } else if (res.length == 1) {
      SetFname(res[0]);
    }
    settest(value.length);
  };

  const getDatas = async (e) => {
    let reqBody = {
      FirstName: fname,
      LastName: lname,
    };
    try {
      let res = await API.post(`searchprivatesession`, reqBody).then((res) => {
        const result = res.data;
        if (inputSearch == "") {
          setstudentsbyname("");
        } else {
          setstudentsbyname(result);
        }
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

  useEffect(() => {
    setstudentsbyname("");
    getDatas();
  }, [inputSearch]);

  const deleteUser = async (id) => {
    const willDelete = await swal({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف هذه الحصة؟",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let res = await API.delete(`deleteprivatesession/${id}`);
        const result = res.data.message;
        if (res.data.success) {
          await swal("تم حذفه", result, "success");
        } else {
          await swal("", result, "error");
        }
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <LoginStatus />
      <SideNav />
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    ادارة <b>الحصص الخصوصية</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link to="/addsession" class="btn " data-toggle="modal">
                    <i class="bx bxs-plus-circle bx-burst"></i>
                    <span>اضافة حصة جديدة</span>
                  </Link>
                  <input
                    type="text"
                    class="input"
                    name="txt"
                    placeholder="ابحث هنا"
                    onChange={(e) => {
                      search(e.target.value);
                    }}
                  />

                  <i
                    class="bx bx-search-alt iconsearch"
                    style={{
                      position: "relative",
                      top: "-2px",
                      left: "25px",
                      color: "#33808A",
                    }}
                  ></i>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover tests">
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>اسم الشهرة</th>
                  <th>الاستاذ</th>
                  <th>نوع القراءة</th>
                  <th>الرواية</th>
                  <th>السورة</th>
                  <th> من الساعة</th>
                  <th>الى الساعة</th>
                 

                  <th></th>
                </tr>
              </thead>
              <tbody>

                  {test>0 ? (
                  <SearchSession
                  studentsbyname={studentsbyname}
                  />
                  ) : (
                students.map((student) => (
                  <StudentTeacherSession
                    key={student.id}
                    id={student.id}
                    FirstName={student.FirstName}
                    LastName={student.LastName}
                    Teacher={student.username}
                    Type={student.Type}
                    Riwaya={student.Riwaya}
                    Surah={student.Surah}
                    TimeFrom={student.TimeFrom}
                    TimeTo={student.TimeTo}
                    PageFrom={student.PageFrom}
                    PageTo={student.PageTo}
                    VerseFrom={student.VerseFrom}
                    VerseTo={student.VerseTo}
                    Note={student.Note}
                    Date={student.Date}
                    delete={deleteUser}
                  />
                ))
                    )  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
