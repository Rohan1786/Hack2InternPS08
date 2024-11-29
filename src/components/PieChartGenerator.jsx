import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Auto-register all Chart.js components
import { IoSend } from 'react-icons/io5';
import { MdRefresh } from 'react-icons/md';
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
          throw new Error(
            'Invalid input format. Use: Label1:Percentage1, Label2:Percentage2...'
          );
        }
        return { label, percentage: parseFloat(percentage) };
      });

      // Validate if percentages add up to 100
      const totalPercentage = dataEntries.reduce(
        (sum, item) => sum + item.percentage,
        0
      );
      if (Math.abs(totalPercentage - 100) > 0.1) {
        throw new Error('Percentages must add up to 100%.');
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

  // Reset the chart and input
  const handleReset = () => {
    setInputData('');
    setChartData(null);
    setError('');
  };

  return (
    <div className="container">
      <h1 className="title">Dynamic Pie Chart Generator</h1>
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handlePromptSubmit} className="form">
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter data as Label1:Percentage1, Label2:Percentage2..."
            className="input"
          />
          <div className="button-group">
            <button type="submit" className="submit-button">
              <IoSend className="send-icon" />
              Generate Chart
            </button>
            <button type="button" onClick={handleReset} className="reset-button">
              <MdRefresh className="refresh-icon" />
              Reset
            </button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="instruction">
          Example: `Apples:40, Oranges:30, Bananas:30`
        </p>
      </motion.div>

      {chartData && (
        <div className="chart-container">
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
