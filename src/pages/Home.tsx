import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableCard from "../component/TableCard";
import { IDataProduct, IProductTHeader } from "../types/Product.types";
import { ButtonDangerCard, ButtonEdit } from "../component/ButtonCard";
import { useDeleteProduct, useProduct } from "../hook/ProductHook";

import LayoutCard from "../component/LayoutCard";

import ModalCard from "../component/ModalCard";

const Home: React.FC = () => {
    const [
        page,
        setPage,
        perPage,
        setPerPage,
        pagination,
        loading,
        products,
        getProduct,
    ] = useProduct();

    const [isSuccess, isError, deleteProduct] = useDeleteProduct();
    const [showModal, setShow] = useState<boolean>(false)


    const column: IProductTHeader[] = useMemo(
        () => [
            {
                label: "Nama Produk",
                key: "product_name",
            },
            {
                label: "Biaya admin",
                key: "product_transaction_admin",
                formatter: (row) => {
                    return numberWithCommas(row.product_transaction_admin);
                },
            },
            {
                label: "Aksi",
                key: "aksi",
                formatter: (row) => {
                    return (
                        <div className="d-flex flex-lg-row flex-column column-gap-lg-2 row-gap-1">
                            <ButtonEdit
                                label="Edit"
                                handleOnClick={(e) => handleClick(e, row)}
                            />
                            <ButtonDangerCard
                                label="Delete"
                                handleOnClick={(e) => handleDelete(e, row.id)}
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        val: IDataProduct
    ) => {
        e.preventDefault();
        alert(JSON.stringify(val));
    };

    const handlePrevClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setPage(page - 1);
        },
        [page]
    );

    const handleNextClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setPage(page + 1);
        },
        [page]
    );

    const handleLastClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setPage(pagination?.last_page);
        },
        [page]
    );

    const handleFirstClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setPage(1);
        },
        [page]
    );

    const handlePerPage = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setPage(1);
            setPerPage(parseInt(e.target.value));
        },
        []
    );

    const numberWithCommas = (x: number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) => {
        e.preventDefault();
        await deleteProduct(id);
    };

    useEffect(() => {
        if (isSuccess) getProduct()
    }, [isSuccess])

    const handleModal = useCallback(() => {
        setShow((prevState) => !prevState)
    }, [])



    return (
        <LayoutCard>
            {loading ? (
                <p>Mohon tunggu ...</p>
            ) : (
                <div className="row container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {isSuccess ? <div className="alert alert-success">{isSuccess}</div> : null}
                            {isError ? <div className="alert alert-danger">{isError}</div> : null}
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-sm btn-info" onClick={handleModal}><span className="text-white">Tambah Produk</span></button>
                            </div>
                            <TableCard
                                columns={column}
                                data={products}
                                per_page={perPage}
                                pagination_data={pagination}
                                pagination_next={handleNextClick}
                                pagination_prev={handlePrevClick}
                                pagination_first={handleFirstClick}
                                pagination_last={handleLastClick}
                                filter_per_page={handlePerPage}
                            />
                        </div>
                    </div>

                    {/* modal */}
                    <ModalCard title="Add Product" handleClose={handleModal} handleCreate={() => console.log('create')} size="lg" show={showModal}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                        </div>
                    </ModalCard>
                </div>
            )}

        </LayoutCard>
    );
};

export default Home;
