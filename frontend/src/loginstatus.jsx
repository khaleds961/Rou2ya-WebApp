import CookieService from "./CookieService";
import { useHistory } from "react-router";

export default function LoginStatus() {
  

  let history = useHistory();

  if (!CookieService.get("access_token")) {
    history.push("/");
  } 
      return(
      <>
      </>
      );
  }
