import axios from "axios";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";

const Chatcomponent = () => {
  const [textValue, setTextValue] = useState("");
  const [isSubmited, setIsSubmited] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  //const userId = 1;
  const kafkaApi = import.meta.env.VITE_APP_KAFKA_URL;
  const userId = useParams().userId

  // Fetch messages from the kafka consumer endpoint
  const handleSubmit = async (e) => {
	e.preventDefault();
    setIsSubmited(true);
    const consumeMessages = async () => {
      try {
        await axios
          .get(
            `${kafkaApi}/api/ai-response/${userId}`
          )
          .then((res) => {
            console.log(res.data);
            // Update receivedMessages state with the fetched messages
            setReceivedMessages(res.data.messages);
          });
      } catch (error) {
        console.error(error);
      }
    };

    const produceMessage = async () => {
      try {
        const data = {
          userId: userId,
          message: textValue,
          userLocation: { latitude: 40.73061, longitude: -73.935242 },
        };
        await axios
          .post(`${kafkaApi}/api/chat`, data)
          .then(async (res) => {
            console.log(res.data);
            if (textValue.trim() !== "" && isSubmited) {
              // Update the list with the new item
              setAllMessages((allMessages) => [...allMessages, textValue]);
              console.log(allMessages);
              setTextValue("");
              // Call the fetchMessages function
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    };
    await produceMessage();
	await consumeMessages();
  };
  /**const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_CHATBOT}/getMessages`
      );
      const data = await response.json();

      // Update receivedMessages state with the fetched messages
      setAllMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };
  fetchMessages();*/

  return (
    <div className="max-h-fit h-[90%] flex flex-col justify-between">
      <div className="overflow-auto">
        {allMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        {receivedMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="bg-graylight p-1 mx-5 md:p-2 border-2 border-graydark  rounded-full flex flex-row items-center ">
        <input
          className="justify-self-end bg-transparent w-[80%] focus:outline-0 focus:bg-gray-200 focus:rounded-full p-2 text-black "
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          type="text"
          placeholder="Ask waverx a question."
        />{" "}
        <AiOutlineSend
          size={25}
          onClick={handleSubmit}
          className="items-end p-.5 ml-3 cursor-pointer "
          type="submit"
        />
      </div>
    </div>
  );
};

export default Chatcomponent;
