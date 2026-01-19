import Link from "next/link";

export default function DepartmentCard({ dept }) {
  // Department icons mapping
  const departmentIcons = {
    cardiology: "❤️",
    neurology: "🧠",
    pediatrics: "👶",
    orthopedics: "🦴",
    dermatology: "✨",
    default: "🏥"
  };

  const icon = departmentIcons[dept.slug] || departmentIcons.default;

  return (
    <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {dept.desc}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">
          👨‍⚕️ {dept.count} Doctor{dept.count > 1 ? 's' : ''} Available
        </span>
      </div>

      <Link
        href={`/Doctors?dept=${dept.title}`}
        className="inline-block w-full text-center text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-md hover:bg-blue-100 transition font-semibold"
      >
        View Doctors →
      </Link>
    </div>
  );
}
