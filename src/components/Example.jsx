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

//   // Function to handle API call
//   const hitRequest = () => {
//     if (message) {
//       generateResponse(message);
//     } else {
//       alert('You must write something... !');
//     }
//   };

//   // Function to generate response from the AI model
//   const generateResponse = async (msg) => {
//     if (!msg) return;

//     try {
//       const genAI = new GoogleGenerativeAI('AIzaSyA-rGrVZOyaNEq__0nylzVzXiZXa-LLD4E');
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       const result = await model.generateContent(msg);

//       const newMessages = [
//         ...messages,
//         { type: 'userMsg', text: msg },
//         { type: 'responseMsg', text: result.response.text() },
//       ];

//       setMessages(newMessages);
//       setIsResponseScreen(true);
//       setMessage('');
//       console.log(result.response.text());

//       // Analyze the input message and generate token data for the pie chart
//       const tokenAnalysis = analyzeTokens(msg);
//       setTokenData(tokenAnalysis);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       alert('Something went wrong while generating the response.');
//     }
//   };

//   // Function to analyze tokens and return pie chart data
//   const analyzeTokens = (input) => {
//     const words = input.split(/\s+/);
//     const tokenCounts = {};

//     words.forEach((word) => {
//       word = word.toLowerCase();
//       if (word) {
//         tokenCounts[word] = (tokenCounts[word] || 0) + 1;
//       }
//     });

//     // Convert token counts into a format suitable for Chart.js
//     const labels = Object.keys(tokenCounts);
//     const data = Object.values(tokenCounts);

//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Token Frequency',
//           data,
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'],
//         },
//       ],
//     };
//   };

//   // Function to start a new chat
//   const newChat = () => {
//     setIsResponseScreen(false);
//     setMessages([]);
//     setTokenData(null);
//   };

//   return (
//     <>
//       <div className="container w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
//         {isResponseScreen ? (
//           <div className="h-[80vh] px-4 md:px-10 lg:px-20">
//             <div className="header pt-[25px] flex items-center justify-between">
//               <h2 className="text-2xl">AssistMe</h2>
//               <button
//                 id="newChatBtn"
//                 className="bg-[#181818] p-2 md:p-3 rounded-[30px] cursor-pointer text-sm md:text-[14px] px-4 md:px-8"
//                 onClick={newChat}
//               >
//                 New Chat
//               </button>
//             </div>

//             <div className="messages mt-4">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`${msg.type} mb-2`}>{msg.text}</div>
//               ))}
//             </div>

