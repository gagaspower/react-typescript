import React, { useMemo } from 'react'
import { IDataProduct, IProduct, IProductTHeader } from '../types/Product.types'
import { ButtonPagination } from './ButtonCard'


type TData = {
    columns: IProductTHeader[],
    data: IDataProduct[],
    per_page: number,
    pagination_data?: IProduct
    pagination_next?: string | any,
    pagination_prev?: string | any,
    pagination_last?: string | any,
    pagination_first?: string | any,
    filter_per_page?: string | any
}

const TableCard: React.FC<TData> = ({ columns, data, pagination_data, pagination_next, pagination_prev, pagination_first, pagination_last, filter_per_page, per_page }) => {

    const perPage_filter = useMemo(() =>
        [
            10, 20, 50, 100
        ], [])


    return (
        <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr>
                        {
                            columns.map((col) => {
                                return (
                                    <th key={col.key}>{col.label}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item) => {
                            return (
                                <tr key={item.id}>
                                    {
                                        columns.map((c) => {
                                            return (
                                                <td key={c.key}>{c.formatter ? c.formatter(item) : item[c.key as keyof IDataProduct]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                pagination_data ?
                    <div className='d-flex flex-row column-gap-1'>
                        <div className='d-flex column-gap-1'>
                            <ButtonPagination label="First" handleClick={pagination_first} disabled={pagination_data?.current_page === 1 ? true : false} />
                            <ButtonPagination label="Prev" handleClick={pagination_prev} disabled={pagination_data?.current_page === 1 ? true : false} />
                            <span className='d-flex align-items-center px-2 border rounded'>{pagination_data?.current_page}</span>
                            <ButtonPagination label="Next" handleClick={pagination_next} disabled={pagination_data?.last_page === pagination_data?.current_page ? true : false} />
                            <ButtonPagination label="Last" handleClick={pagination_last} disabled={pagination_data?.last_page === pagination_data?.current_page ? true : false} />
                        </div>
                        <div className="col-md-1">
                            <select className="form-select" value={per_page} onChange={filter_per_page}>
                                {
                                    perPage_filter.map((p) => {
                                        return (
                                            <option value={p} key={p}>{p}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </div>

                    : null
            }
        </div>
    )
}

export default TableCard
