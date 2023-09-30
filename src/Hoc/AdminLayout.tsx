import React from 'react';
import AdminNav from "../Components/Admin/nav/AdminNav";
import { NavigateFunction } from 'react-router-dom';

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
    navigate: NavigateFunction;
}

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
    console.log(props);
    return (
        <div className="admin_container">
            <div className="admin_left_nav">
                <AdminNav navigate={props.navigate} />
            </div>
            <div className="admin_right">
                <h2>{props.title}</h2>
                {props.children}
            </div>
        </div>
    );
}

export default AdminLayout;
