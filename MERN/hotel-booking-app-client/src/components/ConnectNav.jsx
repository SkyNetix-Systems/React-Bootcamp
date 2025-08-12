import React from "react";
import { Card, Avatar } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const { Meta } = Card;

const ConnectNav = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const user = auth?.user;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "20px",
                gap: "12px",
            }}
        >
            <Card
                style={{
                    width: 300,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
            >
                <Meta
                    avatar={<Avatar>{user.name[0]}</Avatar>}
                    title={user.name}
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && (
                <>
                    <div>💰 Pending balance</div>
                    <div>⚙️ Payout settings</div>
                </>
            )}
        </div>
    );
};

export default ConnectNav;
