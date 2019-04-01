import React, { Component } from "react";
import "./style/leaderboard.css";
import {
    Link,
    NavLink,
    BrowserRouter,
    Route,
    withRouter
} from "react-router-dom";
import { Home } from "./Home";
import Cookies from 'universal-cookie';
const config = require('./config.js');
const cookies = new Cookies();

export class Leaderboard extends Component {
    state = {
        username: "",
        password: "",
        redirectState: false,
        table: undefined
    };

    componentDidMount(){
        // Call the logout on the user
        let _this = this;
        fetch(config.BACKEND_URL + '/leaderboard', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(function(data){
            console.log(data.res);
            let leaderboard = data.res;
            let rows = [];
            let inLeaderboard = false;
            rows.push(
                <tr key="header">
                    <th>Rank</th>
                    <th>User</th>
                    <th>Time</th>
                </tr>
            );
            for(let i = 0; i < leaderboard.length; i++){
                if (cookies.get('user') == leaderboard[i].username){
                    console.log();
                    inLeaderboard = true;
                }
                rows.push(
                    <tr key={i} >
                        <td>{i+1}</td>
                        <td>{leaderboard[i].username}</td>
                        <td>{leaderboard[i].time}</td>
                    </tr>
                );
            }
            if (cookies.get('user') != undefined && !inLeaderboard){
                fetch(config.BACKEND_URL + '/leaderboard/personal?username='+cookies.get('user'), {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(function(data){
                    rows.push(
                        <tr className="personal">
                            <td>{data.rank}</td>
                            <td>{data.username}</td>
                            <td>{data.time}</td>
                        </tr>
                    );
                    _this.setState({
                        table: rows
                    })
                });
            } else {
                _this.setState({
                    table: rows
                })
            }
        });
    }

    render() {
        return (
            <div className="leaderboard">
                <div className="title">
                    Best Overall Times
                </div>
                <div className="content">
                    <div className="table-container">
                        <table>
                            <tbody>
                                {this.state.table}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
