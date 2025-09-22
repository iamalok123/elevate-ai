// import { Link } from "react-router-dom";

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-blue-600">🚀 IDP System</div>

//           {/* Navlinks */}
//           <nav className="hidden md:flex space-x-6">
//             <a href="#about" className="text-gray-600 hover:text-blue-600">
//               About
//             </a>
//             <a href="#features" className="text-gray-600 hover:text-blue-600">
//               Features
//             </a>
//             <a href="#contact" className="text-gray-600 hover:text-blue-600">
//               Contact
//             </a>
//           </nav>

//           {/* Login / Signup */}
//           <div className="flex space-x-4">
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
//             >
//               Signup
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
//           Intelligent Recommendation System for{" "}
//           <span className="text-blue-600">IDPs</span>
//         </h1>
//         <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl">
//           AI-powered platform to generate personalized Individual Development
//           Plans for employees, mentors, and HR. Track progress, bridge skill
//           gaps, and prepare future leaders.
//         </p>
//         <div className="mt-8 flex space-x-4">
//           <Link
//             to="/signup"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//           >
//             Get Started
//           </Link>
//           <a
//             href="#features"
//             className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50"
//           >
//             Learn More
//           </a>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Key Features
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 🔐 Multi-Role Login
//               </h3>
//               <p className="text-gray-600">
//                 Secure authentication for Employees, Mentors, and HR with role-based dashboards.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 📊 Gap Analysis
//               </h3>
//               <p className="text-gray-600">
//                 Identify competency gaps and generate personalized development plans with interactive charts.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 🤝 Mentorship
//               </h3>
//               <p className="text-gray-600">
//                 Track mentorship sessions, set goals, and monitor mentee progress with ease.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 🎯 Activity Management
//               </h3>
//               <p className="text-gray-600">
//                 Assign and complete learning activities with progress tracking and feedback.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 🔔 Notifications
//               </h3>
//               <p className="text-gray-600">
//                 Get reminders, deadline alerts, and recognition updates in real-time.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">
//                 📈 Reports
//               </h3>
//               <p className="text-gray-600">
//                 Export detailed reports and analytics in PDF/CSV format for workforce insights.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-16 bg-gray-50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">About IDP System</h2>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             The IDP System is designed to help organizations identify leadership
//             potential, provide structured growth paths, and empower employees
//             with personalized development opportunities. It aligns employee
//             goals with organizational needs.
//           </p>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-16 bg-white">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
//           <p className="text-gray-600 mb-4">
//             Have questions or want to collaborate? Reach out to us at:
//           </p>
//           <a
//             href="mailto:info@idpsystem.com"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             info@idpsystem.com
//           </a>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p>© {new Date().getFullYear()} IDP System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// ---------------------------------------------------------


// import { Link } from "react-router-dom";
// // import heroImg from "../assets/hero-illustration.svg"; // Add a related image in assets
// // import feature1 from "../assets/feature1.svg";
// // import feature2 from "../assets/feature2.svg";
// // import feature3 from "../assets/feature3.svg";

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <header className="bg-white shadow-md sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-blue-600">ElevateAI</div>

//           {/* Navlinks */}
//           <nav className="hidden md:flex space-x-6">
//             <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
//             <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
//             <a href="#demo" className="text-gray-600 hover:text-blue-600">Demo</a>
//             <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
//           </nav>

//           {/* Login / Signup */}
//           <div className="flex space-x-4">
//             <Link to="/login" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Login</Link>
//             <Link to="/signup" className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">Signup</Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex-1 flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
//         <div className="flex-1 max-w-xl">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
//             Intelligent Recommendation System for <span className="text-blue-600">IDPs</span>
//           </h1>
//           <p className="mt-6 text-lg md:text-xl text-gray-600">
//             AI-powered platform to generate personalized Individual Development Plans for employees, mentors, and HR.
//             Track progress, bridge skill gaps, and prepare future leaders.
//           </p>
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Get Started</Link>
//             <a href="#features" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-50">Learn More</a>
//           </div>
//         </div>
//         <div className="flex-1 mt-8 md:mt-0">
//           {/* <img src={heroImg} alt="IDP Illustration" className="w-full max-w-md mx-auto" /> */}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//               {/* <img src={feature1} alt="Multi-Role Login" className="w-20 mb-4" /> */}
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">🔐 Multi-Role Login</h3>
//               <p className="text-gray-600 text-center">
//                 Secure authentication for Employees, Mentors, and HR with role-based dashboards.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//               {/* <img src={feature2} alt="Gap Analysis" className="w-20 mb-4" /> */}
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">📊 Gap Analysis</h3>
//               <p className="text-gray-600 text-center">
//                 Identify competency gaps and generate personalized development plans with interactive charts.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
//               {/* <img src={feature3} alt="Mentorship" className="w-20 mb-4" /> */}
//               <h3 className="text-xl font-semibold text-blue-600 mb-4">🤝 Mentorship</h3>
//               <p className="text-gray-600 text-center">
//                 Track mentorship sessions, set goals, and monitor mentee progress with ease.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Demo / Testimonials Section */}
//       <section id="demo" className="py-16 bg-blue-50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-12">🎯 Sample IDPs / Testimonials</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="font-semibold text-gray-800 mb-2">Employee - John Smith</h3>
//               <p className="text-gray-600 mb-2">Target Role: Senior Developer</p>
//               <p className="text-gray-500 text-sm">“This platform helped me identify skill gaps and plan training effectively.”</p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="font-semibold text-gray-800 mb-2">Mentor - David Wilson</h3>
//               <p className="text-gray-600 mb-2">Target Role: Lead Mentor</p>
//               <p className="text-gray-500 text-sm">“I can track mentee progress and suggest tailored development paths easily.”</p>
//             </div>
//             <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
//               <h3 className="font-semibold text-gray-800 mb-2">HR - Manager</h3>
//               <p className="text-gray-600 mb-2">Target Role: HR Lead</p>
//               <p className="text-gray-500 text-sm">“Efficient reporting and gap analysis helped us plan workforce training programs.”</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-16 bg-gray-50">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">About IDP System</h2>
//           <p className="text-gray-600 max-w-3xl mx-auto mb-4">
//             The IDP System is designed to help organizations identify leadership potential, provide structured growth paths, and empower employees with personalized development opportunities.
//           </p>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Our platform aligns employee goals with organizational needs, enabling better performance tracking, mentorship guidance, and career planning for long-term success.
//           </p>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-16 bg-white">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
//           <p className="text-gray-600 mb-4">Have questions or want to collaborate? Reach out to us at:</p>
//           <a href="mailto:info@idpsystem.com" className="text-blue-600 font-semibold hover:underline">info@idpsystem.com</a>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p>© {new Date().getFullYear()} IDP System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


// -----------------------------


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