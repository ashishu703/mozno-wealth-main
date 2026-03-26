import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import {
  Shield,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Landmark,
  ScrollText,
} from "lucide-react";

// ESLint may not treat `motion` JSX usage as a “read”, so we reference it.
void motion;

// ========== MAIN COMPONENT ==========
const HeroSection = () => {
  const serviceGridItems = useMemo(() => [
    {
      icon: TrendingUp,
      label: "Wealth Management",
      desc: "MF, PMS, AIFs & Bonds",
      path: "/services/wealth-management",
    },
    {
      icon: Users,
      label: "Financial Planning",
      desc: "Goal-based strategies",
      path: "/services/financial-planning",
    },
    {
      icon: Shield,
      label: "Tax Advisory",
      desc: "Direct & Indirect tax",
      path: "/services/tax-planning",
    },
    {
      icon: Award,
      label: "Insurance",
      desc: "Life & Health coverage",
      path: "/services/insurance-planning",
    },
    {
      icon: Landmark,
      label: "Borrowing",
      desc: "Home & property loans",
      path: "/services/borrowing-solutions",
    },
    {
      icon: ScrollText,
      label: "Succession Planning",
      desc: "Will & Estate services",
      path: "/services/succession-planning",
    },
  ], []);

  // Optimized typing sequences - shorter array
  const typingSequences = useMemo(
    () => [
      "Smart Decisions.", 1500,
      "Secured Retirement.", 1500,
      "Peace of Mind.", 1500,
    ],
    [],
  );

  // Faster animations - reduced duration
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="w-full max-w-xl mx-auto lg:mx-0"
            >
              {/* Trust Badge */}
              <motion.div variants={fadeInUp} custom={0} className="mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium text-emerald-700">
                    AMFI Registered (ARN-338534) • APMI (APRN-08037)
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={fadeInUp} custom={1} className="mb-3 sm:mb-4 md:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                  Your Personal CFO.
                  <br />
                  <span>Stop chasing returns.</span>
                  <br />
                  <span>Start building wealth.</span>
                </h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                  Your money deserves a CFO, not a salesman.
                </p>
                <div className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.5rem] font-semibold text-gray-800 min-h-[1.2em]">
                  <TypeAnimation
                    sequence={typingSequences}
                    wrapper="span"
                    speed={50}
                    deletionSpeed={40}
                    repeat={Infinity}
                    cursor
                    className="text-emerald-600"
                    style={{
                      display: "inline-block",
                      minHeight: "1.2em",
                      fontFamily: "Playfair Display, serif",
                    }}
                  />
                </div>
              </motion.div>

              {/* Subheadline */}
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-6 md:mb-8 space-y-1"
              >
                <p>Most advisors sell you products. We build your plan.</p>
                <p>Maximising Returns, Minimising Risk.</p>
                <p>Financial Freedom with Peace of Mind.</p>
                <p className="pt-1 font-medium text-gray-700">
                  Personalized Strategy with Expert Guidance.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} custom={4} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
                <a
                  href="https://wa.me/9820507696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-sm sm:text-base font-semibold rounded-xl transition-colors"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-emerald-50 text-emerald-700 text-sm sm:text-base font-semibold rounded-xl border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100 transition-all"
                >
                  Book Free Consultation
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} custom={5} className="flex items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">ARN-338534</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">AMFI Registered</p>
                  </div>
                </div>

                <div className="w-px h-8 sm:h-10 bg-gray-200 flex-shrink-0" />

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">APRN-08037</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">APMI Registered</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Services Card */}
            <div className="relative w-full mt-4 sm:mt-0">
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden mx-auto max-w-md lg:max-w-none">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-800">Mozno Wealth</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">Your Personal CFO</p>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
                    Personal Finance Made Easy
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceGridItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="block p-3 sm:p-4 rounded-xl border border-gray-100 bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                        >
                          <div className="flex items-start gap-2.5 sm:gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-emerald-700" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 leading-tight">
                                {item.label}
                              </p>
                              <p className="mt-1 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
