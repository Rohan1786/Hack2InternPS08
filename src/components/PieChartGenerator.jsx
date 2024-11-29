// import React, { useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto'; // Auto register all Chart.js components
// import { IoSend } from 'react-icons/io5';
// import { motion } from 'framer-motion';
// import './PieChartGenerator.css';

// const PieChartGenerator = () => {
//   const [democratic, setDemocratic] = useState(52);
//   const [republican, setRepublican] = useState(48);
//   const [chartData, setChartData] = useState(null);
//   const [inputDemocratic, setInputDemocratic] = useState('');
//   const [inputRepublican, setInputRepublican] = useState('');

//   // Function to handle form submission and update chart data
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const demValue = parseFloat(inputDemocratic);
//     const repValue = parseFloat(inputRepublican);

//     if (isNaN(demValue) || isNaN(repValue) || demValue + repValue !== 100) {
//       alert('Please enter valid percentages that add up to 100%');
//       return;
//     }

//     setDemocratic(demValue);
//     setRepublican(repValue);
//     updateChartData(demValue, repValue);
//   };

//   // Function to update chart data
//   const updateChartData = (dem, rep) => {
//     setChartData({
//       labels: ['Democratic Party', 'Republican Party'],
//       datasets: [
//         {
//           label: 'Vote Percentage',
//           data: [dem, rep],
//           backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//           borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   return (
//     <div className="container w-full min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center">
//       <h1 className="text-4xl mt-10 mb-6">2024 US Election Pie Chart Generator</h1>
//       <motion.div className="form-container p-4 rounded-lg bg-[#181818] shadow-lg">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="number"
//             value={inputDemocratic}
//             onChange={(e) => setInputDemocratic(e.target.value)}
//             placeholder="Democratic Party %"
//             className="p-2 rounded-md border-none outline-none bg-[#201f1f]"
//             min="0"
//             max="100"
//           />
//           <input
//             type="number"
//             value={inputRepublican}
//             onChange={(e) => setInputRepublican(e.target.value)}
//             placeholder="Republican Party %"
//             className="p-2 rounded-md border-none outline-none bg-[#201f1f]"
//             min="0"
//             max="100"
//           />
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition"
//           >
//             <IoSend className="mr-2" />
//             Generate Chart
//           </button>
//         </form>
//       </motion.div>
      
