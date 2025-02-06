import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectProductLoading } from '../..//store/products/productSlice';
import { fetchCategories, selectCategories } from '../../store/categories/categorySlice';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import { Grid, List, Loader2 } from 'lucide-react';
import ProductCard from '../../components/products/ProductCard/ProductCard.tsx';
import {Toaster} from "../../components/ui/toaster.tsx";
import {AppDispatch} from "../../store";

const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const categories = useSelector(selectCategories);
    const loading = useSelector(selectProductLoading);

    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category.id.toString() === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 mt-8">
            <Toaster />
            <div className="flex flex-col space-y-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="col-span-2">
                                <label className="text-sm text-zinc-500">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                                <Slider
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                    min={0}
                                    max={1000}
                                    step={10}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-2">
                    <Button
                        variant={viewType === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewType('grid')}
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewType === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewType('list')}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>

                <div className={`grid ${
                    viewType === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                        : 'grid-cols-1'
                } gap-6`}>
                    {sortedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            viewType={viewType}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;