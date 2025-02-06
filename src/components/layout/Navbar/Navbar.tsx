// src/components/layout/Navbar/Navbar.tsx
import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import CartIcon from './CartIcon';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-zinc-200 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-6 w-6 text-purple-600" />
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              The Band
            </span>
                    </div>

                    <div className="hidden md:flex space-x-1">
                        <Button variant="ghost" className="text-zinc-600 hover:text-purple-600">Home</Button>
                        <Button variant="ghost" className="text-zinc-600 hover:text-purple-600">Shop</Button>
                        <Button variant="ghost" className="text-zinc-600 hover:text-purple-600">Categories</Button>
                        <Button variant="ghost" className="text-zinc-600 hover:text-purple-600">Deals</Button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <CartIcon />
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-zinc-200 md:hidden">
                    <div className="container mx-auto px-4 py-2 flex flex-col space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-zinc-600">Home</Button>
                        <Button variant="ghost" className="w-full justify-start text-zinc-600">Shop</Button>
                        <Button variant="ghost" className="w-full justify-start text-zinc-600">Categories</Button>
                        <Button variant="ghost" className="w-full justify-start text-zinc-600">Deals</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;