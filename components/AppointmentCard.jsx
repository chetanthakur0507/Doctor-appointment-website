import Link from "next/link";

export default function AppointmentCard({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Book Appointment</h3>
        <p className="text-blue-600 font-semibold">₹{doctor.fees}</p>
      </div>

      <h4 className="text-sm font-medium mb-2">Select Date</h4>
      <div className="flex gap-2 mb-4">
        {["Mon 13", "Tue 14", "Wed 15"].map((d) => (
          <button
            key={d}
            className="border px-3 py-2 rounded-md text-sm hover:bg-blue-50 transition"
          >
            {d}
          </button>
        ))}
      </div>

      <h4 className="text-sm font-medium mb-2">Available Slots</h4>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Morning</p>
          <div className="flex gap-2 flex-wrap">
            <button className="border px-3 py-1 rounded-md hover:bg-blue-50 transition">09:00 AM</button>
            <button className="border px-3 py-1 rounded-md bg-blue-600 text-white">
              10:30 AM
            </button>
            <button className="border px-3 py-1 rounded-md hover:bg-blue-50 transition">11:00 AM</button>
          </div>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Afternoon</p>
          <div className="flex gap-2 flex-wrap">
            <button className="border px-3 py-1 rounded-md hover:bg-blue-50 transition">01:30 PM</button>
            <button className="border px-3 py-1 rounded-md hover:bg-blue-50 transition">02:00 PM</button>
          </div>
        </div>
      </div>

      <Link href="/user/appointments/book" className="block w-full bg-blue-600 text-white py-3 rounded-md mt-6 text-center hover:bg-blue-700 transition font-semibold">
        Book Appointment
      </Link>

      <p className="text-xs text-gray-400 text-center mt-2">
        ✅ Consultation Fee: ₹{doctor.fees}
      </p>
    </div>
  );
}
