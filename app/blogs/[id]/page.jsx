"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogDetailPage = ({ params }) => {
  const router = useRouter();

  const blogDetails = {
    1: {
      title: "10 Tips for Better Heart Health",
      category: "Cardiology",
      author: "Dr. James Mitchell",
      date: "January 20, 2026",
      image: "🫀",
      color: "from-red-500 to-pink-500",
      readTime: "5 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Introduction</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Heart disease remains one of the leading causes of death globally, but the good news is that many cardiovascular diseases are preventable through lifestyle changes and proper medical care. In this comprehensive guide, we'll explore 10 essential tips to improve your heart health.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">1. Regular Exercise</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Aim for at least 150 minutes of moderate-intensity aerobic activity per week. This can include brisk walking, cycling, or swimming. Regular exercise strengthens your heart muscle and improves circulation.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">2. Maintain a Healthy Diet</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Follow a Mediterranean diet rich in fruits, vegetables, whole grains, and lean proteins. Reduce sodium intake and limit saturated fats to help lower cholesterol levels.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">3. Manage Stress</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Chronic stress can increase blood pressure and heart disease risk. Practice meditation, yoga, or deep breathing exercises to manage stress effectively.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">4. Get Quality Sleep</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Aim for 7-9 hours of quality sleep each night. Poor sleep is linked to heart disease, high blood pressure, and obesity.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">5. Monitor Blood Pressure</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">High blood pressure is a major risk factor for heart disease. Monitor your blood pressure regularly and maintain it below 120/80 mmHg.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">6. Control Cholesterol Levels</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Keep your LDL (bad) cholesterol low and HDL (good) cholesterol high. Regular blood tests can help monitor your cholesterol levels.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">7. Quit Smoking</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Smoking damages your heart and blood vessels. Quitting immediately reduces your risk of heart disease significantly.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">8. Limit Alcohol Consumption</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Excessive alcohol can increase blood pressure and cause heart arrhythmias. Drink in moderation or avoid it altogether.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">9. Maintain a Healthy Weight</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Obesity increases heart disease risk. Maintain a healthy BMI through balanced diet and regular exercise.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">10. Regular Health Checkups</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Visit your doctor regularly for preventive health screenings. Early detection of heart problems can save lives.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Conclusion</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Taking care of your heart is a lifelong commitment. By implementing these 10 tips, you can significantly reduce your risk of heart disease and improve your overall health and quality of life. Remember, it's never too late to start making positive changes.</p>
      `,
    },
    2: {
      title: "Complete Guide to Diabetes Management",
      category: "Endocrinology",
      author: "Dr. Sarah Johnson",
      date: "January 18, 2026",
      image: "🩺",
      color: "from-blue-500 to-cyan-500",
      readTime: "8 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Understanding Diabetes</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Diabetes is a chronic condition that affects how your body regulates blood sugar. There are two main types: Type 1 and Type 2. Proper management is crucial for preventing complications.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Blood Sugar Monitoring</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Regular blood sugar monitoring is essential. Use a glucometer to check your levels as recommended by your doctor.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Nutrition Management</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Focus on whole grains, lean proteins, and plenty of vegetables. Avoid sugary drinks and processed foods.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Exercise Benefits</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Regular physical activity helps improve insulin sensitivity and blood sugar control.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Medication Management</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Take your medications exactly as prescribed. Never skip doses without consulting your doctor.</p>
      `,
    },
    3: {
      title: "Mental Health Awareness: Breaking Stigma",
      category: "Psychiatry",
      author: "Dr. Emily Chen",
      date: "January 15, 2026",
      image: "🧠",
      color: "from-purple-500 to-indigo-500",
      readTime: "6 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Mental Health Matters</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Your mental health is just as important as your physical health. It's time to break the stigma surrounding mental illness.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Common Mental Health Conditions</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Depression, anxiety, and bipolar disorder are common conditions that affect millions. With proper treatment, they are manageable.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Seeking Professional Help</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Don't hesitate to reach out to a mental health professional. Therapy and counseling can make a significant difference.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Coping Strategies</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Practice mindfulness, maintain social connections, and engage in activities you enjoy.</p>
      `,
    },
    4: {
      title: "Nutrition Tips for a Stronger Immune System",
      category: "Nutrition",
      author: "Dr. Michael Brown",
      date: "January 12, 2026",
      image: "🥗",
      color: "from-green-500 to-emerald-500",
      readTime: "7 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Immune System Basics</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">A strong immune system helps your body fight infections and diseases. Nutrition plays a vital role in maintaining immunity.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Key Nutrients for Immunity</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Include vitamin C, vitamin D, zinc, and selenium in your diet. These nutrients are essential for immune function.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Immune-Boosting Foods</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Incorporate citrus fruits, berries, garlic, ginger, and nuts into your daily meals.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Hydration</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Drink plenty of water to support your immune system and overall health.</p>
      `,
    },
    5: {
      title: "Sleep Quality and Overall Wellness",
      category: "Sleep Medicine",
      author: "Dr. Rachel White",
      date: "January 10, 2026",
      image: "😴",
      color: "from-indigo-500 to-blue-500",
      readTime: "6 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Sleep Science</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Quality sleep is crucial for physical and mental health. During sleep, your body repairs itself and consolidates memories.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Sleep Stages</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">There are four stages of sleep, including REM sleep. A complete sleep cycle lasts about 90 minutes.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Sleep Disorders</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Insomnia, sleep apnea, and restless leg syndrome are common disorders that affect sleep quality.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Improving Sleep</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Maintain a consistent sleep schedule, create a dark environment, and avoid screens before bedtime.</p>
      `,
    },
    6: {
      title: "Fitness Routines for Busy Professionals",
      category: "Fitness",
      author: "Dr. David Lee",
      date: "January 8, 2026",
      image: "💪",
      color: "from-orange-500 to-red-500",
      readTime: "5 min read",
      content: `
        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Making Time for Fitness</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Busy professionals can still maintain fitness with efficient, time-saving workout routines.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">HIIT Workouts</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">High-Intensity Interval Training provides maximum benefits in minimum time. 20-30 minutes is sufficient.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Home Workouts</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">You don't need a gym. Bodyweight exercises like push-ups, squats, and planks are highly effective.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">Consistency Matters</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">Regular, shorter workouts are better than occasional intense sessions. Aim for 3-4 workouts per week.</p>
      `,
    },
  };

  const blog = blogDetails[params.id];

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog you are looking for does not exist.</p>
          <Link
            href="/blogs"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${blog.color} text-white py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 animate-pulse"></div>

        <div className="relative z-10 px-4 sm:px-10 lg:px-20">
          <div className="animate-fade-in-up max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold mb-6 backdrop-blur">
              {blog.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">{blog.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-blue-100">
              <span>✍️ {blog.author}</span>
              <span>📅 {blog.date}</span>
              <span>⏱️ {blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Section */}
      <div className="flex justify-center py-12">
        <div className={`text-9xl animate-bounce`}>{blog.image}</div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12 max-w-3xl mx-auto">
        <div
          className="prose prose-lg max-w-none animate-fade-in-up"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Author Card */}
      <div className="px-4 sm:px-10 lg:px-20 py-12 max-w-3xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-8 border-l-4 border-blue-600 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">About the Author</h3>
          <p className="text-gray-700 mb-4">
            {blog.author} is a highly experienced medical professional with expertise in {blog.category}. With years of clinical practice and research, Dr. shares valuable insights to help patients make informed health decisions.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {blog.author.charAt(4)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{blog.author}</p>
              <p className="text-sm text-gray-600">{blog.category} Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-10 lg:px-20 py-12 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/blogs"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            ← Back to Blogs
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Blog URL copied to clipboard!");
            }}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            📎 Share
          </button>
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="bg-gray-100 py-16 mt-12">
        <div className="px-4 sm:px-10 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">More Health Tips</h2>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blogs"
              className="block text-center py-4 px-8 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Explore All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
