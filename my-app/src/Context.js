import React from "react"

const Context = React.createContext()
/**
 * TODO
 * Add edge removal DONE
 * Add error messages/validation checking DONE  
 * Format flow chart DONE
 * Add download JSON feature and upload JSON featurek,m
 */    

function ContextProvider({ children }) {
    const [page, setPage] = React.useState("Home")


 
    return (
        <Context.Provider value={{
            page,setPage

        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }