import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlogs } from '../../hooks/useBlog';

const RecentPosts = ({ currentPostId }) => {
  // Fetch blogs using the hook
  const { 
    data: response, 
    isLoading, 
    isError 
  } = useBlogs({
    page: 1,
    limit: 10, // Fetch more to filter out current post
  });

  // Extract blogs from response and filter out current post
  const allPosts = response?.blogs || [];
  const recentPosts = allPosts
    .filter(post => post._id !== currentPostId) // Use _id from API
    .slice(0, 3);

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
            Related Articles
          </h2>
          <Link
            to="/blogs"
            className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-emerald-600 font-semibold text-xs xs:text-sm sm:text-base hover:gap-2 xs:hover:gap-2.5 sm:hover:gap-3 transition-all group"
          >
            <span className="hidden xs:inline">View All</span>
            <span className="xs:hidden">All</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-32 xs:h-36 sm:h-40 bg-gray-200 animate-pulse" />
              <div className="p-3 xs:p-4 sm:p-5">
                <div className="flex gap-2 mb-2">
                  <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />
                  <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
            Related Articles
          </h2>
          <Link
            to="/blogs"
            className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-emerald-600 font-semibold text-xs xs:text-sm sm:text-base hover:gap-2 xs:hover:gap-2.5 sm:hover:gap-3 transition-all group"
          >
            <span className="hidden xs:inline">View All</span>
            <span className="xs:hidden">All</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">Failed to load related articles</p>
        </div>
      </motion.div>
    );
  }

  // No posts state
  if (recentPosts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8"
      >
        <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
            Related Articles
          </h2>
          <Link
            to="/blogs"
            className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-emerald-600 font-semibold text-xs xs:text-sm sm:text-base hover:gap-2 xs:hover:gap-2.5 sm:hover:gap-3 transition-all group"
          >
            <span className="hidden xs:inline">View All</span>
            <span className="xs:hidden">All</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No related articles found</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6 md:mb-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
          Related Articles
        </h2>
        <Link
          to="/blogs"
          className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-emerald-600 font-semibold text-xs xs:text-sm sm:text-base hover:gap-2 xs:hover:gap-2.5 sm:hover:gap-3 transition-all group"
        >
          <span className="hidden xs:inline">View All</span>
          <span className="xs:hidden">All</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
        {recentPosts.map((post, index) => (
          <motion.article
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 group"
          >
            <Link to={`/blogs/${post.slug || post._id}`} className="block">
              {/* Image Container */}
              <div className="relative h-32 xs:h-36 sm:h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Blog+Image';
                  }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 xs:top-3 left-2 xs:left-3">
                  <span className="px-2 py-0.5 xs:px-2.5 xs:py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] xs:text-xs font-semibold rounded-full">
                    {post.category || 'General'}
                  </span>
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-3 xs:p-4 sm:p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-2 xs:gap-3 text-[10px] xs:text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>5 min read</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm xs:text-base sm:text-base line-clamp-2 group-hover:text-emerald-600 transition-colors mb-1.5 xs:mb-2">
                  {post.title}
                </h3>
                
                {/* Excerpt / Description */}
                <p className="hidden xs:block text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {post.subTitle || post.description?.replace(/<[^>]*>/g, '').slice(0, 100) || 'No description available'}
                </p>
                
                {/* Read More Link */}
                <div className="flex items-center gap-1 text-emerald-600 font-medium text-xs xs:text-sm mt-2 xs:mt-3 group-hover:gap-2 transition-all">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Mobile: Show More Button */}
      <div className="mt-4 xs:mt-5 sm:mt-6 text-center sm:hidden">
        <Link
          to="/blogs"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-700 transition-colors"
        >
          Browse All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RecentPosts;