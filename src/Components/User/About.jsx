import React, { useState, useEffect, useRef } from "react";
import mission from "../../Images/mission1.png";
import {
  FaUserGraduate,
  FaAward,
  FaServicestack,
  FaStar,
  FaUser,
  FaAccusoft,
  FaRocket,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Background image (your provided link)
const herosection =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDq3OZdacoEoDWLyfsxJGOy-0KFKah59UDmeHIY6-4E5WIgNkCLHIs4exvmVBo6vfd0Q&usqp=CAU";

// Counter component for animated numbers
const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = countRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime = null;
          const startValue = 0;
          const endValue = end;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(startValue + easeOutQuart * (endValue - startValue));
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          
          // Disconnect observer after animation starts
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (element) {
      observerRef.current = observer;
      observer.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

const About = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800">
      {/* === HERO SECTION === */}
      <section className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
        <img
          src={herosection}
          alt="About background"
          className="absolute inset-0 w-full h-full object-cover transform scale-105 brightness-[0.75] blur-[1px]"
        />
        {/* Slightly stronger bluish overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/55 via-sky-900/50 to-indigo-900/50"></div>

        <div className="relative z-10 px-8 sm:px-16 lg:px-24 text-center">
          {/* Title in teal blue */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 animate-fade-in drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
            style={{ color: "#0096B3" }}
          >
            About Our Journey
          </h1>

          <p className="text-lg sm:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)] animate-fade-in-delayed">
            We simplify compliance and licensing with technology, trust, and
            transparency — helping people and businesses thrive effortlessly.
          </p>
        </div>
      </section>

      {/* === MISSION SECTION === */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-20 px-6 lg:px-16 bg-white relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-200 to-sky-200 rounded-full blur-3xl opacity-40"></div>

        {/* Left: Mission Text */}
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaRocket className="text-white text-xl" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-sky-700 to-indigo-700 bg-clip-text text-transparent">
              Our Mission
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-slate-600">
            We are dedicated to creating a fair, transparent, and sustainable
            ecosystem where efficiency meets reliability. Our focus is on
            empowering businesses and individuals through smart licensing and
            trusted compliance services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              "Customer-Centric Approach",
              "Sustainable Growth",
              "Transparent Operations",
              "Long-term Partnerships",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="bg-gradient-to-tr from-emerald-500 to-sky-500 p-2 rounded-md">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <span className="font-semibold text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mission Image */}
        <div className="flex-1 mt-10 lg:mt-0 flex justify-center relative z-10">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition"></div>
            <img
              src={mission}
              alt="Mission illustration"
              className="rounded-2xl shadow-2xl max-h-[500px] object-cover transform transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50 text-center">
        <div className="max-w-[95%] mx-auto px-12">
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-sky-700 via-indigo-700 to-emerald-700 bg-clip-text text-transparent mb-8">
            Why Choose Us
          </h2>
          <p className="text-xl text-slate-600 max-w-5xl mx-auto mb-16 leading-relaxed">
            We combine innovation and integrity to provide solutions that are
            not only efficient but also ethical and impactful.
          </p>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Expert Guidance",
                desc: "Our team of seasoned professionals ensures smooth, compliant processes for every client.",
                icon: <FaUserGraduate />,
                color: "from-sky-500 to-indigo-600",
              },
              {
                title: "Quality Assurance",
                desc: "We never compromise on service excellence, ensuring every project meets regulatory standards.",
                icon: <FaAward />,
                color: "from-indigo-500 to-emerald-600",
              },
              {
                title: "Fast & Reliable",
                desc: "Swift turnaround times with accuracy — so your goals stay on track.",
                icon: <FaServicestack />,
                color: "from-emerald-500 to-sky-500",
              },
              {
                title: "Cost-Effective",
                desc: "Value-driven services that don't just fit your budget — they exceed expectations.",
                icon: <FaStar />,
                color: "from-violet-500 to-indigo-500",
              },
              {
                title: "Client Focused",
                desc: "We prioritize relationships, not transactions — your trust defines our success.",
                icon: <FaUser />,
                color: "from-amber-500 to-pink-500",
              },
              {
                title: "Innovation-Driven",
                desc: "Constantly improving our systems to make compliance faster, simpler, and smarter.",
                icon: <FaAccusoft />,
                color: "from-cyan-500 to-emerald-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl shadow-xl p-10 border border-slate-100 hover:-translate-y-3 hover:shadow-2xl transition duration-500"
              >
                <div
                  className={`inline-flex items-center justify-center p-6 mb-6 text-white bg-gradient-to-br ${item.color} rounded-2xl shadow-lg transform transition group-hover:scale-110`}
                >
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed px-4">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 mt-16 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition hover:-translate-y-1"
          >
            <FaRocket className="text-xl" />
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="py-28 bg-white text-center">
        <div className="max-w-[95%] mx-auto px-12">
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-16">
            What Our Clients Say
          </h2>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Josh Tyson",
                role: "Product Manager, Capsule",
                quote:
                  "With their expert guidance, we navigated complex requirements effortlessly. Highly recommended!",
              },
              {
                name: "Luisa",
                role: "Operations Director, Fitbit",
                quote:
                  "Exceptional service and attention to detail. The entire certification process was stress-free.",
              },
              {
                name: "Alisa Williams",
                role: "Entrepreneur",
                quote:
                  "Professional, efficient, and incredibly knowledgeable. They exceeded our expectations at every step.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-100 p-12 hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className="text-yellow-400 mx-0.5 text-xl"
                    />
                  ))}
                </div>
                <p className="text-xl text-slate-700 italic mb-8 leading-relaxed px-4">
                  "{t.quote}"
                </p>
                <h4 className="font-semibold text-2xl text-slate-800">
                  {t.name}
                </h4>
                <p className="text-lg text-slate-500 mt-2">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STATS SECTION === */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-sky-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: 2500, suffix: "+", label: "Licenses Issued" },
            { value: 98, suffix: "%", label: "Client Satisfaction" },
            { value: 1200, suffix: "+", label: "Renewals Processed" },
            { value: 500, suffix: "+", label: "Positive Feedbacks" },
          ].map((s, i) => (
            <div
              key={i}
              className="transition transform hover:-translate-y-2 hover:scale-[1.03]"
            >
              <div className="text-5xl font-extrabold mb-2">
                <Counter end={s.value} suffix={s.suffix} duration={2000} />
              </div>
              <p className="text-lg font-medium opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === CONSULTATION CTA === */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900 relative text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_70%)]"></div>
        <div className="relative z-10 px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Free Consultation Available
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Let our experts guide you through every step of your licensing
            process. Receive personalized insights — absolutely free.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-sky-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            <FaRocket className="text-lg" />
            Get Your Free Consultation
          </Link>

          <p className="mt-4 text-slate-400 text-sm">
            No obligations • Expert guidance • Personalized strategy
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;