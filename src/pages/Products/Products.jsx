import React from "react";
import CardGetData from "../../elements/Card/CardGetData";
import CardDataTable from "../../elements/Card/CardDataTable";

export default function Products() {
    return (
        <div className="container-general">
            <h2>Products</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardGetData />
                <CardGetData />
                <CardGetData />
            </div>
            <div style={{ padding: "100px 0" }}>
                <CardDataTable />
            </div>
        </div>
    );
}
