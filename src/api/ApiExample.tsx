// import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../interceptors/api";

export interface IProductExample {
    id: number;
    product_name: string;
    price: number;
}

export interface IExampleData {
    current_page: number;
    data: IProductExample[];
    total: number;
    last_page: number;
    per_page: number;
}

export type CreateProductType = Pick<IProductExample, 'product_name' | 'price'>

export const getProduct = async () => {
    const { data } = await api.get<IExampleData>("/api/example-data");
    return data;
}

export const addProduct = async (params: CreateProductType) => {
    const { data } = await api.post(`/api/example-data/create`, params)
    return data;

}



