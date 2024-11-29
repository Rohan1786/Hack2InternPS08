import React, { useState } from 'react';
import './Example.css';
import { IoCodeSlash, IoSend } from 'react-icons/io5';
import { BiPlanet } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Example = () => {
  const [message, setMessage] = useState('');
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  let allMessages = [];

  // Function to handle API call
  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert('You must write something... !');
    }
  };

  // Function to generate response from the AI model
  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyA-rGrVZOyaNEq__0nylzVzXiZXa-LLD4E'); // Using environment variable for API key
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(msg);

      const newMessages = [
        ...messages,
        { type: 'userMsg', text: msg },
        { type: 'responseMsg', text: result.response.text() },
      ];

      setMessages(newMessages);
      setIsResponseScreen(true);
      setMessage(''); // Clear the input field after sending the message
      console.log(result.response.text());
    } catch (error) {
      console.error('Error generating response:', error);
      alert('Something went wrong while generating the response.');
    }
  };

  // Function to start a new chat
  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  };

  return (
    <>
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
              {messages.map((msg, index) => {
                return (
                  <div key={index} className={`${msg.type} mb-2`}>{msg.text}</div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="middle h-[80vh] flex flex-col items-center justify-center px-4 md:px-10 lg:px-20">
            <h1 className="text-4xl mb-6">AssistMe</h1>
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
            AssistMe is developed by Mo. Mahdi Farooqui. This AI uses the Gemini API to provide responses.
          </p>
        </div>
      </div>
    </>
  );
};

export default Example;
