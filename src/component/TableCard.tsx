import React, { useMemo } from "react";
import { IoChevronBack, IoChevronForwardOutline } from "react-icons/io5";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi2";

type TableColumn<T> = {
  key: keyof T;
  label: string;
  formatter?: (item: T) => React.ReactNode;
};

type TData = {
  columns: TableColumn<any>[];
  data: any[];
  per_page: number;
  pagination_data?: any;
  pagination_next?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pagination_prev?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pagination_last?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  pagination_first?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  filter_per_page?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TableCard: React.FC<TData> = ({
  columns,
  data,
  pagination_data,
  pagination_next,
  pagination_prev,
  pagination_first,
  pagination_last,
  filter_per_page,
  per_page,
}) => {
  const perPage_filter = useMemo(() => [10, 20, 50, 100], []);

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => {
                return <th key={String(col.key)}>{col.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr key={item.id}>
                  {columns.map((c) => {
                    return (
                      <td key={String(c.key)}>
                        {c.formatter
                          ? c.formatter(item)
                          : item[c.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination_data ? (
        <div className="d-flex flex-row column-gap-1">
          <div className="d-flex column-gap-1">
            {/* first button */}
            <button type="button"
              className="btn btn-secondary btn-sm d-flex align-items-center"
              onClick={pagination_first}
              disabled={pagination_data?.current_page === 1 ? true : false}
            ><HiChevronDoubleLeft /> First</button>

            {/* prev button */}
            <button type="button"
              className="btn btn-secondary btn-sm d-flex align-items-center"
              onClick={pagination_prev}
              disabled={pagination_data?.current_page === 1 ? true : false}
            ><IoChevronBack /> Prev </button>

            {/* number page info */}
            <span className="d-flex align-items-center px-2 border rounded">
              {pagination_data?.current_page}
            </span>

            {/* next button */}
            <button type="button"
              className="btn btn-secondary btn-sm d-flex align-items-center"
              onClick={pagination_next}
              disabled={
                pagination_data?.last_page === pagination_data?.current_page
                  ? true
                  : false
              }
            >Next <IoChevronForwardOutline /></button>

            {/* last button */}
            <button type="button"
              className="btn btn-secondary btn-sm d-flex align-items-center"
              onClick={pagination_last}
              disabled={
                pagination_data?.last_page === pagination_data?.current_page
                  ? true
                  : false
              }
            >Last <HiChevronDoubleRight /></button>
          </div>

          {/* filter per page */}
          <div className="col-md-1">
            <select
              className="form-select"
              value={per_page}
              onChange={filter_per_page}
            >
              {perPage_filter.map((p) => {
                return (
                  <option value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TableCard;
