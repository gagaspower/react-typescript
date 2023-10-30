import { FC } from 'react'

interface BtnInterface {
    btnLabel: string,
    btnVariant: string,
    btnClick?: () => void;
    btnLoading: boolean,
    btnType: 'submit' | 'button'
}

const BtnComponent: FC<BtnInterface> = ({ btnLabel, btnVariant, btnClick, btnLoading, btnType }) => {
    return (
        <button className={`btn btn-${btnVariant} align-items-center column-gap-1`} type={btnType} disabled={btnLoading ? true : false} onClick={btnClick}>
            {
                btnLoading ?
                    <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </> : <span>{btnLabel}</span>
            }
        </button>
    )
}

export default BtnComponent
