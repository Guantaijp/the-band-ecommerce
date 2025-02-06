import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addToCart,
    removeFromCart,
    selectCartItems
} from '../../../store/cart/cartSlice.ts';
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from "../../../hooks/use-toast.ts";

interface ProductCardProps {
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        images: string[];
        category: { name: string };
    };
    viewType?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product }:any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    // Parse images safely
    const parseImages = (imagesStr: string) => {
        try {
            const parsed = JSON.parse(imagesStr);
            return parsed.map((img: string) => img.replace(/^"|"$/g, ''))[0];
        } catch {
            return 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
        }
    };

    // Check if product is in cart
    const isInCart = cartItems.some(item => item.id === product.id);

    const handleProductClick = () => {
        // Add product to cart before navigating
        if (!isInCart) {
            dispatch(addToCart({
                ...product,
                quantity: 1,
                image: parseImages(product.images)
            }));
        }

        navigate(`/products/${product.id}`);
    };


    const handleCartAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart({
                ...product,
                quantity: 1,
                image: parseImages(product.images)
            }));
            toast({
                title: "Added to Cart",
                description: `${product.title} added to your cart`,
                duration: 2000,
                style: {
                    border: "2px solid green", // ✅ Adds green border
                    backgroundColor: "#f0fff4", // Light green background
                    color: "#2f855a", // Dark green text
                }
            });
        }

    };

    return (
        <Card
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleProductClick}
        >
            <CardContent className="p-4 relative">
                <div className="relative mb-4">
                    <img
                        src={parseImages(product.images)}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-purple-600">
                        {product.category.name}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-800 line-clamp-2">
                        {product.title}
                    </h3>
                    <div className="flex justify-between items-center">
                        <span className="text-purple-600 font-bold">
                            ${product.price}
                        </span>
                        <Button
                            variant={isInCart ? 'destructive' : 'default'}
                            size="icon"
                            className="w-8 h-8"
                            onClick={handleCartAction}
                        >
                            {isInCart ? <Trash2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;