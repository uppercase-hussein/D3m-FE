import { useState, useRef, useEffect } from "react";
import { SSE } from "sse";

const ChatAi = (orderInfo: any) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const finalPrompt = `Perform a comprehensive analysis of the customer order dataset ${orderInfo.data} for a restaurant chain in Nigeria. The dataset includes essential information such as total sales for each outlet, total sales for 3-hour time intervals, top-selling items by quantity and price, total sales by the day of the week, total sales of each outlet, and total sales of all outlets. Extract insights on the following aspects:
  Identify the Nigerian outlet with the highest and lowest total sales.
  Analyze how total sales vary during different 3-hour time intervals. Are there any time-based trends or patterns specific to Nigeria?
  Determine the most profitable time of day for all outlets combined.
  Compare the sales distribution on Nigerian weekdays vs. weekends.
  Examine if there's a correlation between the time of day and the top-selling items (by quantity).
  Investigate the highest and lowest sales days of the week for all outlets combined.
  Identify any seasonal trends in the popularity of specific items within the Nigerian market.
  For the highest-grossing item, analyze its sales by outlet and time of day.
  Analyze the relationship between the outlet's total sales and their respective top-selling items. Do outlets with higher sales also sell more of these items?
  Determine which outlet is the most successful at selling high-priced items.
  Provide any additional insights or anomalies that are noteworthy within the Nigerian context from the dataset.
  Feel free to use data visualization, statistical analysis, or any other appropriate techniques to support your findings.
  All your answers should depend on ${prompt}.
`;
  const resultRef = useRef("");

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const handlePromptChange = async (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmitPromptBtnClicked = async () => {
    if (finalPrompt) {
      setIsLoading(true);
      setResult("");
      const url = "https://api.openai.com/v1/completions";
      const data = {
        model: "text-davinci-003",
        prompt: finalPrompt,
        temperature: 0.75,
        top_p: 0.95,
        max_tokens: 500,
        stream: true,
        n: 1,
      };

      const source = new SSE(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"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"}`,
        },
        method: "POST",
        payload: JSON.stringify(data),
      });

      source.addEventListener("message", (e: any) => {
        if (e.data !== "[DONE]") {
          const payload = JSON.parse(e.data);
          console.log(payload);
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
          style={{
            marginTop: "30px",
            marginLeft: "20px",
            padding: "10px 20px",
          }}
          onClick={handleClearBtnClicked}
        >
          Clear
        </button>
        {result !== "" && (
          <div style={{ maxWidth: "2xl", margin: "0 auto" }}>
            <h5
              style={{ textAlign: "left", fontSize: "lg", marginTop: "40px" }}
            >
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
