import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    // Get categories
    const getCategory = async () => {
        try {
            const { data } = await axiosInstance.get(`/api/v1/category/get-category`);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return { categories, setCategories };
}
