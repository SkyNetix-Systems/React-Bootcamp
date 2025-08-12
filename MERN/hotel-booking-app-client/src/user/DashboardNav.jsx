import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardNav = () => {
    const location = useLocation();
    const active = location.pathname;
    console.log("Active: ", active);

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link
                    className={`nav-link ${active === '/dashboard' ? 'active' : ''}`}
                    to="/dashboard"
                >
                    Your Bookings
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link ${active === '/dashboard/seller' ? 'active' : ''}`}
                    to="/dashboard/seller"
                >
                    Your Hotels
                </Link>
            </li>
        </ul>
    );
};

export default DashboardNav;
