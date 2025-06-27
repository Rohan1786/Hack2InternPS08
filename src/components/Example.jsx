import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCodeSlash, IoSend, IoDownload, IoAdd } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot, TbChartPie } from 'react-icons/tb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Example = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartTitle, setChartTitle] = useState('Generated Data Visualization');
  
  const chartRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !isResponseScreen) {
      inputRef.current.focus();
    }
  }, [isResponseScreen]);

  const hitRequest = () => {
    if (!message.trim()) {
      setError('Please enter a prompt');
      return;
    }
    setError(null);
    generateResponse(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      hitRequest();
    }
  };

  const generateResponse = async (msg) => {
    setIsLoading(true);
    
    const customMessage = `\nGenerate data for provided Keyword that visualizes the data from your internal memory. Provide the output in JSON format with the following structure:
{
  "labels": ["Label1", "Label2", "Label3", ...],
  "values": [Value1, Value2, Value3, ...],
  "title": "Appropriate chart title describing the data"
}
Ensure the labels represent [WHAT_LABELS_REPRESENT] and the values represent [WHAT_VALUES_REPRESENT]. 
Values should be positive numbers suitable for a pie chart. 
Provide only the JSON content without any additional text or code blocks.`;

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyDbXFeVo5nhLk-AbwPlx7eiivQLx--HPJs');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const fullMessage = msg + customMessage;
      const result = await model.generateContent(fullMessage);

      const responseText = await result.response.text();
      const newMessages = [
        ...messages,
        { type: 'userMsg', text: msg },
        { type: 'responseMsg', text: responseText },
      ];

      setMessages(newMessages);
      setIsResponseScreen(true);
      setMessage('');
      
      const jsonData = parseJSONResponse(responseText);
      if (jsonData) {
        setChartData({
          labels: jsonData.labels,
          datasets: [{
            label: 'Data Distribution',
            data: jsonData.values,
            backgroundColor: generateColors(jsonData.labels.length),
            borderWidth: 1,
            borderColor: '#333'
          }]
        });
        setChartTitle(jsonData.title || 'Generated Data Visualization');
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseJSONResponse = (text) => {
    try {
      let jsonString = text;
      const codeBlockMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        jsonString = codeBlockMatch[1];
      }

      const jsonData = JSON.parse(jsonString);
      
      if (!jsonData.labels || !jsonData.values || 
          !Array.isArray(jsonData.labels) || 
          !Array.isArray(jsonData.values) || 
          jsonData.labels.length !== jsonData.values.length) {
        throw new Error('Invalid JSON format');
      }

      return jsonData;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setError('Failed to parse response data. The AI might have returned invalid format.');
      return null;
    }
  };

  const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    
    for (let i = 0; i < count; i++) {
      const hue = i * hueStep;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    
    return colors;
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setChartData(null);
    setError(null);
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const imageUrl = chartRef.current.toBase64Image('image/png', 1);
      const link = document.createElement('a');
      link.download = `${chartTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'chart'}.png`;
      link.href = imageUrl;
      link.click();
    }
  };

  const samplePrompts = [
    {
      text: "Market share of smartphone brands in 2023",
      icon: <IoCodeSlash />,
      color: "text-blue-400"
    },
    {
      text: "Planetary mass distribution in our solar system",
      icon: <BiPlanet />,
      color: "text-red-400"
    },
    {
      text: "Programming language popularity 2023",
      icon: <FaPython />,
      color: "text-green-400"
    },
    {
      text: "AI adoption rates by industry",
      icon: <TbMessageChatbot />,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <AnimatePresence>
        {isResponseScreen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto p-4 md:p-6 lg:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                Data Visualization
              </motion.h2>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadChart}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm"
                >
                  <IoDownload size={16} />
                  <span className="hidden sm:inline">Download</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={newChat}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm"
                >
                  <IoAdd size={16} className="rotate-45" />
                  <span className="hidden sm:inline">New</span>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg ${msg.type === 'userMsg' 
                        ? 'bg-blue-900/30 border border-blue-700/50 ml-auto max-w-3xl' 
                        : 'bg-gray-800/50 border border-gray-700/50 mr-auto max-w-3xl'}`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                </div>

                {chartData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50"
                  >
                    <div className="h-80 md:h-96">
                      <Pie 
                        ref={chartRef}
                        data={chartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: 'right' },
                            title: {
                              display: true,
                              text: chartTitle,
                              font: { size: 16 }
                            }
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                {chartData && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50"
                  >
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TbChartPie className="text-blue-400" />
                      Data Analysis
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Categories</span>
                        <span>{chartData.labels.length}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Value</span>
                        <span>
                          {chartData.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-base mb-1">Distribution</h4>
                      <div className="space-y-1 text-sm">
                        {chartData.labels.map((label, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ 
                                backgroundColor: chartData.datasets[0].backgroundColor[index] 
                              }}
                            />
                            <span className="flex-1 truncate">{label}</span>
                            <span>
                              {chartData.datasets[0].data[index]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="sticky bottom-6"
                >
                  <div className="relative">
                    <input
                      ref={inputRef}
                      className="w-full bg-gray-700/50 border border-gray-600/50 focus:border-blue-500 rounded-lg py-2 pl-3 pr-9 outline-none text-sm"
                      placeholder="Modify the chart..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-blue-400 p-1"
                      onClick={hitRequest}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <IoSend size={16} />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                AI-Powered Pie Chart Generator
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Transform your prompts into beautiful data visualizations with AI
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {samplePrompts.map((prompt, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-blue-500/50 rounded-lg p-3 cursor-pointer"
                    onClick={() => setMessage(prompt.text)}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`text-xl mt-0.5 ${prompt.color}`}>
                        {prompt.icon}
                      </span>
                      <p className="text-base">{prompt.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <input
                  ref={inputRef}
                  className="w-full bg-gray-700/50 border border-gray-600/50 focus:border-blue-500 rounded-lg py-2 pl-3 pr-9 outline-none text-sm"
                  placeholder="Describe the data you want to visualize..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-blue-400 p-1 rounded-lg heigth-8 w-8 flex items-center justify-center bg-gray-800/50 hover:bg-gray-700/50"
                  onClick={hitRequest}
                >
                  <IoSend size={1} />
                </motion.button>
              </motion.div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 text-red-400 text-xs"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Example;