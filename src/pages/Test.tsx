import { FC, useState } from "react";
import { useFormik } from 'formik';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LayoutCard from "../component/LayoutCard";
import { IProductExample, addProduct, getProduct } from "../api/ApiExample";
import { useRequestProcessor } from "../interceptors/userRequestProcesor";
import { useQueryClient } from "react-query";
import BtnComponent from "../component/BtnComponent";

const Test: FC = () => {
    const [showModal, setShow] = useState<boolean>(false);
    const { query, mutate } = useRequestProcessor();
    const QueryClient = useQueryClient();

    const { isLoading, data: products } = query("example", getProduct);

    const initialValues: Pick<IProductExample, 'product_name' | 'price'> = {
        product_name: '',
        price: 0
    }

    const formik = useFormik({
        initialValues,
        onSubmit: () => {
            createProduct();
        },
    });

    const { isLoading: isLoadingCreate, mutate: createProduct } = mutate(
        "create-example",
        async () =>
            await addProduct({
                product_name: formik.values.product_name,
                price: formik.values.price
            }),
        {
            onSuccess: () => {
                QueryClient.invalidateQueries("example");
                formik.resetForm({
                    values: {
                        product_name: '',
                        price: 0
                    },
                })
            },
        }
    );



    return (
        <LayoutCard>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-12">
                            {products?.data.map((item: IProductExample) => {
                                return (
                                    <li key={item.id}>
                                        {item.product_name} - {item.price}
                                    </li>
                                );
                            })}
                            <button
                                className="btn btn-primary"
                                onClick={() => setShow(!showModal)}
                            >
                                Tambah Data
                            </button>
                        </div>
                    </div>
                </>
            )}

            <Modal show={showModal} onHide={() => setShow(!showModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="product_name" className="form-label">
                                name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="product_name"
                                id="product_name"
                                value={formik.values.product_name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.product_name ? <div>{formik.errors.product_name}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                harga
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                id="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.price ? <div>{formik.errors.price}</div> : null}
                        </div>
                        <Button variant="secondary" onClick={() => setShow(!showModal)}>
                            Close
                        </Button>
                        <BtnComponent
                            btnLabel="Simpan"
                            btnVariant="primary"
                            btnLoading={isLoadingCreate}
                            btnType="submit"
                        />
                    </form>
                </Modal.Body>

            </Modal>
        </LayoutCard>
    );
};

export default Test;
