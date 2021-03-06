import API from "../../api";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import "../UserCard/UserCard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import StudentPrivateCard from "../StudentCard/StudentPrivateCard";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ViewPrivateStudent from "../ViewPrivateStudent";
import LoginStatus from "../../loginstatus";
import CookieService from "../../CookieService";

export default function StudentPage() {
  const [PrivStudent, setPrivStudent] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [studentsbyname, setstudentsbyname] = useState([]);
  const [fname, SetFname] = useState("");
  const [lname, SetLname] = useState("");
  const [inputSearch, SetInputSearch] = useState("");
  const [test, settest] = useState("");

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

  const getprivData = async () => {
    await API.get(`privateStudentSubs/?page=${page}`).then((res) => {
      const result = Object.values(res.data.data);
      setPrivStudent(result);
      setTotal(Math.ceil(res.data.total / 4));
    });
  };

  useEffect(() => {
    getprivData();
  }, [page]);

  const changePage = (e, value) => {
    setPage(value);
  };

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

  const getData = async (e) => {
    let reqBody = {
      FirstName: fname,
      LastName: lname,
    };
    try {
      let res = await API.post(`searchprivatestudentbyname`, reqBody).then(
        (res) => {
          const result = res.data;
          if (inputSearch == "") {
            setstudentsbyname("");
          } else {
            setstudentsbyname(result);
          }
        }
      );
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

  useEffect(() => {
    setstudentsbyname("");
    getData();
  }, [inputSearch]);

  const deleteprivStudent = async (id) => {
    const willDeletepriv = await swal({
      title: "???? ?????? ????????????",
      text: "???? ???????? ?????? ????????????????????",
      icon: "warning",
      dangerMode: true,
    });

    if (willDeletepriv) {
      try {
        let res = await API.delete(`deleteSubsbystudentId/${id}`);
        let res1 = await API.delete(`deletePrivatebyStudentId/${id}`);
        let res2 = await API.delete(`deletestudent/${id}`);
        const result = res2.data.message;
        if (res2.data.success && res1.data.success && res.data.success) {
          await swal("???? ????????", result, "success");
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
                    ?????????? <b>????????????</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                {CookieService.get("Role") != "teacher" ? (
                    <Link to="/addstudent" class="btn " data-toggle="modal">
                      <i class="bx bxs-plus-circle bx-burst"></i>
                      <span>?????????? ???????? ????????</span>
                    </Link>
                  ) : (
                    ""
                  )}
                  <input
                    type="text"
                    class="input"
                    name="txt"
                    placeholder='???????? ??????'
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
                  <th>??????????</th>
                  <th>????????????</th>
                  <th>??????????????</th>
                  <th>??????????????</th>
                  <th>?????? ????????????</th>
                  <th>????????????</th>
                  <th>?????????? ??????????</th>
                  <th>????????????????</th>
                  <th>?????????? ??????????????</th>
                </tr>
              </thead>
              <tbody>
                {test > 0 ? (
                  <ViewPrivateStudent
                    studentsbyname={studentsbyname}
                    delete={deleteprivStudent}
                  />
                ) : (
                  PrivStudent.map((st) => (
                    <StudentPrivateCard
                      key={st.id_stud}
                      id={st.id_stud}
                      Firstname={st.FirstName}
                      Lastname={st.LastName}
                      Schoolname={st.SchoolName}
                      Note={st.Note}
                      Code={st.Code}
                      registerdate={st.created_at}
                      Phone={st.Phone}
                      Date={st.Date}
                      delete={deleteprivStudent}
                      status={st.Status}
                      SubsId={st.id_subs}
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
