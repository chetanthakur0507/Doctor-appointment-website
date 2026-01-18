import Link from "next/link";

export default function DepartmentCard({ dept }) {
  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-md transition">
      <img
        src={dept.image}
        alt={dept.title}
        className="w-full h-44 object-cover rounded-lg"
      />

      <h3 className="text-lg font-semibold mt-4">{dept.title}</h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {dept.desc}
      </p>

      <Link
        href={`/doctors/${dept.slug}`}
        className="inline-block mt-4 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-md"
      >
        View Doctors →
      </Link>
    </div>
  );
}
