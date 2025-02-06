import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, selectSelectedProduct } from '../../../store/products/productSlice';
import { addToCart } from '../../../store/cart/cartSlice';
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { ShoppingCart } from 'lucide-react';
import { toast } from "../../../hooks/use-toast.ts";
import {Toaster} from "../../../components/ui/toaster.tsx";
import {AppDispatch} from "@/store";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const product = useSelector(selectSelectedProduct);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProduct(parseInt(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product && Array.isArray(product.images) && product.images.length > 0) {
            setSelectedImage(product.images[0]); // ✅ Correct: No need to parse
        }
    }, [product]);

    if (!product) return <div>Loading...</div>;

    const images = Array.isArray(product.images) ? product.images : [];



    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            image: selectedImage
        }));
        toast({
            title: "Added to Cart",
            description: `${quantity} x ${product.title} added to your cart`,
            duration: 2000,
            style: {
                border: "2px solid green", // ✅ Adds green border
                backgroundColor: "#f0fff4", // Light green background
                color: "#2f855a", // Dark green text
            }
        });

    };

    return (
        <>
            <Toaster/>
        <div className="container mx-auto py-12 grid md:grid-cols-2 gap-12 mt-8">

            <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="w-full h-[500px] object-cover"
                    />
                </div>
                <div className="flex space-x-2">
                    {images.map((img: string, index: number) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.title} thumbnail ${index + 1}`}
                            className={`w-20 h-20 object-cover cursor-pointer border-2 ${
                                selectedImage === img ? 'border-purple-600' : 'border-transparent'
                            }`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div>
                        <Badge className="mb-2 bg-purple-100 text-purple-600">
                            {product.category.name}
                        </Badge>
                        <h1 className="text-3xl font-bold text-zinc-800 mb-2">
                            {product.title}
                        </h1>
                        <p className="text-zinc-600 mb-4">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-purple-600">
                            ${product.price}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </Button>
                            <span className="px-4">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            onClick={handleAddToCart}
                            className="flex-1"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        </>
    );
};

export default ProductDetail;