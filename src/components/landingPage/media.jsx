import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Youtube, 
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  ExternalLink,
  X,
  Sparkles
} from "lucide-react";
import apiClient from "../../api/axios.instance";

// Memoized data outside component to prevent re-renders
const videos = [
  { id: 1, videoId: "hlja_xt6ZmI", title: "5 Wealth Building Principles", views: "12K" },
  { id: 2, videoId: "xTAL07asRco", title: "Power of Compound Interest", views: "8.5K" },
  { id: 3, videoId: "m8npMzoaUus", title: "Mindset for Financial Success", views: "15K" },
  { id: 4, videoId: "c1y2qG7Blyk", title: "Common Investment Mistakes", views: "9.2K" },
  { id: 5, videoId: "LcgaitbBjq4", title: "Multiple Income Streams", views: "11K" },
  { id: 6, videoId: "281ZDb8di_Y", title: "Financial Literacy Basics", views: "7.8K" },
  { id: 7, videoId: "esTTCTSc1H0", title: "SMART Financial Goals", views: "6.5K" }
];

const linkedinPosts = [
  { id: 1, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7426578391170142208?collapsed=1", title: "Wealth Management" },
  { id: 2, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7426224097799507969?collapsed=1", title: "Investment Tips" },
  { id: 3, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7424767640570712064?collapsed=1", title: "Financial Planning" },
  { id: 4, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7423322189241704450?collapsed=1", title: "Market Analysis" },
  { id: 5, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7422626482054918145?collapsed=1", title: "Career Growth" },
  { id: 6, embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7421886063817715713?collapsed=1", title: "Professional Tips" }
];

const instagramReels = [
  { id: 1, url: "https://www.instagram.com/reel/C7sFIJhy4nV/" },
  { id: 2, url: "https://www.instagram.com/reel/C7D6b6gys0E/" },
  { id: 3, url: "https://www.instagram.com/reel/C6wTaevSiQm/" },
];

const DEFAULT_SOCIAL_LINKS = {
  instagram: { enabled: true, url: "https://www.instagram.com/the_awareness_initiative" },
  youtube: { enabled: true, url: "https://www.youtube.com/@awareness_initiative" },
  linkedin: { enabled: true, url: "https://www.linkedin.com/in/harshalvjain/" },
  reddit: { enabled: false, url: "" },
  facebook: { enabled: false, url: "" },
  twitter: { enabled: false, url: "" },
};

const toInstagramEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const cleaned = url.trim();
  if (!cleaned) return "";
  if (cleaned.includes("/embed")) return cleaned;
  return cleaned.endsWith("/") ? `${cleaned}embed` : `${cleaned}/embed`;
};

// Memoized Video Card Component
const VideoCard = memo(({ video, index, onPlay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const thumbnailUrl = imageError 
    ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;

  return (
    <div className="group flex-shrink-0 w-[120px] min-[375px]:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
      <div className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-800 shadow-lg transition-transform duration-300 active:scale-[0.98] sm:group-hover:scale-[1.02]">
        
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
        )}
        
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
        
        {/* Play Button */}
        <button
          onClick={() => onPlay(video.videoId)}
          className="absolute inset-0 flex items-center justify-center touch-manipulation"
          aria-label={`Play ${video.title}`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
          </div>
        </button>
        
        {/* Shorts Badge */}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 bg-red-600 text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
          </svg>
        </div>

        {/* Views Badge */}
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/70 text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full">
          {video.views}
        </div>
        
        {/* Video Info */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <p className="text-white font-medium text-[10px] sm:text-xs leading-tight line-clamp-2">
            {video.title}
          </p>
        </div>

        {/* Number Badge */}
        <div className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/30 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold">
          {index + 1}
        </div>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

// Memoized LinkedIn Card Component
const LinkedInCard = memo(({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 active:scale-[0.99]">
        {/* Header */}
        <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-slate-50 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                {post.title}
              </h4>
              <p className="text-gray-500 text-[10px] sm:text-xs">Harshal V Jain</p>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium flex-shrink-0">
              #{index + 1}
            </span>
          </div>
        </div>

        {/* Embed Container */}
        <div className="bg-gray-100 relative" style={{ height: '320px' }}>
          {isVisible ? (
            <iframe
              src={post.embedUrl}
              height="320"
              width="100%"
              frameBorder="0"
              loading="lazy"
              title={post.title}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Linkedin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LinkedInCard.displayName = 'LinkedInCard';

// Navigation Button Component
const NavButton = memo(({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white transition-all touch-manipulation ${
      disabled 
        ? "opacity-30 cursor-not-allowed" 
        : "active:scale-95 hover:bg-white hover:text-teal-800"
    }`}
    aria-label={`Scroll ${direction}`}
  >
    {direction === "left" ? (
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
    ) : (
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    )}
  </button>
));

NavButton.displayName = 'NavButton';

// Main Component
export default function SocialMediaSection() {
  const [activeTab, setActiveTab] = useState("youtube");
  const [playingVideo, setPlayingVideo] = useState(null);
  
  const youtubeScrollRef = useRef(null);
  const linkedinScrollRef = useRef(null);
  const instagramScrollRef = useRef(null);
  
  const [scrollState, setScrollState] = useState({
    youtubeLeft: false,
    youtubeRight: true,
    linkedinLeft: false,
    linkedinRight: true,
    instagramLeft: false,
    instagramRight: true,
  });

  const { data: socialSettings } = useQuery({
    queryKey: ["public-settings", "social-media"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/settings/public");
        return response?.siteContent?.socialMedia || response?.socialMedia || response?.website?.socialMedia || {};
      } catch {
        return {};
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const socialLinks = { ...DEFAULT_SOCIAL_LINKS, ...(socialSettings?.links || {}) };
  const socialEnabled = socialSettings?.enabled !== false;
  const youtubeVideos = Array.isArray(socialSettings?.youtubeVideos) && socialSettings.youtubeVideos.length > 0
    ? socialSettings.youtubeVideos
    : videos;
  const linkedinFeed = Array.isArray(socialSettings?.linkedinPosts) && socialSettings.linkedinPosts.length > 0
    ? socialSettings.linkedinPosts
    : linkedinPosts;
  const instagramFeed = Array.isArray(socialSettings?.instagramPosts) && socialSettings.instagramPosts.length > 0
    ? socialSettings.instagramPosts
    : instagramReels;
  const availableTabs = [
    socialLinks.youtube?.enabled ? "youtube" : null,
    socialLinks.linkedin?.enabled ? "linkedin" : null,
    socialLinks.instagram?.enabled ? "instagram" : null,
  ].filter(Boolean);
  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];

  const checkScrollButtons = useCallback((ref, type) => {
    if (!ref.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const canScrollLeft = scrollLeft > 5;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;

    setScrollState(prev => ({
      ...prev,
      [`${type}Left`]: canScrollLeft,
      [`${type}Right`]: canScrollRight
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentTab === "youtube") {
        checkScrollButtons(youtubeScrollRef, "youtube");
      } else if (currentTab === "linkedin") {
        checkScrollButtons(linkedinScrollRef, "linkedin");
      } else {
        checkScrollButtons(instagramScrollRef, "instagram");
      }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [currentTab, checkScrollButtons]);

  const handleScroll = useCallback((ref, direction, type) => {
    if (!ref.current) return;
    
    const scrollAmount = window.innerWidth < 640 ? 200 : 280;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    
    setTimeout(() => checkScrollButtons(ref, type), 350);
  }, [checkScrollButtons]);

  const handlePlayVideo = useCallback((videoId) => {
    setPlayingVideo(videoId);
  }, []);

  const closeModal = useCallback(() => {
    setPlayingVideo(null);
  }, []);

  if (!socialEnabled || availableTabs.length === 0) return null;

  return (
    <section className="relative py-8 min-[375px]:py-10 sm:py-14 md:py-18 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 min-[375px]:mb-8 sm:mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-100 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Our Social Presence</span>
          </div>
          
          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
            Watch & Learn{" "}
            <span className="relative inline-block">
              <span 
             style={{ fontFamily: "Playfair Display, serif" }}
                className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
               
              >
                Shorts & Posts
              </span>
            </span>
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-4">
            Get valuable insights on wealth management and financial planning through our content.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-col items-center gap-3 mb-5 min-[375px]:mb-6 sm:mb-8">
          <div className="relative bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-1.5">
            {socialLinks.youtube?.enabled && (
              <button
                onClick={() => setActiveTab("youtube")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 min-[375px]:px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-300 touch-manipulation ${
                  currentTab === "youtube" ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "text-gray-600"
                }`}
              >
                <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Shorts</span>
              </button>
            )}
            {socialLinks.linkedin?.enabled && (
              <button
                onClick={() => setActiveTab("linkedin")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 min-[375px]:px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-300 touch-manipulation ${
                  currentTab === "linkedin" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "text-gray-600"
                }`}
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>LinkedIn</span>
              </button>
            )}
            {socialLinks.instagram?.enabled && (
              <button
                onClick={() => setActiveTab("instagram")}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 min-[375px]:px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-300 touch-manipulation ${
                  currentTab === "instagram" ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white" : "text-gray-600"
                }`}
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Instagram</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.twitter?.enabled && socialLinks.twitter?.url && (
              <a href={socialLinks.twitter.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white shadow text-slate-700">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {socialLinks.facebook?.enabled && socialLinks.facebook?.url && (
              <a href={socialLinks.facebook.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white shadow text-slate-700">
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {socialLinks.reddit?.enabled && socialLinks.reddit?.url && (
              <a href={socialLinks.reddit.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white shadow text-slate-700">
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

        {/* Content Container */}
        <div className="relative bg-gradient-to-br from-[#123c42] to-[#0b2428] rounded-2xl sm:rounded-3xl p-3 min-[375px]:p-4 sm:p-6 md:p-8 shadow-xl">
          
          {/* YouTube Shorts Tab */}
          {currentTab === "youtube" && socialLinks.youtube?.enabled && (
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">YouTube Shorts</h3>
                    <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">Quick financial insights</p>
                  </div>
                </div>
                <a 
                  href={socialLinks.youtube?.url || "https://www.youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Scroll Container */}
              <div
                ref={youtubeScrollRef}
                onScroll={() => checkScrollButtons(youtubeScrollRef, "youtube")}
                className="flex gap-2.5 min-[375px]:gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch"
                }}
              >
                {youtubeVideos.map((video, index) => (
                  <VideoCard
                    key={video.id || `${video.videoId}-${index}`}
                    video={video}
                    index={index}
                    onPlay={handlePlayVideo}
                  />
                ))}

                {/* View More Card */}
                <a
                  href={socialLinks.youtube?.url || "https://www.youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[120px] min-[375px]:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start"
                >
                  <div className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-red-700 shadow-lg flex flex-col items-center justify-center p-3 text-center active:scale-[0.98] transition-transform">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/25 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                      <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="text-white font-bold text-xs sm:text-sm mb-0.5">View All</p>
                    <p className="text-white/70 text-[10px] sm:text-xs mb-2">Shorts</p>
                    <div className="flex items-center gap-1 bg-white/25 px-2.5 py-1 rounded-full text-white text-[10px] sm:text-xs font-medium">
                      Watch <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll(youtubeScrollRef, "left", "youtube")}
                  disabled={!scrollState.youtubeLeft}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll(youtubeScrollRef, "right", "youtube")}
                  disabled={!scrollState.youtubeRight}
                />
              </div>
            </div>
          )}

          {/* LinkedIn Tab */}
          {currentTab === "linkedin" && socialLinks.linkedin?.enabled && (
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">LinkedIn Posts</h3>
                    <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">Professional insights</p>
                  </div>
                </div>
                <a 
                  href={socialLinks.linkedin?.url || "https://www.linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Scroll Container */}
              <div
                ref={linkedinScrollRef}
                onScroll={() => checkScrollButtons(linkedinScrollRef, "linkedin")}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{ 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch"
                }}
              >
                {linkedinFeed.map((post, index) => (
                  <LinkedInCard key={post.id || post.embedUrl || index} post={post} index={index} />
                ))}

                {/* View More Card */}
                <a
                  href={socialLinks.linkedin?.url || "https://www.linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start"
                >
                  <div className="h-full min-h-[380px] bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl sm:rounded-2xl shadow-lg flex flex-col items-center justify-center p-5 text-center active:scale-[0.99] transition-transform">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/25 rounded-full flex items-center justify-center mb-4">
                      <Linkedin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-base sm:text-lg mb-1">View All Posts</p>
                    <p className="text-white/80 text-sm mb-0.5">Harshal V Jain</p>
                    <p className="text-white/60 text-xs mb-4">Connect for more insights</p>
                    <div className="flex items-center gap-1.5 bg-white/25 px-4 py-2 rounded-full text-white text-sm font-medium">
                      Visit Profile <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll(linkedinScrollRef, "left", "linkedin")}
                  disabled={!scrollState.linkedinLeft}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll(linkedinScrollRef, "right", "linkedin")}
                  disabled={!scrollState.linkedinRight}
                />
              </div>
            </div>
          )}

          {/* Instagram Tab */}
          {currentTab === "instagram" && socialLinks.instagram?.enabled && (
            <div className="relative">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-lg">Instagram Reels</h3>
                    <p className="text-white/50 text-[10px] sm:text-xs hidden min-[375px]:block">Latest reels from your account</p>
                  </div>
                </div>
                <a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div
                ref={instagramScrollRef}
                onScroll={() => checkScrollButtons(instagramScrollRef, "instagram")}
                className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {instagramFeed.map((post, index) => {
                  const embedUrl = toInstagramEmbedUrl(post?.url || post?.embedUrl);
                  return (
                    <div key={post.id || post.url || index} className="flex-shrink-0 w-[260px] min-[375px]:w-[280px] sm:w-[300px] md:w-[340px] snap-start">
                      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-2.5 sm:p-3 bg-gradient-to-r from-pink-50 to-violet-50 border-b border-gray-100">
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                            {post.title || `Instagram Reel #${index + 1}`}
                          </h4>
                        </div>
                        <div className="bg-gray-100 relative" style={{ height: "420px" }}>
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              height="420"
                              width="100%"
                              frameBorder="0"
                              loading="lazy"
                              title={post.title || `Instagram reel ${index + 1}`}
                              className="w-full h-full"
                              sandbox="allow-scripts allow-same-origin allow-popups"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              Invalid Instagram reel URL
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                <NavButton
                  direction="left"
                  onClick={() => handleScroll(instagramScrollRef, "left", "instagram")}
                  disabled={!scrollState.instagramLeft}
                />
                <NavButton
                  direction="right"
                  onClick={() => handleScroll(instagramScrollRef, "right", "instagram")}
                  disabled={!scrollState.instagramRight}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-[300px] min-[375px]:max-w-[340px] sm:max-w-[380px] aspect-[9/16] bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube Short"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors touch-manipulation"
              aria-label="Close video"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
        .touch-manipulation { touch-action: manipulation; }
      `}</style>
    </section>
  );
}