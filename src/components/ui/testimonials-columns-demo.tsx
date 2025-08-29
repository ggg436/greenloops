"use client";

import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { useState } from "react";

const testimonials: TestimonialItem[] = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsColumnsDemo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className="bg-background my-20 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg group-hover:border-primary/50 transition-colors duration-300">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 group-hover:text-primary/80 transition-colors duration-300">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75 group-hover:opacity-100 transition-opacity duration-300">See what our customers have to say about us.</p>
        </motion.div>

        {/* Hidden by default, visible on hover */}
        <div 
          className={`flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] overflow-hidden transition-all duration-700 ease-out ${
            isHovered 
              ? 'max-h-[740px] visible opacity-100 scale-100 translate-y-0 pointer-events-auto' 
              : 'max-h-0 invisible opacity-0 scale-75 translate-y-8 pointer-events-none'
          }`}
          style={{
            filter: isHovered ? 'none' : 'blur(3px)',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} isVisible={isHovered} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} isVisible={isHovered} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} isVisible={isHovered} />
        </div>

        {/* Hover hint - visible when sliders are hidden */}
        <div className="text-center mt-10 opacity-75 group-hover:opacity-0 transition-all duration-500 pointer-events-none group-hover:translate-y-2">
          <p className="text-lg text-muted-foreground">Hover to see testimonials</p>
        </div>
      </div>
    </section>
  );
} 