//       {chartData && (
//         <div className="chart-container mt-10 p-4 bg-[#181818] rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
//           <Pie
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   position: 'top',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: function (context) {
//                       return `${context.label}: ${context.raw}%`;
//                     },
//                   },
//                 },
//               },
//               animation: {
//                 animateScale: true,
//                 animateRotate: true,
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PieChartGenerator;
// import React, { useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto'; // Auto-register all Chart.js components
// import { IoSend } from 'react-icons/io5';
// import { motion } from 'framer-motion';
// import './PieChartGenerator.css';

// // Mock function to simulate AI response
// const mockGoogleGenerativeAI = async (inputPrompt) => {
//   // Simulated AI response based on the prompt
//   return `Democratic Party: 48%, Republican Party: 52%`;
// };

// const PieChartGenerator = () => {
//   const [inputPrompt, setInputPrompt] = useState('');
//   const [chartData, setChartData] = useState(null);
//   const [error, setError] = useState('');

//   // Function to handle form submission
//   const handlePromptSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setChartData(null); // Reset chart data for each new submission

//     if (!inputPrompt.trim()) {
//       setError('Please enter a valid prompt.');
//       return;
//     }

//     try {
//       // Call the mock AI function (replace with actual API call when integrating)
//       const responseText = await mockGoogleGenerativeAI(inputPrompt);

//       // Extract percentages using regex
//       const regex = /Democratic Party:\s*(\d+\.?\d*)%.*Republican Party:\s*(\d+\.?\d*)%/i;
//       const match = responseText.match(regex);

//       if (match) {
//         const demPercentage = parseFloat(match[1]);
//         const repPercentage = parseFloat(match[2]);

//         // Validate if percentages add up to 100
//         if (Math.abs(demPercentage + repPercentage - 100) > 0.1) {
//           setError('The percentages do not add up to 100%. Please check the AI response.');
//           return;
//         }

//         // Update chart data
//         updateChartData(demPercentage, repPercentage);
//       } else {
//         setError('Could not extract data from the response. Please refine your prompt.');
//       }
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setError('An error occurred while generating the chart. Please try again.');
//     }
//   };

//   // Function to update chart data
//   const updateChartData = (dem, rep) => {
//     setChartData({
//       labels: ['Democratic Party', 'Republican Party'],
//       datasets: [
//         {
//           label: 'Vote Percentage',
//           data: [dem, rep],
//           backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//           borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   return (
//     <div className="container w-full min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center">
//       <h1 className="text-4xl mt-10 mb-6">2024 US Election Pie Chart Generator</h1>
//       <motion.div className="form-container p-4 rounded-lg bg-[#181818] shadow-lg">
//         <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
//           <input
//             type="text"
//             value={inputPrompt}
//             onChange={(e) => setInputPrompt(e.target.value)}
//             placeholder="Enter your prompt here..."
//             className="p-2 rounded-md border-none outline-none bg-[#201f1f] text-white"
//           />
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition"
//           >
//             <IoSend className="mr-2" />
//             Generate Chart
//           </button>
//         </form>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </motion.div>

//       {chartData && (
//         <div className="chart-container mt-10 p-4 bg-[#181818] rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
//           <Pie
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   position: 'top',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: function (context) {
//                       return `${context.label}: ${context.raw}%`;
//                     },
//                   },
//                 },
//               },
//               animation: {
//                 animateScale: true,
//                 animateRotate: true,
//               },
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PieChartGenerator;


import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto-register all Chart.js components
import { IoSend } from 'react-icons/io5';
import { motion } from 'framer-motion';
import './PieChartGenerator.css';

const PieChartGenerator = () => {
  const [inputData, setInputData] = useState('');
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    setError('');
    setChartData(null); // Reset chart data for each new submission

    if (!inputData.trim()) {
      setError('Please enter a valid input.');
      return;
    }

    try {
      // Parse user input
      const dataEntries = inputData.split(',').map((entry) => {
        const [label, percentage] = entry.split(':').map((item) => item.trim());
        if (!label || isNaN(percentage) || percentage < 0 || percentage > 100) {
          throw new Error('Invalid input format. Use format: Label1: Percentage1, Label2: Percentage2...');
        }
        return { label, percentage: parseFloat(percentage) };
      });

      // Validate if percentages add up to 100
      const totalPercentage = dataEntries.reduce((sum, item) => sum + item.percentage, 0);
      if (Math.abs(totalPercentage - 100) > 0.1) {
        throw new Error('The percentages do not add up to 100%.');
      }

      // Update chart data
      const labels = dataEntries.map((entry) => entry.label);
      const percentages = dataEntries.map((entry) => entry.percentage);
      updateChartData(labels, percentages);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to update chart data
  const updateChartData = (labels, data) => {
    const colors = [
      'rgba(75, 192, 192, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
    ];
    setChartData({
      labels,
      datasets: [
        {
          label: 'Percentage Distribution',
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: colors.map((color) => color.replace('0.6', '1')),
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="container w-full min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center">
      <h1 className="text-4xl mt-10 mb-6">Dynamic Pie Chart Generator</h1>
      <motion.div className="form-container p-4 rounded-lg bg-[#181818] shadow-lg">
        <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter data as Label1: Percentage1, Label2: Percentage2..."
            className="p-2 rounded-md border-none outline-none bg-[#201f1f] text-white resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition"
          >
            <IoSend className="mr-2" />
            Generate Chart
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </motion.div>

      {chartData && (
        <div className="chart-container mt-10 p-4 bg-[#181818] rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: ${context.raw}%`;
                    },
                  },
                },
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PieChartGenerator;
