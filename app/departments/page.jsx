import DepartmentCard from "@/components/DepartmentCard";

export const metadata = {
  title: "Departments | HealthSync",
};

export default function DepartmentsPage() {
  const departments = [
    {
      title: "Cardiology",
      desc: "Heart health, hypertension, and cardiovascular care.",
      image: "/images/cardiology.jpg",
      slug: "cardiology",
    },
    {
      title: "Neurology",
      desc: "Brain, spinal cord, and complex nerve disorders.",
      image: "/images/neurology.jpg",
      slug: "neurology",
    },
    {
      title: "Pediatrics",
      desc: "Specialized healthcare for infants and children.",
      image: "/images/pediatrics.jpg",
      slug: "pediatrics",
    },
    {
      title: "Orthopedics",
      desc: "Bone, joint, and musculoskeletal treatments.",
      image: "/images/orthopedics.jpg",
      slug: "orthopedics",
    },
    {
      title: "Dermatology",
      desc: "Comprehensive skin, hair, and nail care.",
      image: "/images/dermatology.jpg",
      slug: "dermatology",
    },
    {
      title: "Gastroenterology",
      desc: "Digestive system and liver treatments.",
      image: "/images/gastro.jpg",
      slug: "gastroenterology",
    },
    {
      title: "Ophthalmology",
      desc: "Vision care, corrective treatments, and eye surgery.",
      image: "/images/eye.jpg",
      slug: "ophthalmology",
    },
    {
      title: "Oncology",
      desc: "Cancer diagnosis and advanced treatments.",
      image: "/images/oncology.jpg",
      slug: "oncology",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-10 lg:px-20 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Home / <span className="text-gray-800">Medical Departments</span>
      </p>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Our Specialties</h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Explore our comprehensive healthcare services. From specialized
            surgeries to routine pediatric care.
          </p>
        </div>

        <button className="border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
          🚨 Emergency Care
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          All Specialties
        </button>
        <button className="filter-btn">Surgical</button>
        <button className="filter-btn">Diagnostic</button>
        <button className="filter-btn">General Medicine</button>
        <button className="filter-btn">Pediatrics</button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <DepartmentCard key={dept.slug} dept={dept} />
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white rounded-xl mt-16 p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">
            Can not find what you are looking for?
          </h3>
          <p className="text-blue-100 mt-1">
            Our patient care team is available 24/7 to assist you.
          </p>
        </div>

        <div className="flex gap-4">
          <button className="bg-white text-blue-600 px-5 py-2 rounded-md">
            Contact Us
          </button>
          <button className="border border-white px-5 py-2 rounded-md">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
