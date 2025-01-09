import { createContext, useEffect, useState } from "react";
import { readCategories } from "../utility/crudUtility";
import React from 'react'


export const CategContext=createContext()

export const CategProvider=({children})=>{
    const [categories,setCategories]=useState(null)

    useEffect(()=>{
        readCategories(setCategories)
    },[])

    return(
        <CategContext.Provider value={{categories}}>
            {children}
        </CategContext.Provider>
    )
}