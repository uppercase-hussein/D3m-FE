import { useState, useRef, useEffect } from "react";
import { SSE } from "sse";


const ChatAi = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const resultRef = useRef("");

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const handlePromptChange = async (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmitPromptBtnClicked = async () => {
    if (prompt !== "") {
      setIsLoading(true);
      setResult("");
      const url = "https://api.openai.com/v1/completions";
      const data = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.75,
        top_p: 0.95,
        max_tokens: 100,
        stream: true,
        n: 1,
      };

      const source = new SSE(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"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"}`,
        },
        method: 'POST',
        payload: JSON.stringify(data),
      });

      source.addEventListener("message", (e: any) => {
        if (e.data !== "[DONE]") {
          const payload = JSON.parse(e.data);
          console.log(payload)
          const text = payload.choices[0].text;
          if (text !== "\n") {
            resultRef.current = resultRef.current + text;
            setResult(resultRef.current);
          }
        } else {
          source.close();
        }
      });

      source.addEventListener("readystatechange", (e: any) => {
        if (e.readyState >= 2) {
          setIsLoading(false);
        }
      });

      source.stream();
    } else {
      alert("Please insert a prompt!");
    }
  };

  const handleClearBtnClicked = () => {
    setPrompt("");
    setResult("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "2xl", margin: "0 auto", padding: "20px" }}>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Insert your prompt here ..."
          style={{ marginTop: "30px", width: "100%" }}
        />
        <button
          disabled={isLoading}
          style={{ marginTop: "30px", padding: "10px 20px" }}
          onClick={handleSubmitPromptBtnClicked}
        >
          {isLoading ? "Loading..." : "Submit Prompt"}
        </button>
        <button
          style={{ marginTop: "30px", marginLeft: "20px", padding: "10px 20px" }}
          onClick={handleClearBtnClicked}
        >
          Clear
        </button>
        {result !== "" && (
          <div style={{ maxWidth: "2xl", margin: "0 auto" }}>
            <h5 style={{ textAlign: "left", fontSize: "lg", marginTop: "40px" }}>
              Result:
            </h5>
            <p style={{ fontSize: "lg", textAlign: "left", marginTop: "20px" }}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAi;