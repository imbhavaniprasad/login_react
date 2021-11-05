import React, { useEffect } from 'react'
import Dashboard from './Dashboard'
import TestOne from './TestOne';
import TestTwo from './TestTwo';
import { Redirect } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"
export default function Dash({ type }) {
    const [user] = useAuthState(auth);
    var displayNum = 0;
    // console.log(type);
    // function checkDisplay() {

    // }
    useEffect(() => {
        if (!user) { return <Redirect to="/" /> }
        else {
            console.log(type);
            switch (type) {
                case "dash":

                    displayNum = 1;
                    break;
                case "one":
                    console.log(type);
                    displayNum = 2;
                    break;
                case "two":
                    console.log(type);
                    displayNum = 3;
                    break;
            }
        }
    }, []);
    return (
        <div>
            {displayNum}
        </div>
    )
}
