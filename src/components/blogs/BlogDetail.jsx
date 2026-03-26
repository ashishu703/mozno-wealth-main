import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import CommentSection from "../blogs/CommentSection";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import RecentPosts from "../blogs/RecentPosts";
import { useBlog } from "../../hooks/useBlog";

/* ───── optimized spring configs ───── */
const smooth = { stiffness: 100, damping: 30, mass: 0.8, restDelta: 0.001 };
const snappy = { stiffness: 400, damping: 35, restDelta: 0.001 };

/* ───── simplified text reveal ───── */
const textReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/* ───── simple fade variant ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { data: response, isLoading, isError, error, refetch } = useBlog(slug);
  const post = response;

  /* ────── scroll values ────── */
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: pageProgress } = useScroll();

  /* single spring – reuse instead of multiple */
  const smoothProgress = useSpring(scrollYProgress, smooth);
  const smoothPage = useSpring(pageProgress, smooth);

  /* simplified parallax – fewer transforms = smoother */
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.5, 0]);

  /* overlay */
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.55, 0.85]);

  /* content */
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  /* floating header */
  const headerOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const headerY = useTransform(scrollY, [0, 200], [-50, 0]);
  const springHeaderY = useSpring(headerY, snappy);

  /* reading progress */
  const progressWidth = useTransform(smoothPage, [0, 1], ["0%", "100%"]);

  /* scroll indicator fade */
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  /* show scroll-to-top – throttled */
  useMotionValueEvent(scrollY, "change", (v) => {
    const should = v > 500;
    if (should !== showScrollTop) setShowScrollTop(should);
  });

  /* redirect if not found */
  useEffect(() => {
    if (!isLoading && !isError && !post) {
      const t = setTimeout(() => navigate("/blogs"), 3000);
      return () => clearTimeout(t);
    }
  }, [isLoading, isError, post, navigate]);

  /* ────── memoized handlers ────── */
  const handleLike = useCallback(() => setLiked((p) => !p), []);
  const handleSave = useCallback(() => setSaved((p) => !p), []);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(
    (platform) => {
      const url = window.location.href;
      const title = post?.title || "";
      const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out: ${url}`)}`,
      };
      if (platform === "email") {
        window.location.href = urls[platform];
      } else {
        window.open(urls[platform], "_blank");
      }
      setShowShareMenu(false);
    },
    [post?.title]
  );

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );

  const toggleShareMenu = useCallback(
    () => setShowShareMenu((p) => !p),
    []
  );

  const closeShareMenu = useCallback(() => setShowShareMenu(false), []);

  /* ────── memoized date ────── */
  const formattedDate = useMemo(() => {
    if (post?.createdAt) return format(new Date(post.createdAt), "MMM dd, yyyy");
    return format(new Date(), "MMM dd, yyyy");
  }, [post?.createdAt]);

  /* ────── share menu items ────── */
  const shareItems = useMemo(
    () => [
      {
        action: handleCopyLink,
        icon: copied ? Check : Copy,
        label: copied ? "Copied!" : "Copy Link",
        color: copied ? "text-green-500" : "text-gray-700",
      },
      { action: () => handleShare("facebook"), icon: Facebook, label: "Facebook", color: "text-blue-600" },
      { action: () => handleShare("twitter"), icon: Twitter, label: "Twitter", color: "text-blue-400" },
      { action: () => handleShare("linkedin"), icon: Linkedin, label: "LinkedIn", color: "text-blue-700" },
      { action: () => handleShare("email"), icon: Mail, label: "Email", color: "text-gray-600" },
    ],
    [copied, handleCopyLink, handleShare]
  );

  /* ────── meta items ────── */
  const metaItems = useMemo(
    () => [
      { icon: Calendar, val: formattedDate },
      { icon: Clock, val: "5 min read" },
      { icon: Eye, val: "0" },
    ],
    [formattedDate]
  );

  /* ────── loading state ────── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-500 border-r-emerald-300"
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Loading Article
          </h2>
          <p className="text-sm text-gray-500">Fetching the content…</p>
        </motion.div>
      </div>
    );
  }

  /* ────── error state ────── */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Failed to Load
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {error?.message || "Something went wrong."}
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              Try Again
            </button>
            <Link
              to="/blogs"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ────── not found ────── */
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-4">Redirecting…</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════ READING PROGRESS BAR ═══════ */}
      <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 will-change-[width]"
        />
      </motion.div>

      {/* ═══════ FLOATING HEADER ═══════ */}
      <motion.div
        style={{ opacity: headerOpacity, y: springHeaderY }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 will-change-transform"
      >
        <div className="bg-white/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/blogs"
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm relative z-20"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Back</span>
              </Link>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-md">
                {post.title}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleLike}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    liked
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleSave}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    saved
                      ? "text-amber-500 bg-amber-50"
                      : "text-gray-400 hover:text-amber-500"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════ PARALLAX HERO ═══════ */}
      <section
        ref={heroRef}
        className="relative h-[65vh] xs:h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-screen overflow-hidden"
      >
        {/* ── Background Image – simplified transforms ── */}
        <motion.div
          style={{
            y: imageY,
            scale: imageScale,
            opacity: imageOpacity,
          }}
          className="absolute inset-0 w-full h-[115%] -top-[8%] will-change-transform"
        >
          <img
            src={post.image}
            alt={post.title}
            loading="eager"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setHeroLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x800?text=Blog";
            }}
          />
          {!heroLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
        </motion.div>

        {/* ── Gradient Overlays ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent" />

        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute top-4 sm:top-6 left-3 xs:left-4 sm:left-6 z-20"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5
              bg-white/10 backdrop-blur-lg text-white rounded-full hover:bg-white/20
              transition-colors text-xs sm:text-sm border border-white/20 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden xs:inline">Back to Blogs</span>
            <span className="xs:hidden">Back</span>
          </Link>
        </motion.div>

        {/* ── Hero Content ── */}
        <motion.div
          style={{ y: contentY }}
          className="absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-8 md:p-12 lg:p-16 will-change-transform"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Category */}
            <motion.div variants={textReveal} custom={0} className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-3 h-3 hidden xs:block" />
                {post.category || "General"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={textReveal}
              custom={1}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] mb-3 sm:mb-5 drop-shadow-lg"
            >
              {post.title}
            </motion.h1>

            {/* Subtitle */}
            {post.subTitle && (
              <motion.p
                variants={textReveal}
                custom={2}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-white/85 mb-4 max-w-2xl leading-relaxed"
              >
                {post.subTitle}
              </motion.p>
            )}

            {/* Meta Row */}
            <motion.div
              variants={textReveal}
              custom={3}
              className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6"
            >
              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      "Mozno Wealth"
                    )}&background=10b981&color=fff`}
                    alt="Mozno Wealth"
                    loading="lazy"
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white/40 object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-white text-xs sm:text-sm">
                    Mozno Wealth
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60">
                    Contributor
                  </p>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-white/20" />

              {/* Date / Read / Views */}
              <div className="flex flex-wrap gap-2 sm:gap-3 text-white/70 text-[10px] sm:text-xs">
                {metaItems.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 sm:gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full"
                  >
                    <m.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{m.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Scroll Down Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-white/50 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ CONTENT SECTION ═══════ */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 bg-white -mt-6 xs:-mt-8 sm:-mt-12 md:-mt-16 rounded-t-[1.5rem] sm:rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.12)]"
      >
        {/* Top pill */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-10 h-1 sm:w-14 sm:h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-8 sm:py-10 md:py-14 lg:py-16">
          {/* ── Quick Actions ── */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 sm:gap-5 text-sm text-gray-500">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors ${
                  liked ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                    liked ? "fill-current scale-110" : ""
                  }`}
                />
                <span className="hidden xs:inline text-xs sm:text-sm">
                  {liked ? 1 : 0}
                </span>
              </button>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline text-xs sm:text-sm">0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline text-xs sm:text-sm">0</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleSave}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                  saved
                    ? "text-amber-500 bg-amber-50"
                    : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? "fill-current" : ""}`}
                />
              </button>

              <div className="relative">
                <button
                  onClick={toggleShareMenu}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-40"
                        onClick={closeShareMenu}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-1.5 sm:p-2 z-50 min-w-[150px] sm:min-w-[180px]"
                      >
                        {shareItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={item.action}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 ${item.color} hover:bg-gray-50 rounded-lg transition-colors text-xs sm:text-sm`}
                          >
                            <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Main Content ── */}
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="mb-10 sm:mb-14"
          >
            {post.description && (
              <div
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none
                  prose-headings:text-gray-900 prose-p:text-gray-700
                  prose-a:text-emerald-600 prose-strong:text-gray-900
                  prose-img:rounded-2xl prose-img:shadow-lg
                  prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50/50
                  prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            )}
          </motion.article>

          {/* ── Author Card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mb-10 sm:mb-14 border border-emerald-100/80 shadow-xl overflow-hidden"
          >
            {/* decorative circle */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="relative flex-shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    "Mozno Wealth"
                  )}&background=10b981&color=fff&size=96`}
                  alt="Mozno Wealth"
                  loading="lazy"
                  className="w-18 h-18 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-emerald-600 font-bold tracking-wider uppercase mb-1">
                  Written By
                </p>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  Mozno Wealth
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  Contributor
                </p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Helping individuals and businesses achieve financial success
                  through expert guidance in wealth management, tax planning, and
                  investment strategies.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Recent Posts ── */}
          <RecentPosts currentPostId={post._id} />

          {/* ── Comments ── */}
          {post && <CommentSection postId={post._id} />}
        </div>
      </motion.section>

      {/* ═══════ SCROLL TO TOP ═══════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-4
              bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full
              shadow-xl shadow-emerald-500/25 transition-shadow hover:shadow-emerald-500/40"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDetail;