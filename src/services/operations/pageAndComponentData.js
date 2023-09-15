import React from 'react'
import { toast } from 'react-hot-toast';
import {apiConnector} from "../apiconnector"
import { catalogData } from '../apis';
const getCatalogPageData =async (categoryId) => {
    const toastId=toast.loading("Loading ....")
    let result =[];
    try {
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId})

        if(!response?.data?.success)
        throw new Error("Could Not Fetch Categpry Page Data")

      result=response?.data;

    } catch (error) {
        console.log("Catalog Page API ERROR",error)
        toast.error(error.message)
        result=error.response?.data
    }
    toast.dismiss(toastId)
    return result
}

export default pageAndComponentData