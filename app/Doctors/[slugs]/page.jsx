import DoctorProfileCard from "@/components/DoctorProfileCard";
import AppointmentCard from "@/components/AppointmentCard";
import SectionTabs from "@/components/SectionTabs";

export const metadata = {
  title: "Doctor Profile | HealthSync",
};

export default function DoctorProfilePage() {
  return (
    <main className="bg-gray-50 min-h-screen px-4 sm:px-10 lg:px-20 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        Home / Cardiologists / <span className="text-gray-800">Dr. Jane Smith</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          <DoctorProfileCard />
          <SectionTabs />
        </div>

        {/* Right Appointment Card */}
        <AppointmentCard />
      </div>
    </main>
  );
}
