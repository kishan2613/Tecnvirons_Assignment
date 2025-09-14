import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  LineChart,
  PieChart,
  ArrowRight,
  PlayCircle,
  Users,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
    <div className="absolute w-screen h-screen">
      <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      }}
    ></div>
  </div>
);

const GlowingBadge = ({ icon: Icon, text, color }) => (
  <div
    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
    bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 
    shadow-lg shadow-${color}-500/10 hover:bg-${color}-500/20 transition-all duration-300`}
  >
    <Icon className="w-4 h-4 mr-2" />
    {text}
  </div>
);

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const fullText = "Smart Dashboard with Live API Data";
  const navigate = useNavigate();

  const buttons = [
    {
      text: "Open Dashboard",
      onClick: () => navigate("/dashboard"),
      className:
        "bg-gradient-to-r from-cyan-600 to-violet-800 hover:shadow-md hover:shadow-cyan-500/30",
      icon: (
        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
      ),
    },
    {
      text: "Watch Demo",
      onClick: () => setShowVideo(true), // <-- open modal
      className:
        "bg-gray-900 border border-cyan-500/30 hover:bg-gray-800 hover:border-cyan-500/50",
      icon: <PlayCircle className="ml-2 w-5 h-5 text-cyan-400" />,
    },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-black text-white font-sans overflow-hidden">
      <BackgroundEffect />
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-6 pt-32 pb-24"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlowingBadge icon={Database} text="Live Data" color="cyan" />
            <GlowingBadge icon={Users} text="User Insights" color="cyan" />
            <GlowingBadge icon={LineChart} text="Analytics" color="cyan" />
            <GlowingBadge icon={PieChart} text="Categories" color="cyan" />
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Explore Your Store Analytics
            </span>
          </h1>

          {/* Animated Subtitle */}
          <div className="h-8 mb-8">
            <span className="text-xl text-cyan-400 font-mono">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Visualize products, users, and orders in real-time with interactive
            charts and smart insights powered by the FakeStore API.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-12">
            {buttons.map(({ text, onClick, className, icon }, index) => (
              <button
                key={index}
                onClick={onClick}
                className={`group px-8 py-4 cursor-pointer rounded-xl transition-all duration-300 flex items-center justify-center font-medium text-white ${className}`}
              >
                <span>{text}</span>
                {icon}
              </button>
            ))}
          </div>
        </div>
      </motion.main>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] lg:w-[60%] aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video iframe (YouTube example) */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/n29PfKYqF9k?si=T8BxSAOR00cCxOCy"
              title="Demo Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
