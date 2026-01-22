"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Last Updated: January 22, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-10 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 animate-fade-in-up">
            {/* Introduction */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🔒</span>
                <h2 className="text-3xl font-bold text-gray-800">Your Privacy Matters</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                At Medi.care, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our healthcare services and website.
              </p>
            </div>

            {/* Information We Collect */}
            <section className="mb-10 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>📋</span> Information We Collect
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Personal Information:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Name, email address, phone number, and date of birth</li>
                    <li>Residential address and emergency contact details</li>
                    <li>Government-issued ID and insurance information</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Medical Information:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Medical history, symptoms, and diagnoses</li>
                    <li>Prescriptions, treatment plans, and test results</li>
                    <li>Doctors notes and consultation records</li>
                    <li>Health insurance and claims information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technical Information:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>IP address, browser type, and device information</li>
                    <li>Cookies and usage data</li>
                    <li>Access times and referring website addresses</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-10 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>⚙️</span> How We Use Your Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li>Provide medical consultations, treatments, and healthcare services</li>
                <li>Schedule and manage appointments with healthcare providers</li>
                <li>Process payments and insurance claims</li>
                <li>Maintain medical records and health history</li>
                <li>Send appointment reminders and health notifications</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Conduct research and quality improvement initiatives (with your consent)</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-10 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🤝</span> Information Sharing and Disclosure
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We do not sell your personal or medical information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li><strong>Healthcare Providers:</strong> With doctors, nurses, and medical staff involved in your care</li>
                <li><strong>Insurance Companies:</strong> For processing claims and verifying coverage</li>
                <li><strong>Legal Compliance:</strong> When required by law, court order, or regulatory authorities</li>
                <li><strong>Emergency Situations:</strong> To protect your vital interests or public health</li>
                <li><strong>Service Providers:</strong> With trusted third parties who assist in our operations (under strict confidentiality agreements)</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-10 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🛡️</span> Data Security
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li>256-bit SSL encryption for all data transmission</li>
                <li>Secure, encrypted databases with access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data privacy and security</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular data backups and disaster recovery plans</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-10 p-6 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>✅</span> Your Privacy Rights
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
                <li>Access and obtain copies of your personal and medical information</li>
                <li>Request corrections to inaccurate or incomplete information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Restrict or object to certain data processing activities</li>
                <li>Receive your information in a portable format</li>
                <li>File a complaint with relevant privacy authorities</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                To exercise these rights, please contact us at <span className="text-blue-600 font-semibold">privacy@medicare.com</span>
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🍪</span> Cookies and Tracking
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings. Note that disabling cookies may limit some website functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>👶</span> Childrens Privacy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under 13 years of age. For minors aged 13-17, we require parental or guardian consent. If you believe we have collected information from a child without proper consent, please contact us immediately.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🔄</span> Changes to This Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or website notice. Continued use of our services after changes indicates your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>📧</span> Contact Us
              </h3>
              <p className="mb-4 leading-relaxed">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@medicare.com</p>
                <p><strong>Phone:</strong> +1 (555) 000-1234</p>
                <p><strong>Address:</strong> 123 Healthcare Way, Medical District</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animation-delay-200">
            <Link href="/terms" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📜</span> Terms of Service
              </h4>
              <p className="text-gray-600 text-sm">Read our terms and conditions</p>
            </Link>
            <Link href="/help" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>❓</span> Help Center
              </h4>
              <p className="text-gray-600 text-sm">Get answers to your questions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
