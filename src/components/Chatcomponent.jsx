import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const Chatcomponent = () => {
  const [textValue, setTextValue] = useState("");
  const [isSubmited, setIsSubmited] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  //const userId = 1;
  //const kafkaApi = import.meta.env.VITE_APP_KAFKA_URL;

  const produceMessage = async () => {
    /**try {
      await fetch(`${kafkaApi}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textValue, userId: userId }),
      });**/
      if (textValue.trim() !== "" && isSubmited) {
        // Update the list with the new item
        setAllMessages((allMessages) => [...allMessages, textValue]);
		console.log(allMessages)

        // Clear the newItem state for the next input
        setTextValue("");
      }
    /**} catch (error) {
      console.error(error);
    }**/
  };

 /** const fetchMessages = async () => {
    try {
      const response = await fetch(
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

 /** useEffect(() => {
    // Fetch messages from the kafka consumer endpoint
    const consumeMessages = async () => {
      try {
        const response = await fetch(`${kafkaApi}/api/ai-response`);
        const data = await response.json();

        // Update receivedMessages state with the fetched messages
        setReceivedMessages(data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchMessages function
    consumeMessages();
  }, []);
  **/
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
          onClick={() => {
            setIsSubmited(true);
            produceMessage();
          }}
          className="items-end p-.5 ml-3 cursor-pointer "
          type="submit"
        />
      </div>
    </div>
  );
};

export default Chatcomponent;
