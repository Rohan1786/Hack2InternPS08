import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = () => {
    setIsActivated(!isActivated);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageClick = () => {
    navigate('/home');
  };

  const widgetData = [
    {
      id: 1,
      title: "Statistics Overview",
      content: "Detailed data and statistics will be shown here.",
      icon: "📊",
      stats: "75% increase",
      color: "bg-gradient-to-r from-blue-400 to-purple-500"
    },
    {
      id: 2,
      title: "Recent Activity",
      content: "List of recent activities or events.",
      icon: "🔄",
      stats: "12 new updates",
      color: "bg-gradient-to-r from-green-400 to-teal-500"
    },
    {
      id: 3,
      title: "User Engagement",
      content: "Track user interactions and engagement metrics.",
      icon: "👥",
      stats: "1.2k visitors",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      id: 4,
      title: "Performance Metrics",
      content: "System performance and response times.",
      icon: "⚡",
      stats: "98.7% uptime",
      color: "bg-gradient-to-r from-red-400 to-pink-500"
    }
  ];

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? 'bg-purple-900/20' : 'bg-blue-200/50'}`}
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with animated buttons */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-xl backdrop-blur-sm bg-white/10 shadow-lg"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Welcome to PieChart World!
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your data visualization dashboard
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <motion.button
              onClick={handleButtonClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 ${
                isActivated
                  ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                  : 'bg-gradient-to-r from-blue-400 to-indigo-600'
              } text-white`}
            >
              <motion.span
                layout
                transition={spring}
                className="w-4 h-4 rounded-full bg-white flex items-center justify-center"
              >
                {isActivated && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                )}
              </motion.span>
              {isActivated ? 'Active' : 'Activate'}
            </motion.button>

            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-yellow-300 to-amber-500 text-gray-900'
                  : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
              }`}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Animated Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">System Loading</h3>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Interactive Chart Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src="https://www.datylon.com/hs-fs/hubfs/Datylon%20Website2020/Landing%20Pages/Pie%20Chart%20Maker/datylon-landing-page-pie-chart-maker-styling.gif?width=1246&height=934&name=datylon-landing-page-pie-chart-maker-styling.gif"
                alt="Interactive Chart"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">Interactive Analytics</h3>
                  <p className="text-white/80">Click to explore our dynamic data visualization tools</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                New Feature
              </div>
            </motion.div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {widgetData.map((widget) => (
                <motion.div
                  key={widget.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + widget.id * 0.1 }}
                  className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${widget.color} text-white`}
                  onClick={() => setActiveWidget(activeWidget === widget.id ? null : widget.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-3xl mb-2">{widget.icon}</div>
                      <h3 className="text-xl font-bold mb-1">{widget.title}</h3>
                      <p className="opacity-90">{widget.content}</p>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                      {widget.stats}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {activeWidget === widget.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="pt-4 border-t border-white/20">
                          <p className="mb-2">Additional details about this widget:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Last updated: 2 hours ago</li>
                            <li>• Data accuracy: 99.8%</li>
                            <li>• Next refresh: 15 minutes</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md"
                >
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Sarah Johnson</h3>
                  <p className="text-sm opacity-80">Data Analyst</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Profile Completion</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full w-[85%]"></div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                Notifications
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      {item}
                    </div>
                    <div>
                      <h4 className="font-semibold">New update available</h4>
                      <p className="text-sm opacity-80">Version 2.{item}.0 released</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="p-6 rounded-2xl backdrop-blur-sm bg-white/10 shadow-lg"
            >
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📊", label: "New Chart" },
                  { icon: "📤", label: "Export" },
                  { icon: "⚙️", label: "Settings" },
                  { icon: "🔄", label: "Refresh" }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl mb-1">{action.icon}</span>
                    <span className="text-sm">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hackathon Project Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`mt-12 p-8 rounded-2xl shadow-xl backdrop-blur-sm ${
            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
          }`}
        >
          <motion.div 
            whileInView={{ x: [-20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Samespace Startup Company Hackathon Project
            </h2>
            <p className="text-lg leading-relaxed">
              This project is part of the <span className="font-semibold">Samespace Startup Company Hackathon</span>.
              It demonstrates cutting-edge technologies like data visualization with Pie Charts, dark mode toggling, and
              interactive widgets. The hackathon's focus is on innovation and user-friendly experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileInView={{ x: [-20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="space-y-3">
                {[
                  "Interactive Pie Chart visualization tools",
                  "Customizable themes with Dark/Light mode",
                  "Real-time data widgets with animations",
                  "Responsive design for all devices",
                  "Advanced user engagement metrics",
                  "Performance optimization techniques"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-blue-500">✓</span> {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileInView={{ x: [-20, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-6 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -left-6 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3">Project Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: "Team Members", value: "4", icon: "👥" },
                    { label: "Days to Build", value: "7", icon: "⏱️" },
                    { label: "Code Commits", value: "128", icon: "💻" },
                    { label: "Features", value: "15+", icon: "✨" }
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stat.icon}</span>
                        <span>{stat.label}</span>
                      </div>
                      <span className="font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
            >
              Learn More About the Hackathon
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;