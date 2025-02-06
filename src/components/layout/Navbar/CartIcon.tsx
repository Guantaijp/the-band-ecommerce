import { ShoppingCart } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {useSelector} from "react-redux";
import {selectCartCount} from "../../../store/cart/cartSlice.ts";

const CartIcon = () => {
    const total = useSelector(selectCartCount);
    return (
        <Button variant="ghost" className="relative">
            <ShoppingCart className="h-5 w-5 text-zinc-600" />
            <Badge
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-purple-600 hover:bg-purple-700"
            >
                {total}
            </Badge>
        </Button>
    );
};

export default CartIcon;