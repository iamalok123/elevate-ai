import { Link } from "react-router-dom";
import './landingpage.css'
import Navbar from '../LoginComponents/Navbar'
import Hero from '../LoginComponents/Hero'
import CompanyLogo from '../LoginComponents/CompanyLogo'
import PurposeSection from '../LoginComponents/PurposeSection'
import FeaturesSection from '../LoginComponents/FeaturesSection'
import ScheduleSection from '../LoginComponents/ScheduleSection'
import MonitorSection from '../LoginComponents/MonitorSection'
import PricingSection from '../LoginComponents/PricingSection'
import ServicesSection from '../LoginComponents/ServicesSection'
import TestimonialsSection from '../LoginComponents/TestimonialsSection'
import NewsletterSection from '../LoginComponents/NewsletterSection'
import Footer from '../LoginComponents/Footer'

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection />
        <ScheduleSection />
        <MonitorSection />
        <PricingSection />
        <ServicesSection />
        <TestimonialsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  )
}

export default LandingPage