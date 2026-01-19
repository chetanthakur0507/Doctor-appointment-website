export default function HowItWorks() {
  const steps = [
    {
      title: "Find a Doctor",
      description: "Search verified professionals by specialty or location",
      icon: "🔍",
      color: "bg-blue-500"
    },
    {
      title: "View Profile",
      description: "Check ratings, experience & availability",
      icon: "👨‍⚕️",
      color: "bg-green-500"
    },
    {
      title: "Book Instantly",
      description: "Confirm appointment easily in seconds",
      icon: "✅",
      color: "bg-purple-500"
    },
  ];

  return (
    <section className="px-4 sm:px-8 py-20 text-center bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">How It Works</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Book an appointment with top doctors in just 3 simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
              )}
              
              <div className={`w-20 h-20 mx-auto ${step.color} text-white rounded-2xl flex items-center justify-center mb-4 text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl group-hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-xl mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
