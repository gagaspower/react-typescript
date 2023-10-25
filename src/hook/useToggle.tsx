import { useCallback, useState } from 'react'

export const useToggle = () => {
    const [sidebarActive, setSidebarActive] = useState<boolean>(false)

    const toggleHandler = useCallback(() => setSidebarActive(prevState => !prevState), [])

    return [sidebarActive, setSidebarActive, toggleHandler] as const

}


