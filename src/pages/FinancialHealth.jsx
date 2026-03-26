import React from "react";
import { motion } from "framer-motion";
void motion;
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Wallet, Shield, Umbrella, TrendingUp, CreditCard, Target } from "lucide-react";

const FinancialHealthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/20">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }} 
          transition={{ duration: 8, repeat: Infinity }} 
          className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }} 
          transition={{ duration: 9, repeat: Infinity, delay: 2 }} 
          className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" 
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Heart size={14} className="text-emerald-300" />
              <span className="text-xs sm:text-sm font-semibold text-white/80">Free · Takes 5 minutes · 100% Private</span>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-4 sm:mb-6"
            >
              Financial{" "}
              <span 
                className="italic" 
                style={{ 
                  fontFamily: "Georgia, serif", 
                  background: "linear-gradient(135deg, #6ee7b7, #67e8f9)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent" 
                }}
              >
                Health Check
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.15 }} 
              className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-4"
            >
              Evaluate your financial well-being in just a few minutes.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="text-xs sm:text-sm text-white/55 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10"
            >
              This tool helps you understand your financial stability by analysing your income, expenses, savings, insurance coverage, investments, and liabilities — then gives you a personalised score with actionable recommendations.
            </motion.p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg text-sm"
            >
              Take Free Assessment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0 80L360 40C720 0 1080 0 1440 40V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-10 sm:py-16 -mt-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-8 sm:mb-10"
          >
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">What We Analyse</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              6 Key Pillars of Financial Health
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Wallet, title: "Income & Expenses", desc: "Savings rate and budget habits" },
              { icon: Shield, title: "Emergency Fund", desc: "Liquidity buffer for surprises" },
              { icon: Umbrella, title: "Insurance", desc: "Life & health protection" },
              { icon: TrendingUp, title: "Investments", desc: "Wealth building portfolio" },
              { icon: CreditCard, title: "Debt & Liabilities", desc: "Loan and EMI management" },
              { icon: Target, title: "Financial Goals", desc: "Short & long-term planning" },
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.07 }} 
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                    <IconComponent size={18} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm"
            >
              Book My Free Assessment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialHealthPage;