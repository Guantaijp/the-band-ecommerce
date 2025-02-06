import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Grid, List } from 'lucide-react';
import { fetchProducts, selectProducts, selectProductLoading } from '../../../store/products/productSlice';
import { AppDispatch,  } from '../../../store/index.ts';

const ProductGrid: React.FC = () => {
    const [viewType, setViewType] = React.useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = React.useState('featured');

    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductLoading);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Parse images from stringified JSON
    const parseImages = (imagesStr: any): any[] => {
        try {
            const parsed = JSON.parse(imagesStr);
            return Array.isArray(parsed) && parsed.length > 0
                ? parsed.map((img: any) => img.replace(/^"|"$/g, ''))
                : [""];
        } catch {
            return [""];
        }
    };


    // Sort and limit products
    const sortedProducts = React.useMemo(() => {
        if (!products) return [];

        let sorted = [...products];
        switch (sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sorted.sort((a, b) =>
                    new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
                );
                break;
        }
        return sorted.slice(0, 8); // Limit to max 6 products
    }, [products, sortBy]);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-zinc-800">Latest Products</h2>

                <div className="flex space-x-4 w-full sm:w-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex space-x-2">
                        <Button
                            variant={viewType === 'grid' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setViewType('grid')}
                            className={viewType === 'grid' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewType === 'list' ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setViewType('list')}
                            className={viewType === 'list' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`grid ${
                viewType === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1'
            } gap-6`}
            >
                {sortedProducts.map(product => (
                    <Card key={product.id} className="group">
                        <CardContent className={`p-4 ${
                            viewType === 'list' ? 'flex items-center space-x-4' : ''
                        }`}>
                            <div className={viewType === 'list' ? 'w-1/4' : 'w-full'}>
                                <img
                                    src={parseImages(product.images)[0] ?? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                                    alt={product.title}
                                    className="rounded-lg w-full h-48 object-cover transition-transform group-hover:scale-105"
                                />

                            </div>
                            <div className={viewType === 'list' ? 'flex-1' : 'mt-3'}>
                                <Badge className="mb-2 bg-purple-100 text-purple-600 hover:bg-purple-100">
                                    {product.category.name}
                                </Badge>
                                <h3 className="font-semibold text-zinc-800">{product.title}</h3>
                                <p className="text-purple-600 font-bold mt-1">${product.price}</p>
                                {viewType === 'list' && (
                                    <p className="text-zinc-600 mt-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
