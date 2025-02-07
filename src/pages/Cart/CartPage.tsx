import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    removeFromCart,
    updateQuantity,
    selectCartItems,
    selectCartTotal
} from '../../store/cart/cartSlice';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto py-12 text-center mt-12">
                <div className="flex flex-col items-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-zinc-300" />
                    <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                    <p className="text-zinc-600">Start shopping to add items to your cart</p>
                    <Button className='bg-purple-600' onClick={() => navigate('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 mt-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <Card key={item.id}>
                            <CardContent className="p-4 flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-zinc-800 truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-purple-600 font-bold mt-1">
                                        ${item.price}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="px-4">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="h-fit">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="w-full bg-purple-600">
                            Proceed to Checkout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CartPage;