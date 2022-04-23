import NavigationSidebar from '../NavigationSidebar';
import TOS from '../TOS';
import React from "react";

const More = () => {

    return (
        <div className="row mt-2">
            <div className="col-2 col-md-4 col-lg-3 col-xl-2">
                <NavigationSidebar active="more"/>
            </div>
            <div className="col-10 col-md-8 col-lg-9 col-xl-10">
                <TOS/>
            </div>
        </div>
    );
};
export default More;