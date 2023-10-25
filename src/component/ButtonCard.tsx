import React from 'react'

export interface ButtonCardProps {
    label: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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





