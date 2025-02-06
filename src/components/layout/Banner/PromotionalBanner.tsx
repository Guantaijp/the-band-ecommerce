// src/components/layout/Banner/PromotionalBanner.tsx
import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import FeaturedProducts from './FeaturedProducts';

const PromotionalBanner = () => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-purple-400 to-indigo-600 p-0.5">
            <Card className="bg-white/95">
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 px-4 py-1">
                                Limited Time Offer
                            </Badge>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                                Summer Collection 2024
                            </h1>
                            <p className="text-zinc-600 text-lg">
                                Get up to 40% off on our latest collection of premium audio gear
                            </p>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                Shop Now
                            </Button>
                        </div>
                        <FeaturedProducts />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PromotionalBanner;