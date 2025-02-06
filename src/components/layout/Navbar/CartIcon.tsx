// src/components/layout/Navbar/CartIcon.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

const CartIcon = () => {
    const [count, ] = React.useState(3);

    return (
        <Button variant="ghost" className="relative">
            <ShoppingCart className="h-5 w-5 text-zinc-600" />
            <Badge
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-purple-600 hover:bg-purple-700"
            >
                {count}
            </Badge>
        </Button>
    );
};

export default CartIcon;