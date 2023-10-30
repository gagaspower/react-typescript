import { FC, ReactNode } from 'react'
import SidebarItem from './SidebarItem'
import { CatAvatar } from '../assets'
import { FiX } from "react-icons/fi";
import { useToggle } from '../hook/useToggle';

type IContent = {
    children?: ReactNode
}

const LayoutCard: FC<IContent> = ({ children }) => {
    const [sidebarActive, _, toggleHandler] = useToggle();

    return (
        <div className='d-flex flex-row position-relative'>
            {/* sidebar */}
            <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="sidebar-brand">
                    <div>
                        <span className='span1'>MR</span>
                        <span className='span2'>Dev</span>
                    </div>
                    {
                        sidebarActive ?
                            <button type='button' className='btn' onClick={toggleHandler}>
                                <FiX size={35} />
                            </button> : null
                    }
                </div>
                <div className="sidebar-item">
                    <SidebarItem />
                </div>
            </aside>

            {/* main content */}
            <main className="d-flex flex-grow-1 flex-column">
                {/* navbar */}
                <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" onClick={toggleHandler}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <button type='button' className='btn border-0 ms-auto'>
                            <img src={CatAvatar} width={35} height={35} alt="navbar avatar" />
                        </button>
                    </div>
                </nav>

                {/* dinamyc content */}
                <section className="content p-4 overflow-hidden">
                    {children}
                </section>
            </main>
        </div>
    )
}

export default LayoutCard
