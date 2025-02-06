
import { Card, CardContent } from "../../components/ui/card";
import { Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    rating: number;
    review: string;
    image: string;
}

const TestimonialCard = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Music Producer",
            rating: 5,
            review: "The quality of audio equipment from The Band is exceptional. Best investment I've made for my studio this year.",
            image: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Professional DJ",
            rating: 5,
            review: "Outstanding sound clarity and build quality. Their customer service is top-notch. Highly recommended!",
            image: "data:image/jpeg;base64,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"
        },
        {
            id: 3,
            name: "Emily Watson",
            role: "Audio Engineer",
            rating: 4,
            review: "Great selection of professional audio gear. The prices are competitive and the quality is consistent.",
            image: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
        }
    ];

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-zinc-800 mb-2">
                What Our Customers Say
            </h2>
            <p className="text-center text-zinc-600 mb-12 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their audio equipment needs
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-zinc-800">{testimonial.name}</h3>
                                    <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex space-x-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < testimonial.rating
                                                ? "fill-purple-600 text-purple-600"
                                                : "fill-zinc-200 text-zinc-200"
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="text-zinc-600 leading-relaxed">{testimonial.review}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TestimonialCard;