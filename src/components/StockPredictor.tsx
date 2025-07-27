"use client";
import React, { useState } from "react";
import brain from "brain.js";

export default function StockPredictor() {
  const [inputData, setInputData] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);
  };

  const handlePredict = () => {
    try {
      const rawLines = inputData
        .split("\n")
        .map((line) => parseFloat(line.trim()))
        .filter((val) => !isNaN(val));

      if (rawLines.length < 2) {
        alert("Please enter at least 2 numeric values.");
        return;
      }

      const trainingData = rawLines.slice(0, -1).map((value, i) => ({
        input: [i / rawLines.length],
        output: [rawLines[i + 1] / Math.max(...rawLines)],
      }));

      const net = new brain.NeuralNetwork();
      net.train(trainingData);

      const nextInput = [(rawLines.length - 1) / rawLines.length];
      const result = net.run(nextInput);

      const predictedValue = (result[0] * Math.max(...rawLines)).toFixed(2);
      setPrediction(predictedValue);
    } catch (err) {
      alert("Something went wrong with prediction.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Stock Market Predictor</h2>
      <textarea
        rows={8}
        placeholder="Enter historical stock prices (one per line)"
        className="w-full border px-3 py-2 rounded text-sm"
        value={inputData}
        onChange={handleChange}
      ></textarea>

      <button
        onClick={handlePredict}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mt-4 w-full"
      >
        Predict Next Value
      </button>

      {prediction && (
        <div className="mt-4 text-green-700 text-center font-bold text-lg">
          Predicted Next Price: {prediction}
        </div>
      )}
    </div>
  );
}
