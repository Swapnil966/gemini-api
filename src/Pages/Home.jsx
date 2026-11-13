import { useRef, useState } from "react";
import { generateResponse } from "../lib/gemini";
import Markdown from "react-markdown";

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
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
            <p className="mt-2 text-slate-500">
              Ask anything and get an AI-powered response.
            </p>
          </div>

          {/* Input section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <textarea
              ref={userInput}
              placeholder="Ask me anything..."
              rows={3}
              className="w-full resize-none outline-none text-slate-800 placeholder:text-slate-400"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-400">AI can make mistakes.</p>

              <button
                onClick={askChatgpt}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "Send"}
              </button>
            </div>
          </div>

          {/* Response section */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-slate-100 pb-3 text-lg font-semibold text-slate-800">
              AI Response
            </h2>

            <div className="prose prose-slate max-w-none break-words">
              {loading ? (
                <p className="animate-pulse text-slate-400">Thinking...</p>
              ) : response ? (
                <Markdown>{response}</Markdown>
              ) : (
                <p className="text-slate-400">
                  Your generated response will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
