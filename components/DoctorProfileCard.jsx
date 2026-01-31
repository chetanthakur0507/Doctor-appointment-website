import Image from "next/image";

export default function DoctorProfileCard({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <div className="flex gap-5">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
          {doctor.image ? (
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            doctor.name?.charAt(0) || "D"
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {doctor.name}
            <span className="text-blue-500 text-sm">✔</span>
          </h2>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">
            🏥 {doctor.department} Department
          </p>
          <p className="text-sm text-gray-500 mt-1">
            📧 {doctor.email}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            📱 {doctor.phone || "N/A"}
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 transition">
              Share
            </button>
            <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50 transition">
              Favorite
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 text-center mt-6 border-t pt-4">
        <div>
          <p className="text-lg font-semibold">₹{doctor.fees}</p>
          <p className="text-sm text-gray-500">Consultation Fee</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{doctor.experience} Yrs</p>
          <p className="text-sm text-gray-500">Experience</p>
        </div>
        <div>
          <p className="text-lg font-semibold">4.8/5</p>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  );
}
