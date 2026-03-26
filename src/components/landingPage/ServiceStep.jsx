import { Mail, ArrowRight, Clock } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ================= DATA ================= */
const steps = [
  {
    id: "01",
    title: "Schedule Your Free Consultation",
    desc: "We start with a detailed conversation to understand your financial situation, goals, and aspirations.",
    duration: "30 mins",
  },
  {
    id: "02",
    title: "Risk Profiling",
    desc: "Scientific assessment of your risk tolerance and investment temperament using proven methodologies.",
    duration: "45mins",
  },
  {
    id: "03",
    title: "Design Your Personalized Wealth Plan",
    desc: "Our experts craft a personalized wealth management strategy with asset allocations aligned with your unique profile.",
    duration: "2-3 days",
  },
  {
    id: "04",
    title: "Execute",
    desc: "Seamless execution of your investment plan with complete transparency and documentation.",
    duration: "1-2 days",
  },
  {
    id: "05",
    title: "Ongoing Review",
    desc: "Regular monitoring, rebalancing, and quarterly reviews to ensure you stay on track.",
    duration: "Periodic.",
  },
];

/* ================= MAIN COMPONENT ================= */
export default function StickyOverlapStepsSection() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const index = Math.min(Math.floor(v * steps.length), steps.length - 1);
      setActiveStep(Math.max(0, index));
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* =============== RIGHT STICKY PANEL =============== */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-fit">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-700">
                How It Works
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Simple Steps To{" "}
              <span
                style={{ fontFamily: "Playfair Display, serif" }}
                className="italic text-emerald-600"
              >
                Get Started
              </span>
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-md">
              Your wealth management journey begins here. Follow these
              streamlined steps to start managing your finances confidently.
            </p>

            {/* Active Card Info - Desktop Only */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block mt-8 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    {steps[activeStep]?.id}
                  </div>
                  <p className="text-emerald-600 font-semibold text-sm">
                    Current Step
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full text-xs font-medium text-emerald-700 border border-emerald-100">
                  <Clock className="w-3 h-3" />
                  {steps[activeStep]?.duration}
                </span>
              </div>
              <h4 className="font-semibold text-base text-gray-900">
                {steps[activeStep]?.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                {steps[activeStep]?.desc}
              </p>
            </motion.div>

            {/* Contact Card */}
            <div className="mt-6 lg:mt-8 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Email Consultation
                  </p>
                  <p className="text-gray-500 text-sm">ceo@mozno.in</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link to="/contact" className="block mt-6">
              <button className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base shadow-sm hover:shadow-md">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          {/* =============== LEFT CARDS =============== */}
          <div className="order-2 lg:order-1">
            {/* Mobile & Tablet View */}
            <div className="lg:hidden space-y-3 sm:space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Number Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.id}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1.5">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-snug break-words">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-2">
                        {step.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop View - Sticky Overlap */}
            <div
              className="hidden lg:block relative"
              style={{ minHeight: `${steps.length * 140 + 350}px` }}
            >
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const topPosition = 100 + index * 28;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`
                      sticky
                      rounded-2xl
                      border
                      bg-white
                      p-9
                      mb-5
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "border-emerald-200 shadow-lg shadow-emerald-50"
                          : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
                      }
                    `}
                    style={{
                      top: `${topPosition}px`,
                      zIndex: 10 + index,
                    }}
                  >
                    <div className="flex gap-5">
                      {/* Number Badge */}
                      <div
                        className={`
                          w-12 h-12
                          rounded-xl
                          flex items-center justify-center
                          font-bold text-base
                          flex-shrink-0
                          transition-all duration-300
                          bg-emerald-50 text-emerald-600
                        `}
                      >
                        {step.id}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3
                            className={`font-semibold text-lg transition-colors duration-300 break-words ${
                              isActive ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <span
                            className={`
                              inline-flex items-center gap-1.5
                              px-2.5 py-1
                              rounded-full
                              text-xs font-medium
                              border
                              transition-all duration-300
                              ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : "bg-gray-50 text-gray-500 border-gray-100"
                              }
                            `}
                          >
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        </div>
                        <p
                          className={`text-sm leading-relaxed transition-colors duration-300 ${
                            isActive ? "text-gray-600" : "text-gray-500"
                          }`}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bottom spacer */}
              <div className="h-48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
