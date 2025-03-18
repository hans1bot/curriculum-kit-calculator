import React, { useState, useEffect } from "react";
import { Info, IterationCcw } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

const FACTOR_CONVERSION = 7.5; // Q7.5 = $1

const initialDivisions = {
  Preescolar: 140, // mTiny
  "Primaria Baja": 120, // Codey Rocky
  "Primaria Alta": 75, // mBot V1
  "Secundaria Baja": 75, // mBot V1
  "Secundaria Alta": 140, // mBot V2
};

import { formatCurrency, formatInteger } from "../utils/formatters";

const CalculatorForm = ({ setResults, results, setIsCalculated }) => {
  const [divisions] = useState(initialDivisions);
  const [students, setStudents] = useState({
    Preescolar: 0,
    "Primaria Baja": 0,
    "Primaria Alta": 0,
    "Secundaria Baja": 0,
    "Secundaria Alta": 0,
  });
  const [totalChildren, setTotalChildren] = useState(0);
  const [licenseCost, setLicenseCost] = useState(894);
  const [licenseDiscountPercent, setLicenseDiscountPercent] = useState(0);
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(0);
  const [customKitsCost, setCustomKitsCost] = useState(0);

  const handleCalculate = () => {
    const discountMultiplier = discountEnabled
      ? (100 - licenseDiscountPercent) / 100
      : 1;
    const calculatedTicket = totalChildren * licenseCost * discountMultiplier;

    if (calculatedTicket !== ticketAmount) {
      setTicketAmount(calculatedTicket);
    }

    const ticketTotalDollars = calculatedTicket / FACTOR_CONVERSION;
    const customKitsDollars = customKitsCost / FACTOR_CONVERSION;

    const { totalCost, details } = calculateTotalCost();

    const isValid = validateTicket(
      totalCost,
      ticketTotalDollars,
      customKitsDollars
    );

    const calculatedResults = {
      details,
      totalCost,
      totalCostQuetzales: totalCost * FACTOR_CONVERSION,
      customKitsCost: customKitsDollars,
      customKitsCostQuetzales: customKitsCost,
      completeCost: totalCost + customKitsDollars,
      completeCostQuetzales:
        (totalCost + customKitsDollars) * FACTOR_CONVERSION,
      ticketPercentage: 0.2 * ticketTotalDollars,
      ticketPercentageQuetzales: 0.2 * calculatedTicket,
      totalChildren,
      licenseCost,
      licenseDiscountPercent,
      discountEnabled,
      ticketAmount: calculatedTicket,
      isValid,
    };

    setResults(calculatedResults);
    setIsCalculated(true);
  };

  const debouncedCalculate = useDebouncedCallback(handleCalculate, 300);

  // Auto-trigger calculation whenever any input changes for real-time validation and auto-calculation.
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalChildren,
    licenseCost,
    licenseDiscountPercent,
    discountEnabled,
    customKitsCost,
    students,
  ]);

  const handleStudentChange = (division, value) => {
    const numValue = value === "" ? 0 : parseInt(value);
    setStudents((prev) => ({ ...prev, [division]: numValue }));
    debouncedCalculate();
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    const details = {};

    Object.entries(divisions).forEach(([division, price]) => {
      if (division in students) {
        const numStudents = students[division];
        const kits = Math.ceil(numStudents / 3);
        const cost = kits * price;

        details[division] = {
          students: numStudents,
          kits: kits,
          kitPrice: price,
          cost: cost,
        };

        totalCost += cost;
      }
    });

    return { totalCost, details };
  };

  const validateTicket = (
    totalCost,
    ticketTotalDollars,
    customKitsCost = 0
  ) => {
    return totalCost + customKitsCost <= 0.2 * ticketTotalDollars;
  };

  const handleReset = () => {
    setStudents({
      Preescolar: 0,
      "Primaria Baja": 0,
      "Primaria Alta": 0,
      "Secundaria Baja": 0,
      "Secundaria Alta": 0,
    });
    setTotalChildren(0);
    setLicenseCost(894);
    setLicenseDiscountPercent(0);
    setDiscountEnabled(false);
    setTicketAmount(0);
    setCustomKitsCost(0);
    setResults(null);
    setIsCalculated(false);
  };

  // Group divisions for better conceptual organization.
  const groupedDivisions = {
    Preescolar: ["Preescolar"],
    Primaria: ["Primaria Baja", "Primaria Alta"],
    Secundaria: ["Secundaria Baja", "Secundaria Alta"],
  };

  return (
    <div className="p-5 space-y-8">
      <form className="space-y-8">
        {/* License Information Section */}
        <div className="section-container bg-pink-50 border border-pink-200 p-4 rounded-md space-y-4">
          <h3 className="text-lg font-semibold">Información General</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Total de Niños</label>
              <input
                type="number"
                min="0"
                placeholder="Ej. 50"
                value={totalChildren || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setTotalChildren(value);
                  const discountMultiplier = discountEnabled
                    ? (100 - licenseDiscountPercent) / 100
                    : 1;
                  const newTicketAmount =
                    value * licenseCost * discountMultiplier;
                  setTicketAmount(newTicketAmount);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">
                  Costo por Licencia (Q)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej. 894"
                  value={licenseCost || ""}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setLicenseCost(value);
                    const discountMultiplier = discountEnabled
                      ? (100 - licenseDiscountPercent) / 100
                      : 1;
                    const newTicketAmount =
                      totalChildren * value * discountMultiplier;
                    setTicketAmount(newTicketAmount);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">
                    Aplicar Descuento
                  </label>
                  <input
                    type="checkbox"
                    checked={discountEnabled}
                    onChange={(e) => {
                      setDiscountEnabled(e.target.checked);
                      if (!e.target.checked) {
                        setLicenseDiscountPercent(0);
                        const newTicketAmount = totalChildren * licenseCost;
                        setTicketAmount(newTicketAmount);
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <Info
                    title="El descuento máximo es 30%"
                    size={16}
                    className="text-gray-500"
                  />
                </div>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  disabled={!discountEnabled}
                  placeholder="% (max 30%)"
                  value={licenseDiscountPercent || ""}
                  onChange={(e) => {
                    const value = Math.min(parseFloat(e.target.value) || 0, 30);
                    setLicenseDiscountPercent(value);
                    const discountMultiplier = (100 - value) / 100;
                    const newTicketAmount =
                      totalChildren * licenseCost * discountMultiplier;
                    setTicketAmount(newTicketAmount);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Students Input Section (Grouped by Level) */}
        <div className="section-container bg-white border border-gray-200 p-4 rounded-md space-y-6">
          <h3 className="text-lg font-semibold">
            Cantidad de Estudiantes por División
          </h3>
          {Object.entries(groupedDivisions).map(([groupName, divisionKeys]) => (
            <div
              key={groupName}
              className="bg-blue-50 p-4 rounded-md space-y-2"
            >
              <h4 className="text-md font-semibold">{groupName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {divisionKeys.map((division) => (
                  <div key={division} className="flex flex-col">
                    <label className="text-sm font-medium">{division}</label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={students[division] || ""}
                        onChange={(e) =>
                          handleStudentChange(division, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <div className="ml-2 text-gray-500 text-sm whitespace-nowrap">
                        {division === "Preescolar"
                          ? "mTiny"
                          : division === "Primaria Baja"
                          ? "Codey Rocky"
                          : division === "Primaria Alta" ||
                            division === "Secundaria Baja"
                          ? "mBot V1"
                          : "mBot V2"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Kits Cost Section */}
        <div className="space-y-6">
          <div className="section-container bg-gray-50 border border-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Costo de Kits Propios (Q)</h3>
            <div className="relative">
              <span className="absolute top-2.5 left-3 text-gray-500">Q</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ej. 0.00"
                value={customKitsCost || ""}
                onChange={(e) =>
                  setCustomKitsCost(parseFloat(e.target.value) || 0)
                }
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Solo botón de Reiniciar */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer font-bold hover:bg-gray-300"
          >
            <IterationCcw className="mr-2" size={18} />
            Reiniciar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
