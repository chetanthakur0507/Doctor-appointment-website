export default function SectionTabs() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex gap-6 border-b pb-3 text-sm font-medium">
        <button className="text-blue-600 border-b-2 border-blue-600">
          About
        </button>
        <button className="text-gray-500">Education</button>
        <button className="text-gray-500">Reviews (148)</button>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Biography</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dr. Jane Smith is a board-certified cardiologist with over 12 years
            of experience in diagnosing and treating complex heart conditions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Education & Certifications</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🎓 Harvard Medical School (MD)</li>
            <li>🏥 Johns Hopkins University – Residency</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Patient Reviews</h3>
          <div className="space-y-4 text-sm">
            <p>
              ⭐⭐⭐⭐⭐ <b>John D.</b> – “Highly recommend!”
            </p>
            <p>
              ⭐⭐⭐⭐⭐ <b>Sarah M.</b> – “Professional and caring staff.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
