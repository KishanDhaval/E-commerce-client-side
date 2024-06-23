import { useState , useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function useCategory() {
    const [categories , setCategories] = useState([])

    // get cat
    const getCategory = async()=>{
        try {
            const {data} = await axios.get(`${apiUrl}/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategory()
    },[])

    return {categories , setCategories}
}