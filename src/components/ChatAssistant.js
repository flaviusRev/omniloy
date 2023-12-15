/** @format */

import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as SparkIcon } from "./../assets/icons/spark_icon.svg";
import { ReactComponent as SendIcon } from "./../assets/icons/send_icon.svg";
import { ChatAPI } from "easy-assistants-sdk";
import { CurrentPathContext } from "./../utils/currentPathContext";
import { useFilter } from "./../utils/FilterContext";

const ChatAssistant = () => {
  const { currentPath } = useContext(CurrentPathContext);
  const { updateFilters } = useFilter();
  const serverUrl = "https://b162-188-27-145-60.ngrok-free.app";
  const [chatApi, setChatApi] = useState(new ChatAPI(serverUrl));
  // const chatApi = new ChatAPI(serverUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  let currentThreadId = null;

  const toggleChat = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInputValue(e.target.value);

  useEffect(() => {
    setupToolsMap();
  }, []);

  const setupToolsMap = () => {
    const toolsMap = {
      // createCampaign: handleCustomToolInput,
      testTool: handleTestTool,
      filterProducts: handleFilterProducts,
      createSQLquery: handleTestTool,
      createEvent: handleTestTool,
      createFilter: handleTestTool,
      createReward: handleTestTool,
    };
    setChatApi(new ChatAPI(serverUrl, toolsMap));
    console.log("Setting up tools map", toolsMap);
    chatApi.setToolsMap(toolsMap);
  };

  const sendMessage = async () => {
    console.log("SEND MESSAGE: ", inputValue);
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: "user" },
    ]);

    const extractedFilters = extractFiltersFromInput(inputValue);

    try {
      const response = await chatApi.sendQuery(inputValue, currentThreadId);
      console.log("RESPONSE: ", response);
      if (response.threadId) {
        currentThreadId = response.threadId;
      }
      const serverMessageText = response.responseContent
        .filter((content) => content.type === "text")
        .map((content) => content.text.value)
        .join("\n");
      console.log("SERVER MESSAGE TEXT: ", serverMessageText);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: serverMessageText, sender: "server" },
      ]);

      if (Object.keys(extractedFilters).length > 0) {
        updateFilters(extractedFilters);
      }
    } catch (error) {
      console.error("Error in sending message:", error);
    }

    setInputValue("");
  };

  const extractFiltersFromInput = (input) => {
    const filters = {};
    const words = input.split(/\s+/);

    // Example of simple keyword-based parsing
    words.forEach((word, index, array) => {
      if (word.toLowerCase() === "name" && array[index + 1]) {
        filters.name = array[index + 1];
      } else if (word.toLowerCase() === "product_id" && array[index + 1]) {
        filters.product_id = array[index + 1];
      } else if (word.toLowerCase() === "category" && array[index + 1]) {
        filters.category_name = array[index + 1];
      } else if (word.toLowerCase() === "price" && array[index + 1]) {
        filters.price = array[index + 1];
      }
    });

    return filters;
  };

  const handleFilterProducts = async (parameter) => {
    parameter = JSON.parse(parameter);
    console.log("parameter", parameter);

    // Example: Parsing user input to extract filters
    // This needs to be adjusted according to how the user input is structured
    const parsedFilters = {
      name: parameter.name,
      product_id: parameter.product_id,
      category_name: parameter.category_name,
      price: parameter.price,
    };

    console.log("PARSED FILTERS: ", parsedFilters);
    // Validate and clean the filters (e.g., remove undefined or null values)
    const validFilters = Object.fromEntries(
      Object.entries(parsedFilters).filter(([_, value]) => value != null)
    );

    // Update the filters in context
    updateFilters(validFilters);
    return new Promise((resolve, reject) => {
      const resolvePopup = resolve;
      console.log("resolvePopup", resolvePopup);
      console.log("reject", reject);
    });
  };

  const handleCustomToolInput = async (parameter) => {
    parameter = JSON.parse(parameter);
    console.log("parameter", parameter);
    const popupInput = parameter.parameter;
    const popupTitle = parameter.opName;
    console.log("POPUP INPUT: ", popupInput);
    console.log("POPUP TITLE: ", popupTitle);
    return new Promise((resolve, reject) => {
      const resolvePopup = resolve;
      console.log("resolvePopup", resolvePopup);
      console.log("reject", reject);
    });
  };

  const handleTestTool = async (parameter) => {
    parameter = JSON.parse(parameter);
    console.log("parameter", parameter);
    const popupInput = parameter.parameter;
    const popupTitle = parameter.opName;
    console.log("POPUP INPUT: ", popupInput);
    console.log("POPUP TITLE: ", popupTitle);
    return new Promise((resolve, reject) => {
      const resolvePopup = resolve;
      console.log("resolvePopup", resolvePopup);
      console.log("reject", reject);
    });
  };

  return (
    <div className="fixed bottom-0 right-10 mr-4">
      {isOpen ? (
        <>
          <button
            onClick={toggleChat}
            className="flex items-center justify-start p-4 bg-[#3E54AC] text-white rounded-t-2xl shadow-lg text-base font-medium w-[25rem]"
          >
            <SparkIcon className="mx-2" />
            Create with AI
          </button>
          <div className="p-6 bg-white rounded-t-lg shadow-lg">
            <div className="overflow-y-auto w-[22rem] rounded-xl max-h-96">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`my-2 p-2 rounded-lg w-3/4 ${
                    message.sender === "user"
                      ? "bg-white border border-[#E1E1E1] text-right ml-auto"
                      : "bg-[#ECEEF7] text-left mr-auto"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex mt-4 relative">
              <input
                type="text"
                className="flex-grow p-2 pl-4 pr-10 border border-[#8B98CD] rounded-xl text-[#8B98CD] focus:outline-none focus:border-[#8B98CD]"
                placeholder="Start typing here..."
                value={inputValue}
                onChange={handleInputChange}
                onFocus={(e) =>
                  e.target.classList.add("focus:border-[#8B98CD]")
                }
                onBlur={(e) =>
                  e.target.classList.remove("focus:border-[#8B98CD]")
                }
              />
              <button
                onClick={sendMessage}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <SendIcon className="h-5 w-5 text-[#3E54AC]" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={toggleChat}
          className="flex items-center justify-start p-4 bg-[#3E54AC] text-white rounded-t-2xl shadow-lg text-base font-medium w-[25rem]"
        >
          <SparkIcon className="mx-2" />
          Create with AI
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
