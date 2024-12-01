
// import React, { useState } from 'react';
// import './Example.css';
// import { IoCodeSlash, IoSend } from 'react-icons/io5';
// import { BiPlanet } from 'react-icons/bi';
// import { FaPython } from 'react-icons/fa';
// import { TbMessageChatbot } from 'react-icons/tb';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend);

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [isResponseScreen, setIsResponseScreen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [tokenData, setTokenData] = useState(null);
//   const [count, setCount] = useState(0);
//   const chartRef = React.useRef(null);

//   const hitRequest = () => {
//     if (message) {
//       generateResponse(message);
//     } else {
//       alert('You must write something... !');
//     }
//   };

//   const generateResponse = async (msg) => {
//     if (!msg) return;

//     try {
//       const genAI = new GoogleGenerativeAI('AIzaSyDbXFeVo5nhLk-AbwPlx7eiivQLx--HPJs');
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       const result = await model.generateContent(msg);

//       const responseText = result.response.text();
//       const newMessages = [
//         ...messages,
//         { type: 'userMsg', text: msg },
//         { type: 'responseMsg', text: responseText },
//       ];

//       setMessages(newMessages);
//       setIsResponseScreen(true);
//       setMessage('');
//       setCount(count + 1);
//       console.log(responseText);

//       const numericalData = extractNumericalData(responseText);
//       if (numericalData) {
//         setTokenData(numericalData);
//       } else {
//         console.log('No numerical data found in the response.');
//       }
//     } catch (error) {
//       console.error('Error generating response:', error);
//       alert('Something went wrong while generating the response.');
//     }
//   };

//   const extractNumericalData = (text) => {
//     const numberRegex = /(\d+\.?\d*)\s?(%|points|runs|goals|votes|ratio|out of|total)?/g;
//     const matches = [];
//     let match;

//     while ((match = numberRegex.exec(text)) !== null) {
//       const value = match[1];
//       const label = match[2] ? match[2] : 'Count';
//       matches.push({ label, value: parseFloat(value) });
//     }

//     if (matches.length > 0) {
//       const labels = matches.map((item) => item.label);
//       const data = matches.map((item) => item.value);
//       const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'];

//       return {
//         labels,
//         datasets: [
//           {
//             label: 'Numerical Data',
//             data,
//             backgroundColor: backgroundColors.slice(0, matches.length),
//           },
//         ],
//       };
//     }

//     return null;
//   };

//   const newChat = () => {
//     setIsResponseScreen(false);
//     setMessages([]);
//     setTokenData(null);
//     setCount(0);
//   };

//   const downloadChart = () => {
//     if (chartRef.current) {
//       const imageUrl = chartRef.current.toBase64Image();
//       if (imageUrl) {
//         const link = document.createElement('a');
//         link.download = 'pie-chart.png';
//         link.href = imageUrl;
//         link.click();
//       } else {
//         console.error('Chart image could not be generated');
//       }
//     } else {
//       console.error('Chart reference is not defined');
//     }
//   };

//   return (
//     <div className="container w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
//       {isResponseScreen ? (
//         <div className="h-[80vh] px-4 md:px-10 lg:px-20">
//           <div className="header pt-[25px] flex items-center justify-between">
//             <h2 className="text-2xl">AssistMe</h2>
//             <button
//               id="newChatBtn"
//               className="bg-[#181818] p-2 md:p-3 rounded-[30px] cursor-pointer text-sm md:text-[14px] px-4 md:px-8"
//               onClick={newChat}
//             >
//               New Chat
//             </button>
//           </div>

//           <div className="messages mt-4">
//             {messages.map((msg, index) => (
//               <div key={index} className={`${msg.type} mb-2`}>{msg.text}</div>
//             ))}
//           </div>

//           {/* Display Pie Chart */}
//           {tokenData && (
//             <div className="mt-4">
//               <div className="relative">
//                 <Pie ref={chartRef} data={tokenData} />
//                 <button
//                   className="absolute top-0 right-0 bg-[#201f1f] p-2 rounded cursor-pointer"
//                   onClick={downloadChart}
//                 >
//                   Download Chart
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Display "Numeric Data Analysis" section */}
//           {tokenData && (
//             <div className="mt-4">
//               <h3 className="text-xl mb-2">Numeric Data Analysis</h3>
//               <div className="bg-[#202020] p-4 rounded-md">
//                 <p className="text-gray-300">Here's a breakdown of the numerical data found:</p>
//                 <ul className="list-disc pl-5 mt-2">
//                   {tokenData.labels.map((label, index) => (
//                     <li key={index}>
//                       {label}: {tokenData.datasets[0].data[index]}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
//           <h1 className="text-4xl mb-6">Assist Me To Create Py-Chart</h1>
//           <div className="boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 What is coding? <br />
//                 How can we learn it?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><IoCodeSlash /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 Which is the red <br />
//                 planet of the solar <br />
//                 system?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><BiPlanet /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 In which year was Python <br />
//                 invented?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><FaPython /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 How can we use <br />
//                 AI for adoption?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><TbMessageChatbot /></i>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bottom w-full flex flex-col items-center mt-4">
//         <div className="inputBox w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-[15px] py-2 flex items-center bg-[#181818] rounded-[30px]">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             type="text"
//             className="p-2 pl-4 bg-transparent flex-1 outline-none border-none"
//             placeholder="Write your message here..."
//             id="messageBox"
//           />
//           {message === '' ? (
//             ''
//           ) : (
//             <i onClick={hitRequest} className="cursor-pointer text-[20px]"><IoSend /></i>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Example;


