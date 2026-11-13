import { useRef, useState } from "react";
import { generateImage } from "../lib/gemini";

function Image() {
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let userInput = useRef(null);

  async function handleGenerateImage() {
    const message = userInput.current.value;

    if (!message.trim()) return;

    try {
      setLoading(true);
      setGeneratedImage("");

      const imageUrl = await generateImage(message);

      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error(error);
      setErrorMessage("Image generation failed. Please try again.");
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
            <h1 className="text-3xl font-bold text-slate-900">
              AI Image Generator
            </h1>
            <p className="mt-2 text-slate-500">
              Turn your imagination into images using AI.
            </p>
          </div>

          {/* Input section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <textarea
              ref={userInput}
              placeholder="Describe the image you want to create..."
              rows={3}
              className="w-full resize-none outline-none text-slate-800 placeholder:text-slate-400"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerateImage}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating image..." : "Generate Image"}
              </button>
            </div>
          </div>

          {/* Image result */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Generated Image
            </h2>

            {errorMessage && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {loading ? (
              <div className="flex min-h-64 items-center justify-center rounded-xl bg-slate-100">
                <p className="animate-pulse text-slate-500">
                  Creating your image...
                </p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="AI-generated image"
                className="w-full rounded-xl object-contain"
              />
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-center text-slate-400">
                  Your generated image will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Image;
