
import React, { useState } from 'react';
import '../App.css'; // Tailwind CSS styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Dashboard = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Navigate function for redirecting to home page
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsActivated(!isActivated);
    alert(isActivated ? 'Feature Deactivated!' : 'Feature Activated!');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageClick = () => {
    navigate('/home'); // Navigate to the home page when the image is clicked
  };

  return (
    <div className={`top-8 my-24 flex h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
      {/* Main Content */}
      <div className={`w-full p-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Welcome Back, to PieChart World!</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleButtonClick}
              className={`px-4 py-2 font-semibold rounded-lg transition transform ${
                isActivated
                  ? 'bg-green-500 hover:bg-green-600 hover:scale-105'
                  : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              } text-white shadow-lg hover:shadow-2xl`}
            >
              {isActivated ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 font-semibold rounded-lg transition transform ${
                isDarkMode
                  ? 'bg-yellow-500 hover:bg-yellow-600 hover:scale-105'
                  : 'bg-gray-500 hover:bg-gray-600 hover:scale-105'
              } text-white shadow-lg hover:shadow-2xl`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </header>

        {/* Centered Image with Clickable Action */}
        <div className="flex justify-center items-center h-96 mt-12">
          <div
            className="p-4 rounded shadow-md transform hover:scale-105 hover:rotate-1 transition duration-300 cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src="https://www.datylon.com/hs-fs/hubfs/Datylon%20Website2020/Landing%20Pages/Pie%20Chart%20Maker/datylon-landing-page-pie-chart-maker-styling.gif?width=1246&height=934&name=datylon-landing-page-pie-chart-maker-styling.gif"
              alt="Interactive Chart"
              className="w-64 sm:w-80 md:w-96 h-auto rounded"
            />
          </div>
        </div>

        {/* Main Widget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded shadow-md transform hover:scale-105 hover:rotate-1 transition duration-300">
            <h2 className="text-xl font-semibold">Statistics Overview</h2>
            <p className="mt-2">Detailed data and statistics will be shown here.</p>
          </div>

          <div className="p-4 rounded shadow-md transform hover:scale-105 hover:rotate-1 transition duration-300">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="mt-2">List of recent activities or events.</p>
          </div>
        </div>

        {/* Hackathon Project Section */}
        <div
  className={`mt-12 p-6 rounded shadow-lg transition-colors duration-300 ${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
  }`}
>
  <h2 className="text-2xl font-bold mb-2">Samespace Startup Company Hackathon Project</h2>
  <p className="text-lg">
    This project is part of the <span className="font-semibold">Samespace Startup Company Hackathon</span>.
    It demonstrates cutting-edge technologies like data visualization with Pie Charts, dark mode toggling, and
    interactive widgets. The hackathon's focus is on innovation and user-friendly experiences.
  </p>
  <ul className="list-disc list-inside mt-4">
    <li>Interactive Pie Chart visualization tools.</li>
    <li>Customizable themes with Dark and Light mode toggles.</li>
    <li>Widgets for data insights and recent activities.</li>
    <li>Easy navigation between the dashboard and other sections.</li>
  </ul>
  <p className="mt-4">
    Feel free to explore the project's features and contribute your ideas for future enhancements!
  </p>
</div>
      </div>
    </div>
  );
};

export default Dashboard;

