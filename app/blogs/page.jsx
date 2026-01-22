"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogsPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const blogs = [
    {
      id: 1,
      title: "10 Tips for Better Heart Health",
      category: "Cardiology",
      author: "Dr. James Mitchell",
      date: "January 20, 2026",
      image: "🫀",
      excerpt: "Learn essential lifestyle changes and medical insights to maintain a healthy heart and prevent cardiovascular diseases.",
      readTime: "5 min read",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50"
    },
    {
      id: 2,
      title: "Complete Guide to Diabetes Management",
      category: "Endocrinology",
      author: "Dr. Sarah Johnson",
      date: "January 18, 2026",
      image: "🩺",
      excerpt: "Comprehensive guide on managing diabetes, nutrition, exercise, and insulin therapy for better blood sugar control.",
      readTime: "8 min read",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      title: "Mental Health Awareness: Breaking Stigma",
      category: "Psychiatry",
      author: "Dr. Emily Chen",
      date: "January 15, 2026",
      image: "🧠",
      excerpt: "Understanding mental health conditions and the importance of seeking help. Tips for managing stress and anxiety.",
      readTime: "6 min read",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Nutrition Tips for a Stronger Immune System",
      category: "Nutrition",
      author: "Dr. Michael Brown",
      date: "January 12, 2026",
      image: "🥗",
      excerpt: "Discover the best foods and nutrients that boost your immune system and keep you healthy year-round.",
      readTime: "7 min read",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      id: 5,
      title: "Sleep Quality and Overall Wellness",
      category: "Sleep Medicine",
      author: "Dr. Rachel White",
      date: "January 10, 2026",
      image: "😴",
      excerpt: "How quality sleep impacts your health. Proven strategies for better sleep and managing sleep disorders.",
      readTime: "6 min read",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50"
    },
    {
      id: 6,
      title: "Fitness Routines for Busy Professionals",
      category: "Fitness",
      author: "Dr. David Lee",
      date: "January 8, 2026",
      image: "💪",
      excerpt: "Quick and effective workout routines designed for people with hectic schedules. Stay fit without spending hours at the gym.",
      readTime: "5 min read",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
  ];

  const categories = ["All", "Cardiology", "Endocrinology", "Psychiatry", "Nutrition", "Sleep Medicine", "Fitness"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Medical Blogs</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Stay informed with expert health tips, medical insights, and wellness advice from our experienced doctors.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="animate-fade-in-up animation-delay-100">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-300"
                    : "bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="animate-fade-in-up group cursor-pointer h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${blog.bgColor} rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col`}>
                  {/* Image/Icon Section */}
                  <div className={`bg-gradient-to-r ${blog.color} h-40 flex items-center justify-center text-6xl relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 animate-pulse"></div>
                    <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      {blog.image}
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${blog.color} text-white`}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <span>📅 {blog.date}</span>
                        <span>⏱️ {blog.readTime}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-4">✍️ {blog.author}</p>

                      {/* Read More Button */}
                      <button
                        onClick={() => router.push(`/blogs/${blog.id}`)}
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${blog.color} hover:opacity-90 transition-all transform hover:scale-105 cursor-pointer`}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-gray-500 font-semibold">
                No blogs found for &quot;{searchTerm}&quot;. Try a different search!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 mt-20">
        <div className="px-4 sm:px-10 lg:px-20 text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest health tips and medical insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
