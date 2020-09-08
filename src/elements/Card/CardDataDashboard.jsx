import React from "react";
import Card from "./Card";

export default function CardDataDashboard() {
    return (
        <Card
            isNormal
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 20px 20px 20px",
            }}
        >
            <div>image</div>
            <div>Tulisan Link</div>
            <div>
                <div>0</div>
                <div>Orders</div>
            </div>
            <div>
                <div>0</div>
                <div>paid</div>
            </div>
            <div>
                <div>0</div>
                <div>Paid Ratio</div>
            </div>
            <div>
                <div>0</div>
                <div>Orders</div>
            </div>
        </Card>
    );
}
