import React, { FC, useMemo } from 'react'
import { BiAtom, BiCustomize, BiData, BiSolidCart, BiLineChart, BiLogInCircle } from "react-icons/bi";

type TSidebar = {
    key: string,
    path?: string,
    label: string,
    icon?: React.ReactNode
}



const SidebarItem: FC = () => {

    const sidebarList: TSidebar[] = useMemo(() =>
        [
            {
                key: 'dashboard',
                path: '/#',
                label: 'Dashboard',
                icon: <BiCustomize size={20} />
            },
            {
                key: 'setting',
                path: '/#',
                label: 'Setting',
                icon: <BiAtom size={20} />
            },
            {
                key: 'master',
                path: '/#',
                label: 'Master',
                icon: <BiData size={20} />
            },
            {
                key: 'transaksi',
                path: '/#',
                label: 'Transaksi',
                icon: <BiSolidCart size={20} />
            },
            {
                key: 'report',
                path: '/#',
                label: 'Report',
                icon: <BiLineChart size={20} />
            },
            {
                key: 'signout',
                path: '/#',
                label: 'Sign Out',
                icon: <BiLogInCircle size={20} />
            }
        ]
        , [])

    return (
        <>
            {
                sidebarList.map((list) => {
                    return (
                        <li key={list.key}>
                            <a href="/#">
                                <span>
                                    {list.icon}
                                    {list.label}
                                </span>
                            </a>
                        </li>
                    )
                })
            }
        </>
    )
}




export default SidebarItem
