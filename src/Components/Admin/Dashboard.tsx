import React from 'react';
import AdminLayout from "../../Hoc/AdminLayout";
import { useNavigate } from 'react-router-dom';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Dashboard" navigate={navigate}> //ayyagen ahanna methana theren na
      <div className="user_dashboard">
        <div>
          This is your dashboard
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
