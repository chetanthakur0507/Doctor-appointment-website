export default function HealthcareInfo() {
  return (
    <section className="px-8 lg:px-24 py-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 rounded-3xl text-white shadow-2xl relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      
      {/* Top Badge */}
      <div className="flex justify-center mb-12 relative z-10">
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl border border-pink-400/30 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
          ✨ Trusted by 1 Lakh+ Patients · Connect With Experts ✨
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* Treatments */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
            <span className="text-3xl">💊</span>
            Treatments Available For
          </h3>
          <ul className="space-y-3 text-base text-white/90">
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Anxiety & Stress Disorders</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Depression Management</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Heart & Blood Pressure Care</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Diabetes & Lifestyle Diseases</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Pediatric Health Care</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Orthopedic & Joint Pain</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Neurological Conditions</li>
            <li className="flex items-start gap-2"><span className="text-pink-400">✓</span> Women's Health Issues</li>
          </ul>

          <button className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl w-full text-base">
            📱 WhatsApp Now
          </button>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            Why Choose Our Healthcare?
          </h3>
          <ul className="space-y-3 text-base text-white/90">
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> 1,00,000+ successful consultations</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Experienced & verified doctors</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Easy online appointment booking</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Teleconsultation & in-clinic visits</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Secure patient data & privacy</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Dedicated support team</li>
            <li className="flex items-start gap-2"><span className="text-yellow-400">★</span> Affordable consultation fees</li>
          </ul>
        </div>

        {/* Facilities */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-green-300 flex items-center gap-2">
            <span className="text-3xl">🏥</span>
            Facilities We Offer
          </h3>
          <div className="space-y-4 text-base text-white/90 leading-relaxed">
            <p>
              <span className="font-bold text-pink-300">💻 Online Consultation:</span> Video & chat consultations from home.
            </p>
            <p>
              <span className="font-bold text-blue-300">🏢 In-Clinic Appointments:</span> Book verified doctors near you.
            </p>
            <p>
              <span className="font-bold text-purple-300">📋 Medical Records:</span> Secure access to your prescriptions & history.
            </p>
            <p>
              <span className="font-bold text-yellow-300">🩺 Multiple Specialties:</span> Cardiology, Neurology, Orthopedics, Pediatrics & more.
            </p>
            <p>
              <span className="font-bold text-green-300">👨‍💼 Admin Monitoring:</span> Doctors, sessions & appointments tracked professionally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