// import React, { useState } from 'react';
// import './Example.css';
// import { IoCodeSlash, IoSend } from 'react-icons/io5';
// import { BiPlanet } from 'react-icons/bi';
// import { FaPython } from 'react-icons/fa';
// import { TbMessageChatbot } from 'react-icons/tb';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // Register all required components for Chart.js
// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [isResponseScreen, setIsResponseScreen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [tokenData, setTokenData] = useState(null);
//   const [count, setCount] = useState(0);
//   const chartRef = React.useRef(null);

//   const hitRequest = () => {
//     if (message) {
//       generateResponse(message);
//     } else {
//       alert('You must write something... !');
//     }
//   };

//   const generateResponse = async (msg) => {
//     if (!msg) return;

//     try {
//       const genAI = new GoogleGenerativeAI('AIzaSyDbXFeVo5nhLk-AbwPlx7eiivQLx--HPJs');
//       // const genAI = new GoogleGenerativeAI('4dc47aa03e324484bae96894b62c3bbf');
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       const result = await model.generateContent(msg);

//       const responseText = result.response.text();
//       const newMessages = [
//         ...messages,
//         { type: 'userMsg', text: msg },
//         { type: 'responseMsg', text: responseText },
//       ];

//       setMessages(newMessages);
//       setIsResponseScreen(true);
//       setMessage('');
//       setCount(count + 1);
//       console.log(responseText);

//       const numericalData = extractNumericalData(responseText);
//       if (numericalData) {
//         setTokenData(numericalData);
//       } else {
//         console.log('No numerical data found in the response.');
//       }
//     } catch (error) {
//       console.error('Error generating response:', error);
//       alert('Something went wrong while generating the response.');
//     }
//   };

//   const extractNumericalData = (text) => {
//     const numberRegex = /(\d+\.?\d*)\s?(%|points|runs|goals|votes|ratio|out of|total)?/g;
//     const matches = [];
//     let match;

//     while ((match = numberRegex.exec(text)) !== null) {
//       const value = match[1];
//       const label = match[2] ? match[2] : 'Count';
//       matches.push({ label, value: parseFloat(value) });
//     }

//     if (matches.length > 0) {
//       const labels = matches.map((item) => item.label);
//       const data = matches.map((item) => item.value);
//       const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'];

//       return {
//         labels,
//         datasets: [
//           {
//             label: 'Numerical Data',
//             data,
//             backgroundColor: backgroundColors.slice(0, matches.length),
//           },
//         ],
//       };
//     }

//     return null;
//   };

//   const newChat = () => {
//     setIsResponseScreen(false);
//     setMessages([]);
//     setTokenData(null);
//     setCount(0);
//   };

