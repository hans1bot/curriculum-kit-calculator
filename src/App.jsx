import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import ResultsSection from "./components/ResultsSection";
import { Calculator } from "lucide-react";

function App() {
  const [results, setResults] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen w-full p-5 font-nunito">
      <div className="w-full mx-auto p-4">
        <div className="shadow-lg rounded-lg bg-white overflow-hidden">
          <div className="text-white p-4 bg-sky-500">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold m-0">
                Calculadora de Ticket y Costo de Kits
              </h1>
              <Calculator size={24} />
            </div>
            <p className="text-white text-sm mt-2 opacity-80">
              Los resultados se calculan automáticamente al ingresar datos
            </p>
          </div>

          {/* Layout responsivo que cambia a columna en móviles */}
          <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="w-full md:w-1/2">
              <CalculatorForm
                setResults={setResults}
                setIsCalculated={setIsCalculated}
              />
            </div>
            <div className="w-full md:w-1/2">
              <ResultsSection results={results} isCalculated={isCalculated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
