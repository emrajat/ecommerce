import { createContext,useEffect,useState } from "react";
import SHOP_DATA from '../shop-data'
// import {addCollectionAndDocuments} from '../utils/firebase/firebase.utils' 
import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap:[]
})

export const CategoriesProvider = ({children}) => {

        // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[])


    const [categoriesMap,setCategoriesMap] = useState({})

    useEffect(()=>{

        const getCategroiesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
            console.log(categoryMap)
        }
        getCategroiesMap()
    },[])
    const value = {categoriesMap} 
    return (
    <CategoriesContext.Provider value = {value}>
            { children}
    </CategoriesContext.Provider>
    )
}