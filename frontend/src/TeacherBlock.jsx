import { useHistory } from "react-router";
import CookieService from "./CookieService";


import React from 'react'

export default function TeacherBlock() {
    let history = useHistory();

    if(CookieService.get('Role')!='admin'){
        history.push('/homepage');
    }
    return(
        <>
        </>
    )
}

