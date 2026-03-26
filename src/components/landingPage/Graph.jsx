import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  UserCheck,
  Home,
  Lightbulb,
  MessageSquare,
  Smartphone,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";
import whyChooseVisual from "../../assets/ChatGPT Image Mar 24, 2026, 09_44_35 PM.png";

const AnimatedGraphSection = () => {
  const whyChooseItems = [
    {
      icon: UserCheck,
      title: "Your Own Personal CFO, Not a Seller",
      desc: "Mozno Wealth doesn't push products - it acts as your personal CFO. We first understand your income, goals, risks, family needs and existing portfolio, and only then design a plan.",
    },
    {
      icon: Home,
      title: "One Roof for Every Major Money Decision",
      desc: "No more running to different people for investments, insurance, loans, taxes and wills. One integrated team handling everything, so every decision talks to the other.",
    },
    {
      icon: Lightbulb,
      title: "Led by Experts with Real-World Insight",
      desc: "Founded by Harshal Jain, who brings institutional-grade knowledge to everyday Indian investors. Deep technical expertise translated into clear, practical actions.",
    },
    {
      icon: MessageSquare,
      title: "Simple Language, Clear Trade-Offs, India Context",
      desc: "We cut the jargon and explain everything in simple English/Hinglish with India-specific tax and regulation in mind. Every recommendation comes with clear pros and cons.",
    },
    {
      icon: Smartphone,
      title: "Built for Busy, Digital-First Indians",
      desc: "Whether you're in Tier I or a tier-II/III city, Mozno Wealth is designed for your schedule and lifestyle with digital-first processes and education-led content.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-emerald-50/20 to-white py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {/* Core Philosophy + MOZNO meaning */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-semibold text-emerald-700">
            <CheckCircle className="w-3.5 h-3.5" />
            Our Core Philosophy
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            MOZNO with Meaning
          </h2>
          <div className="mt-4 max-w-3xl mx-auto overflow-hidden rounded-full border border-emerald-100 bg-emerald-50/70 px-2 py-2">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <p
                className="pr-10 text-base sm:text-lg text-emerald-700 font-medium italic"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                We act as your Personal CFO. We do not sell random products, we build one connected financial plan around your life.
              </p>
              <p
                className="pr-10 text-base sm:text-lg text-emerald-700 font-medium italic"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                We act as your Personal CFO. We do not sell random products, we build one connected financial plan around your life.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-[26px] overflow-hidden shadow-xl border border-gray-100">
            <img
              src={heroImage}
              alt="Mozno Wealth Services"
              className="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover"
            />
          </div>
        </div>

        {/* Why Choose Us — image plain (no card), copy animated */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          <motion.div
            className="flex justify-center lg:justify-start px-1"
            initial={{ opacity: 0, x: -36, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mozno-why-float w-full max-w-[540px]">
              <motion.img
                src={whyChooseVisual}
                alt="Mozno Wealth — integrated services, Pan India coverage, digital-first, AMFI registered ARN-338534"
                className="w-full h-auto max-h-[min(68vh,560px)] object-contain object-center select-none"
                initial={{ scale: 0.94 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          >
            <motion.p
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Why Choose Us
            </motion.p>
            <motion.h3
              className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Your Personal{" "}
              <span
                className="italic text-emerald-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                CFO
              </span>
              , Not Just Another Advisor
            </motion.h3>
            <motion.p
              className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              We first understand your income, goals, risks, family needs and
              existing portfolio, and only then design a plan. Products come
              later, and only if they fit your life.
            </motion.p>

            <div className="mt-6 space-y-3">
              {whyChooseItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-24px 0px" }}
                    transition={{
                      duration: 0.38,
                      delay: 0.08 + idx * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
              >
                Free Portfolio Review
                <ClipboardList className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedGraphSection;