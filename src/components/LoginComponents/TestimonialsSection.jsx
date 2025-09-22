import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../loginUtils/motion";

const testimonials = [
    {
        id: 1,
        name: "Alice Thompson", 
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "The IDP System helped me clearly track my skill gaps and growth progress. My manager and mentor can now provide focused guidance.",
    },
    {
        id: 2,
        name: "David Lee",
        image: "https://randomuser.me/api/portraits/men/42.jpg", 
        text: "Assigning learning activities and tracking performance has never been easier. The platform keeps our team motivated and on track.",
    },
    {
        id: 3,
        name: "Priya Sharma",
        image: "https://randomuser.me/api/portraits/women/30.jpg",
        text: "With personalized IDPs, I know exactly what to focus on to achieve my career goals. Mentorship sessions are now more structured and productive.",
    },
    {
        id: 4,
        name: "Rahul Verma",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        text: "The analytics and reports give our HR team valuable insights into team development. It’s streamlined the entire process of employee growth.",
    },
    {
        id: 5,
        name: "Neha Gupta",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
        text: "I can easily track my tasks and progress within the platform. Notifications ensure I never miss a mentorship session or activity deadline.",
    },
    {
        id: 6,
        name: "Arjun Singh",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
        text: "The IDP System has made it simple to align individual development plans with organizational goals. The interface is intuitive and interactive.",
    },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div 
            variants={fadeIn('up', 0.3)}
            className="text-center mb-12"
        >
            <motion.h2 
            variants={textVariant(0.2)}
            className="text-3xl md:text-4xl font-bold mb-4"
            >
            What our users say
            </motion.h2>
            <motion.p 
            variants={fadeIn('up', 0.4)}
            className="text-gray-600"
            >
            See how IDP System empowers employees, mentors, and HR to achieve growth goals.
            </motion.p>
        </motion.div>

        <motion.div 
            variants={fadeIn('up', 0.5)}
            className="relative"
        >
            <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
                0: {
                slidesPerView: 1,
                },
                768: {
                slidesPerView: 2,
                },
                1024: {
                slidesPerView: 3,
                },
            }}
            className="testimonials-swiper md:mb-12"
            >
            {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
                <motion.div 
                    variants={fadeIn('up', 0.3 * (index + 1))}
                    className="text-center bg-white p-4 rounded-lg shadow-md h-full flex flex-col"
                >
                    <motion.div 
                    variants={fadeIn('down', 0.4 * (index + 1))}
                    className="w-24 h-24 mx-auto mb-4"
                    >
                    <motion.img
                        variants={fadeIn('up', 0.5 * (index + 1))}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                    </motion.div>
                    <motion.div 
                    variants={fadeIn('up', 0.4 * (index + 1))}
                    className="flex justify-center mb-2"
                    >
                    {[...Array(5)].map((_, starIndex) => (
                        <motion.span 
                        key={starIndex} 
                        variants={fadeIn('up', 0.1 * starIndex)}
                        className="text-blue-600"
                        >
                        ★
                        </motion.span>
                    ))}
                    </motion.div>
                    <motion.h3 
                    variants={textVariant(0.3)}
                    className="font-semibold text-xl mb-3"
                    >
                    {testimonial.name}
                    </motion.h3>
                    <motion.p 
                    variants={fadeIn('up', 0.6 * (index + 1))}
                    className="text-gray-600"
                    >
                    {testimonial.text}
                    </motion.p>
                </motion.div>
                </SwiperSlide>
            ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <motion.div 
            variants={fadeIn('up', 0.7)}
            className="flex justify-center gap-4 mt-8"
            >
            <motion.button 
                variants={fadeIn('right', 0.8)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
            >
                <BsChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button 
                variants={fadeIn('left', 0.8)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
            >
                <BsChevronRight className="w-6 h-6" />
            </motion.button>
            </motion.div>

        </motion.div>
        </section>
    );
};

export default TestimonialsSection;
