import SectionHead from "@/components/Section_Head";

export const metadata = {
  title: "Departments | Medi.care",
  description: "Explore our medical departments and specialties.",
};

export default function DepartmentsPage() {
  const departments = [
    { name: "Cardiology", desc: "Heart and vascular care" },
    { name: "Neurology", desc: "Brain and nervous system" },
    { name: "Orthopedics", desc: "Bones, joints and spine" },
    { name: "Pediatrics", desc: "Child and adolescent care" },
    { name: "Gynecology", desc: "Women’s health services" },
    { name: "Dental", desc: "Oral and dental care" },
  ];

  return (
    <main className="min-h-screen bg-light-50">
      <section className="px-4 sm:px-10 lg:px-20 pt-10 pb-16">
        <SectionHead text="Our Departments" />
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We provide comprehensive care across a wide range of specialties.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d) => (
            <article
              key={d.name}
              className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {d.name}
              </h3>
              <p className="mt-2 text-gray-600">{d.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