//   const downloadChart = () => {
//     if (chartRef.current) {
//       const imageUrl = chartRef.current.toBase64Image();
//       if (imageUrl) {
//         const link = document.createElement('a');
//         link.download = 'pie-chart.png';
//         link.href = imageUrl;
//         link.click();
//       } else {
//         console.error('Chart image could not be generated');
//       }
//     } else {
//       console.error('Chart reference is not defined');
//     }
//   };

//   return (
//     <div className="container top-16 mx-14 px-2 w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
//       {isResponseScreen ? (
//         <div className="h-[80vh] px-4 md:px-10 lg:px-20">
//           <div className="header pt-[25px] flex items-center justify-between">
//             <h2 className="text-2xl">AssistMe</h2>
//             <button
//               id="newChatBtn"
//               className="bg-[#181818] p-2 md:p-3 rounded-[30px] cursor-pointer text-sm md:text-[14px] px-4 md:px-8"
//               onClick={newChat}
//             >
//               New Chat
//             </button>
//           </div>

//           <div className="messages mt-4">
//             {messages.map((msg, index) => (
//               <div key={index} className={`${msg.type} mb-2`}>{msg.text}</div>
//             ))}
//           </div>

//           {/* Display Pie Chart */}
//           {tokenData && (
//             <div className="mt-4">
//               <div className="relative">
//                 <Pie ref={chartRef} data={tokenData} />
//                 <button
//                   className="absolute top-0 right-0 bg-[#201f1f] p-2 rounded cursor-pointer"
//                   onClick={downloadChart}
//                 >
//                   Download Chart
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Display "Numeric Data Analysis" section */}
//           {tokenData && (
//             <div className="mt-4">
//               <h3 className="text-xl mb-2">Numeric Data Analysis</h3>
//               <div className="bg-[#202020] p-4 rounded-md">
//                 <p className="text-gray-300">Here's a breakdown of the numerical data found:</p>
//                 <ul className="list-disc pl-5 mt-2">
//                   {tokenData.labels.map((label, index) => (
//                     <li key={index}>
//                       {label}: {tokenData.datasets[0].data[index]}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
//           <h1 className="text-4xl mb-6">Assist Me To Create Pie-Chart</h1>
//           <div className="boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 What is coding? <br />
//                 How can we learn it?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><IoCodeSlash /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 Which is the red <br />
//                 planet of the solar <br />
//                 system?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><BiPlanet /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 In which year was Python <br />
//                 invented?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><FaPython /></i>
//             </div>
//             <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//               <p className="text-[18px]">
//                 How can we use <br />
//                 AI for adoption?
//               </p>
//               <i className="absolute right-3 bottom-3 text-[18px]"><TbMessageChatbot /></i>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bottom w-full flex flex-col items-center mt-4">
//         <div className="inputBox w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-[15px] flex items-center justify-between border rounded-md">
//           <input
//             type="text"
//             placeholder="Send your question..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="bg-transparent outline-none w-full p-3 border-none"
//           />
//           <i
//             className="px-5 cursor-pointer text-[#a0a0a0]"
//             onClick={hitRequest}
//           >
//             <IoSend />
//           </i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Example;
// import React, { useState, useEffect, useRef } from 'react';
// import './Example.css';
// import { IoSend } from 'react-icons/io5';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Load Google Charts
// const loadGoogleCharts = () => {
//   const script = document.createElement('script');
//   script.src = 'https://www.gstatic.com/charts/loader.js';
//   script.async = true;
//   script.onload = () => {
//     window.google.charts.load('current', { packages: ['corechart'] });
//     window.google.charts.setOnLoadCallback(() => console.log('Google Charts Loaded'));
//   };
//   document.body.appendChild(script);
// };

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     loadGoogleCharts();
//   }, []);

//   const API_KEY = 'AIzaSyDbXFeVo5nhLk-AbwPlx7eiivQLx--HPJs'; // Replace with your API Key
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//   const handleSendMessage = async () => {
//     if (!message.trim()) return alert('Please enter a message.');

//     const userMsg = { type: 'user', text: message };
//     setMessages((prev) => [...prev, userMsg]);

