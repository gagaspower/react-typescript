import { useEffect, useState } from "react";
import { IDataProduct, IProduct } from "../types/Product.types";
import { api } from "../interceptors/api";
import { AxiosError } from "axios";


export const useProduct = () => {
  const [products, setProduct] = useState<IDataProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IProduct>({} as IProduct);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get<IProduct>(
        `/api/product?page=${page}&per_page=${perPage}`
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

  useEffect(() => {
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
    getProduct
  ] as const;
};



export const useDeleteProduct = () => {
  const [isSuccess, setIsSuccess] = useState<string | null>(null)
  const [isError, setIsError] = useState<any | null>(null)
  const deleteProduct = async (id: number) => {
    setIsSuccess(null)
    setIsError(null)
    try {
      await api.delete(`/api/delete-product/${id}`);
      setIsSuccess('Data Berhasil di hapus')
    } catch (err: any) {
      setIsError((err as AxiosError).response?.data)
    }

  }

  return [isSuccess, isError, deleteProduct] as const
}