import React from 'react'

interface ButtonCardProps {
    label: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


interface ButtonPaginationProps extends React.ComponentPropsWithoutRef<"button"> {
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    label: string,
}

export const ButtonEdit: React.FC<ButtonCardProps> = ({ label, handleOnClick }) => {
    return (
        <button className="btn btn-primary btn-sm" onClick={handleOnClick}>{label}</button>
    )
}

export const ButtonDangerCard: React.FC<ButtonCardProps> = ({ label, handleOnClick }) => {
    return (
        <button className='btn btn-danger btn-sm' onClick={handleOnClick}>{label}</button>
    )
}


export const ButtonPagination: React.FC<ButtonPaginationProps> = (props) => {
    const { handleClick, label, ...rest } = props;
    return (
        <button className='btn btn-secondary btn-sm' onClick={handleClick} {...rest}>{label}</button>
    )
}


