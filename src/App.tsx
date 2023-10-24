import React, { useCallback, useMemo } from "react";
import TableCard from "./component/TableCard";
import { IDataProduct, IProductTHeader } from "./types/Product.types";
import { ButtonDangerCard, ButtonEdit } from "./component/ButtonCard";
import { useProduct } from "./hook/ProductHook";

const App: React.FC = () => {
  const [page, setPage, perPage, setPerPage, pagination, loading, products] =
    useProduct();

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
            <div className="d-flex column-gap-2">
              <ButtonEdit
                label="Edit"
                handleOnClick={(e) => handleClick(e, row)}
              />
              <ButtonDangerCard
                label="Delete"
                handleOnClick={(e) => handleClick(e, row)}
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
      setPage(page - Number(1));
    },
    [page]
  );

  const handleNextClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setPage(page + Number(1));
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
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      setPage(1);
      setPerPage(Number(e.currentTarget.value));
    },
    []
  );

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      {loading ? (
        <p>Mohon tunggu ...</p>
      ) : (
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
      )}
    </>
  );
};

export default App;
