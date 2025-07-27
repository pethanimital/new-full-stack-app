"use client";
import { useEffect } from "react";

export default function StockPredictorPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/stock-predictor/script.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src="/stock-predictor/index.html"
      style={{ width: "100%", height: "90vh", border: "none" }}
      title="Stock Predictor"
    />
  );
}