//             {/* Display Pie Chart if tokenData is available */}
//             {tokenData && (
//               <div className="mt-4">
//                 <h3 className="text-xl mb-2">Token Analysis</h3>
//                 <Pie data={tokenData} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
//             <h1 className="text-4xl mb-6">AssistMe</h1>
//             <div className="boxes grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
//               <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//                 <p className="text-[18px]">
//                   What is coding? <br />
//                   How can we learn it?
//                 </p>
//                 <i className="absolute right-3 bottom-3 text-[18px]"><IoCodeSlash /></i>
//               </div>
//               <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//                 <p className="text-[18px]">
//                   Which is the red <br />
//                   planet of the solar <br />
//                   system?
//                 </p>
//                 <i className="absolute right-3 bottom-3 text-[18px]"><BiPlanet /></i>
//               </div>
//               <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//                 <p className="text-[18px]">
//                   In which year was Python <br />
//                   invented?
//                 </p>
//                 <i className="absolute right-3 bottom-3 text-[18px]"><FaPython /></i>
//               </div>
//               <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] p-4 relative bg-[#181818]">
//                 <p className="text-[18px]">
//                   How can we use <br />
//                   AI for adoption?
//                 </p>
//                 <i className="absolute right-3 bottom-3 text-[18px]"><TbMessageChatbot /></i>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bottom w-full flex flex-col items-center mt-4">
//           <div className="inputBox w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-[15px] py-2 flex items-center bg-[#181818] rounded-[30px]">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               type="text"
//               className="p-2 pl-4 bg-transparent flex-1 outline-none border-none"
//               placeholder="Write your message here..."
//               id="messageBox"
//             />
//             {message === '' ? (
//               ''
//             ) : (
//               <i
//                 className="text-green-500 text-[20px] mr-4 cursor-pointer"
//                 onClick={hitRequest}
//               >
//                 <IoSend />
//               </i>
//             )}
//           </div>
//           <p className="text-[gray] text-[14px] my-4 text-center">
//             AssistMe to create PieChart
//           </p>
//         </div>
//       </div>
//     </>
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
// import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend);

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [isResponseScreen, setIsResponseScreen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [tokenData, setTokenData] = useState(null);
//   const [count, setCount] = useState(0); // Track the number of responses

//   // Function to handle API call for generating AI response
//   const hitRequest = () => {
//     if (message) {
//       generateResponse(message);
//     } else {
//       alert('You must write something...');
//     }
//   };

//   // Function to generate response using the AI model
//   const generateResponse = async (msg) => {
//     if (!msg) return;

//     try {
//       const genAI = new GoogleGenerativeAI('AIzaSyA-rGrVZOyaNEq__0nylzVzXiZXa-LLD4E');
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//       const result = await model.generateContent(msg);

//       const aiResponse = result.response.text();
//       const newMessages = [
//         ...messages,
//         { type: 'userMsg', text: msg },
//         { type: 'responseMsg', text: aiResponse },
//       ];

//       // Update state with new messages and response
//       setMessages(newMessages);
//       setIsResponseScreen(true);
//       setMessage('');
//       setCount(count + 1); // Increment the response count
//       console.log(aiResponse);

//       // Analyze the response to create token data for the pie chart
//       const tokenAnalysis = analyzeTokens(aiResponse);
//       setTokenData(tokenAnalysis);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       alert('Something went wrong while generating the response.');
//     }
//   };

//   // Function to analyze tokens from the given text and return data for the pie chart
//   const analyzeTokens = (input) => {
//     const words = input.split(/\s+/);
//     const tokenCounts = {};

//     words.forEach((word) => {
//       word = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters
//       if (word) {
//         tokenCounts[word] = (tokenCounts[word] || 0) + 1;
//       }
//     });

//     // Prepare chart data
//     const labels = Object.keys(tokenCounts);
//     const data = Object.values(tokenCounts);

//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Token Frequency',
//           data,
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'],
//         },
//       ],
//     };
//   };

//   // Function to start a new chat and reset all states
//   const newChat = () => {
//     setIsResponseScreen(false);
//     setMessages([]);
//     setTokenData(null);
//     setCount(0); // Reset count for a new chat session
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

//           {/* Display Pie Chart if tokenData is available */}
//           {tokenData && (
//             <div className="mt-4">
//               <h3 className="text-xl mb-2">Token Analysis</h3>
//               <Pie data={tokenData} />
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
//           <h1 className="text-4xl mb-6">AssistMe</h1>
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
//             <i
//               className="text-green-500 text-[20px] mr-4 cursor-pointer"
//               onClick={hitRequest}
//             >
//               <IoSend />
//             </i>
//           )}
//         </div>
//         <p className="text-[gray] text-[14px] my-4 text-center">
//           AssistMe is developed by Mo. Mahdi Farooqui. This AI uses the Gemini API to provide responses.
//         </p>
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
// import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend);

// const Example = () => {
//   const [message, setMessage] = useState('');
//   const [isResponseScreen, setIsResponseScreen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [tokenData, setTokenData] = useState(null);
//   const [count, setCount] = useState(0);

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
//       const genAI = new GoogleGenerativeAI('AIzaSyA-rGrVZOyaNEq__0nylzVzXiZXa-LLD4E');
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

//       // Analyze the response text for numerical data
//       const numericalData = extractNumericalData(responseText);
//       if (numericalData) {
//         setTokenData(numericalData);
//       }
//     } catch (error) {
//       console.error('Error generating response:', error);
//       alert('Something went wrong while generating the response.');
//     }
//   };

//   // Function to extract numerical data from the response text
//   const extractNumericalData = (text) => {
//     // Regular expression to match numerical values and associated words (e.g., scores, percentages)
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

//           {/* Display Pie Chart if tokenData is available */}
//           {tokenData && (
//             <div className="mt-4">
//               <h3 className="text-xl mb-2">Numerical Data Analysis</h3>
//               <Pie data={tokenData} />
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
//             <i
//               className="text-green-500 text-[20px] mr-4 cursor-pointer"
//               onClick={hitRequest}
//             >
//               <IoSend />
//             </i>
//           )}
//         </div>
//         <p className="text-[gray] text-[14px] my-4 text-center">
//           AssistMe is developed by Rohan Pawar. This AI uses the Gemini API to provide responses.
//         </p>
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
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend);

