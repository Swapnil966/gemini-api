import { useRef, useState } from "react";
import { generateResponse } from "../lib/gemini";

function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  let userInput = useRef(null);

  async function askChatgpt() {
    let message = userInput.current.value;
    if (!message.trim()) return;
    try {
      setLoading(true);

      const result = await generateResponse(message);

      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-[700px]">
        <input
          ref={userInput}
          type="text"
          placeholder="Ask chatgpt"
          className="w-full"
        />
        <p>This is an AI tool and it can make mistakes.</p>
        <button
          onClick={askChatgpt}
          disabled={loading}
          className="bg-black text-white"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>
      <div className="w-[800px]">{response}</div>
    </>
  );
}

export default Home;