//     const processingMsg = { type: 'bot', text: 'Thinking...' };
//     setMessages((prev) => [...prev, processingMsg]);

//     try {
//       const chatQuery = `
//         ${message}
//         Generate data in JSON format:
//         {
//           "labels": ["Label1", "Label2", ...],
//           "values": [Value1, Value2, ...]
//         }
//         Only provide raw JSON, no extra text.
//       `;
//       const response = await model.startChat({ history: [], generationConfig: { maxOutputTokens: 2000 } }).sendMessage(chatQuery);

//       const jsonResponse = response.response.candidates[0].content;
//       const parsedData = JSON.parse(jsonResponse);

//       setChartData(parsedData);
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));

//       const botMsg = { type: 'bot', text: 'Here is your chart!' };
//       setMessages((prev) => [...prev, botMsg]);

//       drawChart(parsedData);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));
//       setMessages((prev) => [...prev, { type: 'bot', text: 'Error generating response.' }]);
//     }
//     setMessage('');
//   };

//   const drawChart = (data) => {
//     if (!window.google || !data) return;

//     const chartData = new window.google.visualization.DataTable();
//     chartData.addColumn('string', 'Label');
//     chartData.addColumn('number', 'Value');
//     data.labels.forEach((label, index) => chartData.addRow([label, data.values[index]]));

//     const options = {
//       title: 'Generated Chart',
//       pieHole: 0.4,
//       backgroundColor: '#0E0E0E',
//       titleTextStyle: { color: '#FFFFFF' },
//     };

//     const chart = new window.google.visualization.PieChart(chartRef.current);
//     chart.draw(chartData, options);
//   };

//   return (
//     <div className="container text-white bg-[#0E0E0E] min-h-screen p-4">
//       <h1 className="text-2xl mb-4">AssistMe - Dynamic Chart Generator</h1>
//       <div className="chatbox mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-box flex items-center">
//         <input
//           type="text"
//           placeholder="Ask something..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 rounded bg-[#181818] text-white"
//         />
//         <button onClick={handleSendMessage} className="p-2 ml-2 bg-[#1f1f1f] rounded text-white">
//           <IoSend />
//         </button>
//       </div>
//       <div className="chart-container mt-4">
//         <div ref={chartRef} className="chart"></div>
//       </div>
//     </div>
//   );
// };

// export default Example;

// import React, { useState, useEffect, useRef } from 'react';
// import './Example.css';
// import { IoSend } from 'react-icons/io5';

// // Load Google Charts
// const loadGoogleCharts = () => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = 'https://www.gstatic.com/charts/loader.js';
//     script.async = true;
//     script.onload = () => {
//       window.google.charts.load('current', { packages: ['corechart'] });
//       window.google.charts.setOnLoadCallback(() => resolve());
//     };
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     loadGoogleCharts().then(() => console.log('Google Charts Loaded'));
//   }, []);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return alert('Please enter a message.');

//     const userMsg = { type: 'user', text: message };
//     setMessages((prev) => [...prev, userMsg]);

//     const processingMsg = { type: 'bot', text: 'Thinking...' };
//     setMessages((prev) => [...prev, processingMsg]);

//     try {
//       // Simulated API response
//       const simulatedResponse = `
//         {
//           "labels": ["Category A", "Category B", "Category C"],
//           "values": [30, 50, 20]
//         }
//       `;

//       const parsedData = JSON.parse(simulatedResponse);
//       setChartData(parsedData);

//       setMessages((prev) =>
//         prev.filter((msg) => msg.text !== 'Thinking...')
//       );

//       const botMsg = { type: 'bot', text: 'Here is your chart!' };
//       setMessages((prev) => [...prev, botMsg]);

//       drawChart(parsedData);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setMessages((prev) =>
//         prev.filter((msg) => msg.text !== 'Thinking...')
//       );
//       setMessages((prev) => [...prev, { type: 'bot', text: 'Error generating response.' }]);
//     }
//     setMessage('');
//   };

//   const drawChart = (data) => {
//     if (!window.google || !data) return;

