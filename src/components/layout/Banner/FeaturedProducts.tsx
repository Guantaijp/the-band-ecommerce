import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { fetchProducts, selectProducts } from '../../../store/products/productSlice';
import { AppDispatch } from '../../../store/index.ts';

const FeaturedProducts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Randomly select 2 featured products
    const featuredProducts = React.useMemo(() => {
        if (!products || products.length < 2) return [];

        // Create a mutable copy and shuffle
        const shuffled = [...products].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, 2).map(product => {
            // Parse images safely
            const images = product.images ?
                JSON.parse(product.images).map((img: string) => img.replace(/^"|"$/g, ''))
                : [];

            return {
                id: product.id,
                name: product.title,
                price: product.price,
                discount: Math.floor(Math.random() * 30), // Random discount between 0-30%
                image: images[0] || '/api/placeholder/300/300'
            };
        });
    }, [products]);

    return (
        <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden group">
                    <CardContent className="p-4 space-y-3">
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-lg w-full h-48 object-cover transition-transform group-hover:scale-105"
                            />
                            <Badge className="absolute top-2 right-2 bg-purple-600">
                                {product.discount}% OFF
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-zinc-800">{product.name}</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-purple-600 font-bold">
                                ${(product.price * (1 - product.discount/100)).toFixed(2)}
                            </span>
                            <span className="text-zinc-400 line-through text-sm">
                                ${product.price}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default FeaturedProducts;