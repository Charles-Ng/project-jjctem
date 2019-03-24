import React, { Component } from "react";
import { Link, NavLink, withRouter, BrowserRouter } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
        <p>
            Created by JJC (<a href="https://github.com/chongjo3" target="_blank">Joshua Chong</a>, <a href="http://julesyan.com/" target="_blank">Julia Yan</a>, <a href="https://github.com/Charles-Ng" target="_blank">Charles Ng</a>) for <a href="https://thierrysans.me/CSCC09/" target="_blank">CSCC09</a>
        </p>
        <p>
            Any similarities to the <a href="http://www.libertymedia.com/companies/formula-one-group.html" target="_blank">Formula One Group's</a> <a href="https://www.formula1.com/" target="_blank">Formula 1</a>, <a href="http://www.fiaformula2.com/" target="_blank">Formula 2</a>, or <a href="http://www.fiaformula3.com/" target="_blank">Formula 3</a> are completely for humor and educational purposes.
        </p>
        <div className="links">
            <NavLink to={"/signin"} activeClassName="selected"><span>Sign In</span></NavLink>
            <NavLink to={"/signup"} activeClassName="selected"><span>Sign Up</span></NavLink>
        </div>
    </div>
  );
};
