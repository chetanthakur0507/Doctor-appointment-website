export default function DoctorProfileCard() {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex gap-5">
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="Doctor"
          className="w-24 h-24 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Dr. Jane Smith
            <span className="text-blue-500 text-sm">✔</span>
          </h2>
          <p className="text-gray-600">Senior Cardiologist</p>
          <p className="text-sm text-gray-500 mt-1">
            📍 New York Medical Center · 🌐 English, Spanish
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm">
              Share
            </button>
            <button className="px-4 py-2 border rounded-md text-sm">
              Favorite
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center mt-6 border-t pt-4">
        <div>
          <p className="text-lg font-semibold">2,500+</p>
          <p className="text-sm text-gray-500">Patients</p>
        </div>
        <div>
          <p className="text-lg font-semibold">12 Yrs</p>
          <p className="text-sm text-gray-500">Experience</p>
        </div>
        <div>
          <p className="text-lg font-semibold">4.9/5</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  );
}