//     const chartData = new window.google.visualization.DataTable();
//     chartData.addColumn('string', 'Label');
//     chartData.addColumn('number', 'Value');
//     data.labels.forEach((label, index) =>
//       chartData.addRow([label, data.values[index]])
//     );

//     const options = {
//       title: 'Generated Chart',
//       pieHole: 0.4,
//       backgroundColor: '#0E0E0E',
//       titleTextStyle: { color: '#FFFFFF' },
//     };

//     const chart = new window.google.visualization.PieChart(chartRef.current);
//     chart.draw(chartData, options);
//   };

//   return (
//     <div className="container text-white bg-[#0E0E0E] min-h-screen p-4">
//       <h1 className="text-2xl mb-4">AssistMe - Dynamic Chart Generator</h1>
//       <div className="chatbox mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.type === 'user' ? 'user-message' : 'bot-message'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-box flex items-center">
//         <input
//           type="text"
//           placeholder="Ask something..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 rounded bg-[#181818] text-white"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-2 ml-2 bg-[#1f1f1f] rounded text-white"
//         >
//           <IoSend />
//         </button>
//       </div>
//       <div className="chart-container mt-4">
//         <div ref={chartRef} className="chart"></div>
//       </div>
//     </div>
//   );
// };

// export default Example;
// import React, { useState, useEffect, useRef } from 'react';
// import './Example.css';
// import { IoSend } from 'react-icons/io5';

// // Load Google Charts
// const loadGoogleCharts = () => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = 'https://www.gstatic.com/charts/loader.js';
//     script.async = true;
//     script.onload = () => {
//       window.google.charts.load('current', { packages: ['corechart'] });
//       window.google.charts.setOnLoadCallback(() => resolve());
//     };
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);

//   // Load Google Charts on component mount
//   useEffect(() => {
//     loadGoogleCharts()
//       .then(() => console.log('Google Charts Loaded'))
//       .catch((error) => console.error('Error loading Google Charts:', error));
//   }, []);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return alert('Please enter a message.');

//     // Add user message to the chat
//     const userMsg = { type: 'user', text: message };
//     setMessages((prev) => [...prev, userMsg]);

//     // Show processing message
//     const processingMsg = { type: 'bot', text: 'Thinking...' };
//     setMessages((prev) => [...prev, processingMsg]);

//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch('https://your-chat-api-endpoint.com/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch response from API');
//       }

//       const data = await response.json();

//       // Process the response data
//       const parsedData = JSON.parse(data.chartResponse);

//       // Update chart data
//       setChartData(parsedData);

//       // Remove processing message and add bot response
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));
//       const botMsg = { type: 'bot', text: 'Here is your chart!' };
//       setMessages((prev) => [...prev, botMsg]);

//       // Draw the chart
//       drawChart(parsedData);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));
//       setMessages((prev) => [
//         ...prev,
//         { type: 'bot', text: 'Error generating response.' },
//       ]);
//     }
//     setMessage('');
//   };

//   const drawChart = (data) => {
//     if (!window.google || !data) return;

//     const chartData = new window.google.visualization.DataTable();
//     chartData.addColumn('string', 'Label');
//     chartData.addColumn('number', 'Value');
//     data.labels.forEach((label, index) =>
//       chartData.addRow([label, data.values[index]])
//     );

//     const options = {
//       title: 'Generated Chart',
//       pieHole: 0.4,
//       backgroundColor: '#0E0E0E',
//       titleTextStyle: { color: '#FFFFFF' },
//     };

//     const chart = new window.google.visualization.PieChart(chartRef.current);
//     chart.draw(chartData, options);
//   };

//   return (
//     <div className="container text-white bg-[#0E0E0E] min-h-screen p-4">
//       <h1 className="text-2xl mb-4">AssistMe - Dynamic Chart Generator</h1>
//       <div className="chatbox mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.type === 'user' ? 'user-message' : 'bot-message'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-box flex items-center">
//         <input
//           type="text"
//           placeholder="Ask something..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 rounded bg-[#181818] text-white"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-2 ml-2 bg-[#1f1f1f] rounded text-white"
//         >
//           <IoSend />
//         </button>
//       </div>
//       <div className="chart-container mt-4">
//         <div ref={chartRef} className="chart"></div>
//       </div>
//     </div>
//   );
// };

