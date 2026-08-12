"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";


type CatalogContextType = {
    openIds: number[];
    toggleCategory: (id:number)=>void;
};


const CatalogContext =
    createContext<CatalogContextType | null>(null);

export function CatalogProvider({
                                    children
                                }:{
    children:ReactNode
}) {

    const [openIds,setOpenIds] =
        useState<number[]>([]);

    function toggleCategory(id:number){
        setOpenIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev,id]
        );
    }

    return (
        <CatalogContext.Provider
            value={{
                openIds,
                toggleCategory
            }}
        >
            {children}
        </CatalogContext.Provider>
    );
}



export function useCatalog(){

    const context =
        useContext(CatalogContext);


    if(!context){
        throw new Error(
            "useCatalog must be inside CatalogProvider"
        );
    }


    return context;
}