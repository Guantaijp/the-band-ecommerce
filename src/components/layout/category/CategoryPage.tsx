import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/index.ts';
import {
    fetchCategories,
    selectCategories,
    selectCategoriesLoading,
} from '../../../store/categories/categorySlice';

const CategoryPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoriesLoading);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    //
    // const handleCreateCategory = async () => {
    //     const newCategory = {
    //         name: "New Category",
    //         image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    //     };
    //     await dispatch(createCategory(newCategory));
    // };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-12">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                {/*<button*/}
                {/*    onClick={handleCreateCategory}*/}
                {/*    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"*/}
                {/*>*/}
                {/*    Add Category*/}
                {/*</button>*/}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="border rounded-lg overflow-hidden shadow-lg"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{category.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;