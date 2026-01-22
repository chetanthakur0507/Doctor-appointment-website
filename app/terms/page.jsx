"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
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
                <span className="text-4xl">📜</span>
                <h2 className="text-3xl font-bold text-gray-800">Agreement to Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Medi.care. By accessing or using our website and healthcare services, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services. If you do not agree with any part of these terms, you should not use our services.
              </p>
            </div>

            {/* Acceptance of Terms */}
            <section className="mb-10 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>✅</span> Acceptance of Terms
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By creating an account, booking appointments, or using any of our services, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You have read and understood these Terms of Service</li>
                <li>You agree to comply with all applicable laws and regulations</li>
                <li>You are at least 18 years old or have parental/guardian consent</li>
                <li>You will provide accurate and truthful information</li>
                <li>You accept responsibility for maintaining account security</li>
              </ul>
            </section>

            {/* Services Provided */}
            <section className="mb-10 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🏥</span> Services Provided
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Medi.care provides the following healthcare services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Online appointment booking and management system</li>
                <li>In-person and video consultations with licensed doctors</li>
                <li>Medical records management and storage</li>
                <li>Prescription services and medication management</li>
                <li>Diagnostic and laboratory services</li>
                <li>Emergency healthcare services</li>
                <li>Health information and educational resources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-10 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>👤</span> User Responsibilities
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate, current, and complete personal and medical information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Arrive on time for scheduled appointments or cancel in advance</li>
                <li>Follow medical advice and treatment plans prescribed by doctors</li>
                <li>Pay all applicable fees and charges promptly</li>
                <li>Respect healthcare providers and staff</li>
                <li>Not misuse or abuse our services or website</li>
                <li>Not share prescription medications with others</li>
              </ul>
            </section>

            {/* Appointments and Cancellations */}
            <section className="mb-10 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>📅</span> Appointments and Cancellations
              </h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">Booking Appointments:</h4>
                  <p className="leading-relaxed">
                    Appointments can be booked through our website or by phone. Appointment availability is subject to doctor schedules and may change without notice.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cancellation Policy:</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Cancellations must be made at least 24 hours in advance for a full refund</li>
                    <li>Cancellations within 24 hours may incur a cancellation fee</li>
                    <li>No-shows may be charged the full consultation fee</li>
                    <li>Emergency cancellations will be considered on a case-by-case basis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Late Arrivals:</h4>
                  <p className="leading-relaxed">
                    If you arrive more than 15 minutes late, your appointment may be rescheduled to accommodate other patients.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-10 p-6 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>💳</span> Payment Terms
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Payment is due at the time of service unless prior arrangements are made</li>
                <li>We accept cash, credit/debit cards, UPI, and insurance</li>
                <li>All fees are subject to change with notice</li>
                <li>You are responsible for charges not covered by insurance</li>
                <li>Unpaid balances may be sent to collections</li>
                <li>Refunds are processed according to our refund policy</li>
              </ul>
            </section>

            {/* Medical Disclaimer */}
            <section className="mb-10 p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>⚠️</span> Medical Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Important:</strong> The information and services provided are for medical purposes only and should not replace professional medical advice, diagnosis, or treatment.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Always seek advice from qualified healthcare professionals</li>
                <li>Never disregard professional medical advice or delay seeking it</li>
                <li>In case of medical emergency, call emergency services immediately</li>
                <li>We do not guarantee specific treatment outcomes</li>
                <li>Individual results may vary based on various factors</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>©</span> Intellectual Property
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All content on our website, including text, graphics, logos, images, videos, and software, is the property of Medi.care or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🔒</span> Privacy and Data Protection
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">Privacy Policy</Link>. By using our services, you consent to the collection and use of your information as described in the Privacy Policy.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>⚖️</span> Limitation of Liability
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our liability is limited to the amount paid for services</li>
                <li>We are not responsible for third-party services or content</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Medical outcomes are not guaranteed</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🚫</span> Termination
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate your account and access to services at our discretion, without notice, for violations of these Terms of Service, fraudulent activity, abusive behavior, or any other reason we deem appropriate. You may close your account at any time by contacting us.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>🔄</span> Changes to Terms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms of Service periodically. We will notify you of significant changes via email or website notice. Your continued use of our services after changes constitutes acceptance of the updated terms. We encourage you to review these terms regularly.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span>⚖️</span> Governing Law
              </h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which Medi.care operates, without regard to conflict of law principles. Any disputes shall be resolved in the courts of that jurisdiction.
              </p>
            </section>

            {/* Contact */}
            <section className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span>📧</span> Contact Us
              </h3>
              <p className="mb-4 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@medicare.com</p>
                <p><strong>Phone:</strong> +1 (555) 000-1234</p>
                <p><strong>Address:</strong> 123 Healthcare Way, Medical District</p>
              </div>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animation-delay-200">
            <Link href="/privacy" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>🔒</span> Privacy Policy
              </h4>
              <p className="text-gray-600 text-sm">Learn how we protect your data</p>
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
