import React from "react";
import {Navigate, Route} from "react-router-dom";


const ProtectedRoute = ({component: Component, ...props}) => {
    return  props.loggedIn ? (
        <Component {...props} />
    ) : (
        <Navigate to="/sign-in" replace />
    );
};

export default ProtectedRoute;