// export default Example;
// Example.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import './Example.css';
// import { IoSend } from 'react-icons/io5';

// // Load Google Charts
// const loadGoogleCharts = () => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = 'https://www.gstatic.com/charts/loader.js';
//     script.async = true;
//     script.onload = () => {
//       window.google.charts.load('current', { packages: ['corechart'] });
//       window.google.charts.setOnLoadCallback(() => resolve());
//     };
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// };

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const chartRef = useRef(null);

//   // Load Google Charts on component mount
//   useEffect(() => {
//     loadGoogleCharts()
//       .then(() => console.log('Google Charts Loaded'))
//       .catch((error) => console.error('Error loading Google Charts:', error));
//   }, []);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return alert('Please enter a message.');

//     // Add user message to the chat
//     const userMsg = { type: 'user', text: message };
//     setMessages((prev) => [...prev, userMsg]);

//     // Show processing message
//     const processingMsg = { type: 'bot', text: 'Thinking...' };
//     setMessages((prev) => [...prev, processingMsg]);

//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch('https://your-chat-api-endpoint.com/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (!data || !data.chartResponse) {
//         throw new Error('Invalid response format.');
//       }

//       // Process the response data
//       const parsedData = JSON.parse(data.chartResponse);

//       // Update chart data
//       setChartData(parsedData);

//       // Remove processing message and add bot response
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));
//       const botMsg = { type: 'bot', text: 'Here is your chart!' };
//       setMessages((prev) => [...prev, botMsg]);

//       // Draw the chart
//       drawChart(parsedData);
//     } catch (error) {
//       console.error('Error generating response:', error);

//       // Remove processing message and add error response
//       setMessages((prev) => prev.filter((msg) => msg.text !== 'Thinking...'));
//       setMessages((prev) => [
//         ...prev,
//         {
//           type: 'bot',
//           text: `Something went wrong: ${error.message || 'Please try again later.'}`,
//         },
//       ]);
//     }
//     setMessage('');
//   };

//   const drawChart = (data) => {
//     if (!window.google || !data) return;

//     const chartData = new window.google.visualization.DataTable();
//     chartData.addColumn('string', 'Label');
//     chartData.addColumn('number', 'Value');
//     data.labels.forEach((label, index) =>
//       chartData.addRow([label, data.values[index]])
//     );

//     const options = {
//       title: 'Generated Chart',
//       pieHole: 0.4,
//       backgroundColor: '#0E0E0E',
//       titleTextStyle: { color: '#FFFFFF' },
//     };

//     const chart = new window.google.visualization.PieChart(chartRef.current);
//     chart.draw(chartData, options);
//   };

//   return (
//     <div className="container text-white bg-[#0E0E0E] min-h-screen p-4">
//       <h1 className="text-2xl mb-4">AssistMe - Dynamic Chart Generator</h1>
//       <div className="chatbox mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.type === 'user' ? 'user-message' : 'bot-message'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-box flex items-center">
//         <input
//           type="text"
//           placeholder="Ask something..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 rounded bg-[#181818] text-white"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="p-2 ml-2 bg-[#1f1f1f] rounded text-white"
//         >
//           <IoSend />
//         </button>
//       </div>
//       <div className="chart-container mt-4">
//         <div ref={chartRef} className="chart"></div>
//       </div>
//     </div>
//   );
// };

// export default Example;

