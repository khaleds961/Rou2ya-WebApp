import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import CookieService from "../../CookieService";
import swal from "sweetalert";
import './login.css'
import Pic from '../SideNav/logo.png'

export default function Login(props) {
  const [Password, setPassword] = useState();
  const [Username, setUsername] = useState();
  const [Role, setRole] = useState();
  const [Users, setUsers] = useState();

  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axios

      .get(`http://localhost:8000/api/getusers`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Submit = async (e) => {
    e.preventDefault();

    let body = new FormData();
    let username1 = Username;
    let password1 = Password;

    body.append("username", username1);
    body.append("password", password1);

    console.log("test of login body");
    console.log(body);

    try {
      let res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "post",
        body,
      });
      let result = await res.json();
      console.log(result);

      if (result.access_token) {
        const options = { path: "/" };
        CookieService.set("access_token", result.access_token, options);
        CookieService.set("Role", result.data.role, options);
        CookieService.set("UserName", result.data.username, options);
        history.push("/HomePage");
        console.log(result);
      } else {
        // swal(" !! اسم المستخدم او كلمة المرور غير صحيحة ",'warning');
        swal(" اسم المستخدم او كلمة المرور غير صحيحة ", "", "warning");

      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
        <form  onSubmit={Submit} className='try'>
          <img src={Pic} style={{width:'150px',margin:'auto'}}></img>
          <h4>مركز رؤية للعلوم الشرعية</h4>
          <input
            type="text"
            style={{ display: "block",marginTop:'1rem' }}
            placeholder="اسم المستخدم"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={{ display: "block" }}
            type="password"
            placeholder="  كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input type="submit" value="تسجيل الدخول" style={{ display: "block" }} />
        </form>
    </>
  );
}
