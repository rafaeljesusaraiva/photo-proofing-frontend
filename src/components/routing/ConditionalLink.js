import React from "react";
import { Link } from "react-router-dom";

export const ConditionalLink = ({ children, to, valid }) => 
    (!!valid && to)
      ? <Link to={to}>{children}</Link>
      : <>{children}</>;