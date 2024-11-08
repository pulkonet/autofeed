import TestimonialsWall from '@/components/TestimonialsWall';
import Link from 'next/link';
import styles from './LandingPage.module.css';

const features = [
  {
    title: "Smart Bookmarking",
    description: "Save articles, blog posts, and links with a single click. AutoFeeder organizes everything for you.",
    icon: "📑"
  },
  {
    title: "AI-Powered Summaries",
    description: "Get concise, intelligent summaries of your saved content, helping you decide what to read next.",
    icon: "🤖"
  },
  {
    title: "Custom Newsletters",
    description: "Receive personalized digests on your schedule, with content tailored to your interests.",
    icon: "📮"
  },
  {
    title: "Reading Analytics",
    description: "Track your reading habits and discover insights about your content consumption.",
    icon: "📊"
  }
];

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Your Personal Content Curator
          </h1>
          <p className={styles.heroSubtitle}>
            Save, summarize, and schedule your reading with AI-powered insights.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/signup" className={styles.primaryButton}>
              Get Started Free
            </Link>
            <Link href="#how-it-works" className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks} id="how-it-works">
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Save Content</h3>
            <p>Bookmark any article or webpage with our browser extension or mobile app.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Get Summaries</h3>
            <p>Our AI generates concise summaries and key takeaways from your saved content.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Stay Updated</h3>
            <p>Receive personalized newsletters with your content digest on your schedule.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <TestimonialsWall />
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Reading Experience?</h2>
        <p className={styles.ctaText}>
          Join thousands of users who have already optimized their content consumption.
        </p>
        <Link href="/signup" className={styles.ctaButton}>
          Start Your Free Trial
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>AutoFeeder</h3>
            <p>Your personal content curator</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <Link href="#features">Features</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="#how-it-works">How It Works</Link>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
            </div>
            <div className={styles.footerColumn}>
              <h4>Support</h4>
              <Link href="/help">Help Center</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 AutoFeeder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
