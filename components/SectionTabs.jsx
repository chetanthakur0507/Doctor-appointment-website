"use client";

import { useState } from "react";

export default function SectionTabs({ doctor }) {
  const [activeTab, setActiveTab] = useState("about");

  if (!doctor) return null;

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex gap-6 border-b pb-3 text-sm font-medium">
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-3 ${
            activeTab === "about"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`pb-3 ${
            activeTab === "education"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Reviews (148)
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {activeTab === "about" && (
          <>
            {doctor.biography && (
              <div>
                <h3 className="font-semibold mb-2">Biography</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {doctor.biography}
                </p>
              </div>
            )}

            {doctor.experience && (
              <div>
                <h3 className="font-semibold mb-2">Professional Experience</h3>
                <p className="text-gray-600 text-sm">
                  {doctor.experience}+ years of professional experience in {doctor.specialization || "healthcare"}
                </p>
              </div>
            )}

            {doctor.clinicAddress && (
              <div>
                <h3 className="font-semibold mb-2">Clinic Address</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {doctor.clinicAddress}
                </p>
              </div>
            )}

            {doctor.languages && doctor.languages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      🗣️ {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "education" && (
          <>
            {doctor.education && doctor.education.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Education</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx}>🎓 {edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.certifications && doctor.certifications.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Certifications</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {doctor.certifications.map((cert, idx) => (
                    <li key={idx}>🏥 {cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {(!doctor.education || doctor.education.length === 0) &&
              (!doctor.certifications || doctor.certifications.length === 0) && (
                <p className="text-gray-500 text-sm">No education or certification information provided yet.</p>
              )}
          </>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 className="font-semibold mb-3">Patient Reviews</h3>
            <div className="space-y-4 text-sm">
              <p>
                ⭐⭐⭐⭐⭐ <b>John D.</b> – "Highly recommend!"
              </p>
              <p>
                ⭐⭐⭐⭐⭐ <b>Sarah M.</b> – "Professional and caring staff."
              </p>
              <p>
                ⭐⭐⭐⭐ <b>Michael R.</b> – "Great experience overall."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