const Example = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [count, setCount] = useState(0);
  const chartRef = React.useRef(null); // Reference to the chart

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert('You must write something... !');
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyA-rGrVZOyaNEq__0nylzVzXiZXa-LLD4E');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(msg);

      const responseText = result.response.text();
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

      // Analyze the response text for numerical data
      const numericalData = extractNumericalData(responseText);
      if (numericalData) {
        setTokenData(numericalData);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      alert('Something went wrong while generating the response.');
    }
  };

  // Function to extract numerical data from the response text
  const extractNumericalData = (text) => {
    const numberRegex = /(\d+\.?\d*)\s?(%|points|runs|goals|votes|ratio|out of|total)?/g;
    const matches = [];
    let match;

    while ((match = numberRegex.exec(text)) !== null) {
      const value = match[1];
      const label = match[2] ? match[2] : 'Count';
      matches.push({ label, value: parseFloat(value) });
    }

    if (matches.length > 0) {
      const labels = matches.map((item) => item.label);
      const data = matches.map((item) => item.value);
      const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#5A33FF', '#FF33B5'];

      return {
        labels,
        datasets: [
          {
            label: 'Numerical Data',
            data,
            backgroundColor: backgroundColors.slice(0, matches.length),
          },
        ],
      };
    }

    return null;
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
    setTokenData(null);
    setCount(0);
  };

  // Function to download the pie chart as an image
  const downloadChart = () => {
    if (chartRef.current) {
      const imageUrl = chartRef.current.toBase64Image(); // Safely get base64 image
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
    <div className="container w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className="h-[80vh] px-4 md:px-10 lg:px-20">
          <div className="header pt-[25px] flex items-center justify-between">
            <h2 className="text-2xl">AssistMe</h2>
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

          {/* Display Pie Chart if tokenData is available */}
          {tokenData && (
            <div className="mt-4">
              <h3 className="text-xl mb-2">Numerical Data Analysis</h3>
              <div className="relative">
                <Pie ref={chartRef} data={tokenData} />
                <button
                  className="absolute top-0 right-0 bg-[#201f1f] p-2 rounded cursor-pointer"
                  onClick={downloadChart}
                >
                  Download Chart
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
          <h1 className="text-4xl mb-6">Assist Me To Create Py-Chart</h1>
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
        </div>
      )}

      <div className="bottom w-full flex flex-col items-center mt-4">
        <div className="inputBox w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-[15px] py-2 flex items-center bg-[#181818] rounded-[30px]">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="p-2 pl-4 bg-transparent flex-1 outline-none border-none"
            placeholder="Write your message here..."
            id="messageBox"
          />
          {message === '' ? (
            ''
          ) : (
            <i
              className="text-green-500 text-[20px] mr-4 cursor-pointer"
              onClick={hitRequest}
            >
              <IoSend />
            </i>
          )}
        </div>
        <p className="text-[gray] text-[14px] my-4 text-center">
          AssistMe is developed by Rohan Pawar. This AI uses the Gemini API to provide responses.
        </p>
      </div>
    </div>
  );
};

export default Example;
