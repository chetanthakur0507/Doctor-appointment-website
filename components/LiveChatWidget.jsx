"use client";

import { useEffect, useRef, useState } from "react";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I am your medical assistant. Ask about appointments, doctors, or symptoms.",
      time: timestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function timestamp() {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const quickPrompts = [
    "How do I book an appointment?",
    "What is the emergency number?",
    "Clinic address?",
    "Fees and insurance?",
    "Cold and cough care?",
    "Stomach pain tips?",
  ];

  const localFallback = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("appointment") || lower.includes("book") || lower.includes("अपॉइंट")) {
      return "Appointments:\n• Go to Book Appointment page\n• Choose doctor and slot\n• Or call: +1 (555) 000-1234";
    }
    if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("आपात")) {
      return "Emergency 24/7:\n• Call: +1 (555) 999-9999\n• If severe, dial 911 or visit nearest hospital";
    }
    if (lower.includes("doctor") || lower.includes("specialist") || lower.includes("डॉक्टर")) {
      return "Doctors available:\nCardiologist, Neurologist, Pediatrician, Orthopedic, Gynecologist, Endocrinologist";
    }
    if (lower.includes("address") || lower.includes("location") || lower.includes("पता")) {
      return "Address:\n123 Healthcare Way, Medical District\nPhone: +1 (555) 000-1234";
    }
    if (lower.includes("fever") || lower.includes("बुखार")) {
      return "Fever tips:\nHydrate, rest, light clothes, cold compress.\nSee a doctor if >102°F or lasting >3 days.";
    }
    if (lower.includes("cold") || lower.includes("cough") || lower.includes("sardi") || lower.includes("khaasi")) {
      return "Cold & cough care:\n• Warm water, steam inhalation\n• Saline nasal spray for stuffy nose\n• Honey-ginger tea (if not diabetic)\n• Avoid cold drinks and rest well\nSee a doctor if high fever or breathing trouble.";
    }
    if (lower.includes("stomach") || lower.includes("abdominal") || lower.includes("pet")) {
      return "Stomach pain basics:\n• Sip ORS/water, avoid heavy or spicy food\n• Eat light (khichdi/bananas/toast)\n• No painkillers on empty stomach\n• Watch for vomiting, fever, blood in stool\nSee a doctor if severe or persistent.";
    }
    if (lower.includes("bp") || lower.includes("blood pressure")) {
      return "Blood pressure care:\n• Limit salt, avoid fried food\n• 30 min walk daily, manage stress\n• No smoking, limit alcohol\n• Take prescribed meds on time\nCheck with cardiologist if dizzy or chest pain.";
    }
    if (lower.includes("diabetes") || lower.includes("sugar") || lower.includes("glucose")) {
      return "Diabetes basics:\n• Balanced meals, low added sugar\n• Walk 30 min daily\n• Monitor blood sugar as advised\n• Take medicines/insulin on schedule\nConsult endocrinologist for dosing changes.";
    }
    if (lower.includes("headache") || lower.includes("migraine")) {
      return "Headache relief:\n• Hydrate and rest in a dark, quiet room\n• Cold pack on forehead/neck\n• Avoid long screens and loud noise\nSee doctor if very severe, with vomiting or vision issues.";
    }
    return "I am here to help with appointments, doctors, emergency numbers, and common symptoms. If urgent, call the hospital.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setError("");
    const userText = input.trim();
    setInput("");

    const userMsg = { role: "user", text: userText, time: timestamp() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, conversationHistory: messages.slice(-5) }),
      });

      const data = await res.json();
      if (!res.ok || !data?.response) {
        throw new Error(data?.error || "No response");
      }

      const botMsg = { role: "bot", text: data.response, time: timestamp() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat send error", err);
      const fallback = localFallback(userText);
      const botMsg = {
        role: "bot",
        text: `${fallback}\n\n⚪ Using Fallback Responses`,
        time: timestamp(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-blue-100 p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-800">AI Medical Assistant</div>
              <div className="text-xs text-gray-500">Ask about appointments, doctors, help</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
                className="px-3 py-1 text-xs rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="h-52 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-2xl rounded-bl-none text-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                  <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          <div className="mt-3 flex items-start gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="flex-1 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none p-3 text-sm bg-gray-50"
              placeholder="Type your question..."
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-md"
            >
              Send
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500">
            <span>AI helper</span>
            <span>Emergency? Call hospital.</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white w-16 h-16 shadow-[0_12px_30px_rgba(37,99,235,0.35)] flex items-center justify-center text-2xl transition-all transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open live chat"
        title="Ask a question"
      >
        💬
      </button>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
      `}</style>
    </div>
  );
}
