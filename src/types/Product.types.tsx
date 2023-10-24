import React from "react";

export interface IDataProduct {
    id: number,
    product_name: string,
    product_transaction_admin: number
}

export interface IProduct {
    current_page: number,
    data: IDataProduct[],
    last_page: number,
    per_page: number,
    total: number
}

export type IProductTHeader = {
    label: string,
    key: string,
    formatter?: (row: IDataProduct) => React.ReactNode;
}