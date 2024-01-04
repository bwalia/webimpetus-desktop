import React, { useEffect, useState } from 'react';
import dataProvider from '../dataProvider';

const DashboardHeader = () => {
    const [empName, setEmpName] = useState('');
    const [taskStatus, setTaskStatus] = useState({assigned: 0, inReview: 0, completed: 0});
    const userString = localStorage.getItem('user') || "";
    useEffect(() => {
        let token = "", businessId = "", empId = "";
        if (userString) {
            const userObj = JSON.parse(userString);
            token = userObj.access_token;
            businessId = userObj.user.uuid_business_id;
            empId = userObj.user.id;
            setEmpName(userObj.user.first_name);
        } else {
            Promise.reject("Something went wrong! Please login again");
        }
    }, [userString]);
    useEffect(() => {
            dataProvider.getList("tasks-status", {
                pagination: {page: 1, perPage: 1000},
                sort: {field: "name", order: 'ASC'},
                filter: {}
            }).then((taskStatus: any) => {
                console.log({taskStatus});
                setTaskStatus(taskStatus?.data);
            });
    }, [])
    return (
        <div className="main-header">
            <div className="main-header__intro-wrapper">
                <div className="main-header__welcome">
                    <div className="main-header__welcome-title text-light">Welcome, <strong>{empName}</strong></div>
                    <div className="main-header__welcome-subtitle text-light">How are you today?</div>
                </div>
                <div className="quickview">
                    <div className="quickview__item">
                        <div className="quickview__item-total">{taskStatus?.assigned}</div>
                        <div className="quickview__item-description">
                            <i className="far fa-calendar-alt"></i>
                            <span className="text-light">Assigned Tasks</span>
                        </div>
                    </div>
                    <div className="quickview__item">
                        <div className="quickview__item-total">{taskStatus?.inReview}</div>
                        <div className="quickview__item-description">
                            <i className="far fa-comment"></i>
                            <span className="text-light">In Review Tasks</span>
                        </div>
                    </div>
                    <div className="quickview__item">
                        <div className="quickview__item-total">{taskStatus?.completed}</div>
                        <div className="quickview__item-description">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="text-light">Completed Tasks</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader