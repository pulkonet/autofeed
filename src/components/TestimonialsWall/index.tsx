import styles from './TestimonialsWall.module.css';

type Testimonial = {
    quote: string;
    author: string;
    role: string;
    company: string;
};

const testimonials = [
    {
        quote: "AutoFeeder has completely transformed how I consume online content. The summaries are spot-on!",
        author: "Sarah Chen",
        role: "Software Engineer",
        company: "TechCorp"
    },
    {
        quote: "The weekly digests are perfectly timed and help me stay on top of my reading list.",
        author: "Michael Rodriguez",
        role: "Product Manager",
        company: "StartupX"
    },
    {
        quote: "Best bookmarking tool I've ever used. The AI summaries save me hours every week.",
        author: "Emma Thompson",
        role: "Content Creator",
        company: "Digital Media"
    },
    {
        quote: "The insights provided are incredibly valuable. It's like having a personal content curator.",
        author: "David Kim",
        role: "Research Analyst",
        company: "DataCo"
    },
    {
        quote: "I love how it organizes everything automatically. Such a time-saver!",
        author: "Lisa Wang",
        role: "UX Designer",
        company: "DesignHub"
    },
    {
        quote: "The newsletter feature is brilliant. I never miss important content anymore.",
        author: "James Foster",
        role: "Marketing Director",
        company: "GrowthLabs"
    }
];

// Create two rows with duplicated content for seamless scrolling
const testimonialRows = [
    [...testimonials, ...testimonials], // Duplicate for first row
    [...testimonials, ...testimonials].reverse(), // Duplicate and reverse for second row
];

export default function TestimonialsWall() {
    return (
        <div className={styles.testimonialWall}>
            {testimonialRows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`${styles.testimonialRow} ${rowIndex % 2 === 0 ? styles.moveLeft : styles.moveRight}`}
                >
                    {row.map((testimonial, index) => (
                        <div key={index} className={styles.testimonialCard}>
                            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
} 