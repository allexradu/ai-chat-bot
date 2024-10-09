import { createContext, ReactNode, useContext } from 'react'
import chatStore from '@/data/stores/chat.store'

const store = {
    chatStore,
}

const StoreContext = createContext(store)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext)
