import axios from "axios";
import { useEffect, useState } from "react";
import { IDataProduct, IProduct } from "../types/Product.types";

export const useProduct = () => {
    const [products, setProduct] = useState<IDataProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<IProduct>({} as IProduct);
    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get<IProduct>(
                    `http://localhost:8000/api/product?page=${page}&per_page=${perPage}`
                );
                setProduct(response?.data?.data);
                setPagination(response?.data);
                setPage(response?.data?.current_page);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("error : ", error);
            }
        };

        getProduct();
    }, [page, perPage]);

    return [
        page,
        setPage,
        perPage,
        setPerPage,
        pagination,
        loading,
        products,
    ] as const;
};
