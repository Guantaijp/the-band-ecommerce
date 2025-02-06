import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

const Footer = () => {
    return (
        <footer className="bg-zinc-50 pt-16 pb-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-zinc-800">About The Band</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Premium audio equipment for professionals and enthusiasts. Delivering quality since 2010.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-purple-600">
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-zinc-800">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About Us', 'Products', 'Testimonials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Button variant="link" className="p-0 h-auto text-zinc-600 hover:text-purple-600">
                                        {item}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-zinc-800">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-zinc-600">
                                <Mail className="h-5 w-5 text-purple-600" />
                                <span>info@theband.co.ke</span>
                            </li>
                            <li className="flex items-center space-x-3 text-zinc-600">
                                <Phone className="h-5 w-5 text-purple-600" />
                                <span>(254) 115-767-696</span>
                            </li>
                            <li className="flex items-center space-x-3 text-zinc-600">
                                <MapPin className="h-5 w-5 text-purple-600" />
                                <span>Nairobi, Kenya</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-zinc-800">Business Hours</h3>
                        <ul className="space-y-2 text-zinc-600">
                            <li>Monday - Friday: 9am - 6pm</li>
                            <li>Saturday: 10am - 4pm</li>
                            <li>Sunday: Closed</li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="text-center text-zinc-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} The Band. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;