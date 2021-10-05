import API from "../../api";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import "../UserCard/UserCard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import StudentCard from "../StudentCard/StudentCard";
import ViewStudent from "../ViewStudent";
import Loginstatus from "../../loginstatus";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CookieService from "../../CookieService";

export default function StudentPage() {
  const [Student, setStudent] = useState([]);
  const [studentsbyname, setstudentsbyname] = useState([]);
  const [fname, SetFname] = useState("");
  const [lname, SetLname] = useState("");
  const [inputSearch, SetInputSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [test, settest] = useState(0);

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& > *": {
          marginTop: theme.spacing(2),
        },
      },
    })
  );
  const classes = useStyles();

  const getDatas = async () => {
    await API.get(`classStudentSubs/?page=${page}`).then((res) => {
      const result = res.data.data;
      setStudent(result);
      setTotal(Math.ceil(res.data.total / 4));
    });
  };

  useEffect(() => {
    getDatas();
  }, [page]);

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

  const changePage = (e, value) => {
    setPage(value);
  };

  const getData = async (e) => {
    let reqBody = {
      FirstName: fname,
      LastName: lname,
    };
    try {
      let res = await API.post(`studentbys`, reqBody).then((res) => {
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
    getData();
  }, [inputSearch]);

  const deleteStudent = async (id) => {
    const willDelete = await swal({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف هذاالطالب؟",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let res = await API.delete(`deleteSubsbystudentId/${id}`);
        let res1 = await API.delete(`deletestudent/${id}`);
        const result = res1.data.message;
        if (res1.data.success && res.data.success) {
          await swal("تم خذفه", result, "success");
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
      <Loginstatus />
      <SideNav />
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    ادارة <b>الطلاب</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  {CookieService.get("Role") != "teacher" ? (
                    <Link to="/addstudent" class="btn " data-toggle="modal">
                      <i class="bx bxs-plus-circle bx-burst"></i>
                      <span>اضافة طالب جديد</span>
                    </Link>
                  ) : (
                    ""
                  )}

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
                       top:'-2px',
                       left:'25px',
                       color:'#33808A'
                      }}
                    ></i>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الشهرة</th>
                  <th>المدرسة</th>
                  <th>ملاحظات</th>
                  <th>رمز الهاتف</th>
                  <th>الهاتف</th>
                  <th>الصف</th>
                  <th>الاشتراك</th>
                  <th>تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {test > 0 ? (
                  <ViewStudent
                    studentsbyname={studentsbyname}
                    delete={deleteStudent}
                  />
                ) : (
                  Student.map((st) => (
                    <StudentCard
                      key={st.id_stud}
                      studid={st.id_stud}
                      Firstname={st.FirstName}
                      Lastname={st.LastName}
                      Schoolname={st.SchoolName}
                      Note={st.Note}
                      Code={st.Code}
                      registerdate={st.created_at}
                      Phone={st.Phone}
                      Classname={st.ClassName}
                      delete={deleteStudent}
                      SubsId={st.id_subs}
                      status={st.Status}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={classes.root}
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Pagination
          shape="rounded"
          count={total}
          size="small"
          onChange={changePage}
          variant="outlined"
          // hidePrevButton
          // hideNextButton
        />
      </div>
    </>
  );
}