import React, { useState } from 'react';
import './Example.css';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Example = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [count, setCount] = useState(0);
  const chartRef = React.useRef(null);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert('You must write something... !');
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    // Append the custom message to the input
    const customMessage = `\nGenerate data for provided Keyword that visualizes the data from your internal memory. Provide the output in JSON format with the following structure:\n{\n  "labels": ["Label1", "Label2", "Label3", ...],\n  "values": [Value1, Value2, Value3, ...]\n}\nEnsure the labels represent [WHAT_LABELS_REPRESENT] and the values represent [WHAT_VALUES_REPRESENT]. If applicable, ensure the values fall within an appropriate range based on the data. Make sure to not to generate any other text content. Just the JSON Content with absolute in raw form. Don't incapsulate the JSON content in code blocks.\n`;

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyDbXFeVo5nhLk-AbwPlx7eiivQLx--HPJs');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const fullMessage = msg + customMessage; // Combine user message with the custom message
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
      setCount(count + 1);
      console.log(responseText);

      // Parse and validate JSON data
      const jsonData = parseJSONResponse(responseText);
      if (jsonData) {
        setChartData(jsonData);
      } else {
        console.log('Invalid or no JSON data found in the response.');
      }
    } catch (error) {
      console.error('Error generating response:', error);
      alert('Something went wrong while generating the response.');
    }
  };

  const parseJSONResponse = (text) => {
    try {
      const jsonData = JSON.parse(text);
      if (jsonData.labels && Array.isArray(jsonData.labels) && jsonData.values && Array.isArray(jsonData.values) && jsonData.labels.length === jsonData.values.length) {
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'].slice(0, jsonData.labels.length);

        return {
          labels: jsonData.labels,
          datasets: [
            {
              label: 'Generated Data',
              data: jsonData.values,
              backgroundColor: backgroundColors,
            },
          ],
        };
      } else {
        console.error('Invalid JSON format');
        return null;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setChartData(null);
    setCount(0);
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const imageUrl = chartRef.current.toBase64Image();
      if (imageUrl) {
        const link = document.createElement('a');
        link.download = 'pie-chart.png';
        link.href = imageUrl;
        link.click();
      } else {
        console.error('Chart image could not be generated');
      }
    } else {
      console.error('Chart reference is not defined');
    }
  };

  return (
    <div className="container top-16 p-5 w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className="h-[80vh] px-4 md:px-10 lg:px-20">
          <div className="header pt-[25px] flex items-center justify-between">
            <h2 className="text-2xl">Assist Me</h2>
            <button
              id="newChatBtn"
              className="bg-[#181818] p-2 md:p-3 rounded-[30px] cursor-pointer text-sm md:text-[14px] px-4 md:px-8"
              onClick={newChat}
            >
              New Chat
            </button>
          </div>

          <div className="messages mt-4">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.type} mb-2`}>{msg.text}</div>
            ))}
          </div>

          {/* Display Pie Chart */}
          {chartData && (
            <div className="mt-4">
              <div className="">
                <Pie ref={chartRef} data={chartData} />
                <button
                  className="w-23 h-20 top-0 right-0 bg-[#201f1f] p-2 rounded cursor-pointer"
                  onClick={downloadChart}
                >
                  Download Chart
                </button>
              </div>
            </div>
          )}

          {/* Display "Numeric Data Analysis" section */}
          {chartData && (
            <div className="mt-4">
              <h3 className="text-xl mb-2">Numeric Data Analysis</h3>
              <div className="bg-[#202020] p-4 rounded-md">
                <p className="text-gray-300">Here's a breakdown of the data:</p>
                <ul className="list-disc pl-5 mt-2">
                  {chartData.labels.map((label, index) => (
                    <li key={index}>
                      {label}: {chartData.datasets[0].data[index]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
          <h1 className="text-4xl mb-6">Assist Me To Create Pie-Chart</h1>
          <div className="boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
              <p className="text-[18px]">
                What is coding? <br />
                How can we learn it?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]"><IoCodeSlash /></i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
              <p className="text-[18px]">
                Which is the red <br />
                planet of the solar <br />
                system?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]"><BiPlanet /></i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
              <p className="text-[18px]">
                In which year was Python <br />
                invented?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]"><FaPython /></i>
            </div>
            <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
              <p className="text-[18px]">
                How can we use <br />
                AI for adoption?
              </p>
              <i className="absolute right-3 bottom-3 text-[18px]"><TbMessageChatbot /></i>
            </div>
          </div>

          <div className="input flex mt-10 relative w-full md:w-[75%] lg:w-[55%]">
            <input
              className="p-4 w-full bg-[#202020] text-white outline-none border border-[#202020] focus:border-[#FF5733] transition-all rounded"
              placeholder="Start a new conversation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <i
              className="absolute top-3 right-3 text-[#FF5733] text-[18px] cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Example;
