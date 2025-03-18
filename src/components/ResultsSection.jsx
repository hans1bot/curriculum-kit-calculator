import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import OrderPrint from "./OrderPrint";
import ResultsChart from "./ResultsChart";
import { formatCurrency, formatInteger } from "../utils/formatters";

const ResultsSection = ({ results, isCalculated }) => {
  if (!isCalculated) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-gray-400 p-8">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">Resultados</div>
          <div className="text-sm">
            Los resultados aparecerán aquí después de realizar el cálculo
          </div>
        </div>
      </div>
    );
  }

  return (
    results && (
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Resultados del Cálculo</h3>

        <OrderPrint results={results} />

        {/* Cost Distribution Chart */}
        <div className="mb-6 p-4 bg-white rounded-md border border-gray-200">
          <h4 className="text-md font-medium mb-4">Distribución de Costos</h4>
          <ResultsChart data={results} />
        </div>

        {/* Division Details */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Detalle por División:</h4>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-4">
              <table className="min-w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 text-left text-sm font-medium border-gray-200 border">
                      División
                    </th>
                    <th className="px-3 py-2 text-right text-sm font-medium border-gray-200 border">
                      Estudiantes
                    </th>
                    <th className="px-3 py-2 text-right text-sm font-medium border-gray-200 border">
                      Kits
                    </th>
                    <th className="px-3 py-2 text-right text-sm font-medium border-gray-200 border">
                      Precio Kit (Q)
                    </th>
                    <th className="px-3 py-2 text-right text-sm font-medium border-gray-200 border">
                      Costo Total (Q)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results.details).map(([division, info]) => (
                    <tr key={division} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm border-gray-200 border">
                        {division}
                      </td>
                      <td className="px-3 py-2 text-right text-sm border-gray-200 border">
                        {formatInteger(info.students)}
                      </td>
                      <td className="px-3 py-2 text-right text-sm border-gray-200 border">
                        {formatInteger(info.kits)}
                      </td>
                      <td className="px-3 py-2 text-right text-sm border-gray-200 border">
                        Q{formatCurrency(info.kitPrice * 7.5)}
                      </td>
                      <td className="px-3 py-2 text-right text-sm border-gray-200 border">
                        Q{formatCurrency(info.cost * 7.5)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <h4 className="text-md font-medium mb-3">Resumen de Costos</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Costo Total Kits Curriculares:
                </span>
                <span className="font-medium">
                  Q{formatCurrency(results.totalCostQuetzales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Costo Kits Propios:</span>
                <span className="font-medium">
                  Q{formatCurrency(results.customKitsCostQuetzales)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-600 font-medium">Costo Total:</span>
                <span className="font-bold">
                  Q{formatCurrency(results.completeCostQuetzales)}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <h4 className="text-md font-medium mb-3">Validación del Ticket</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total de Niños:</span>
                <span className="font-medium">
                  {formatInteger(results.totalChildren)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Costo por Licencia:</span>
                <span className="font-medium">
                  Q{formatCurrency(results.licenseCost)}
                </span>
              </div>
              {results.discountEnabled &&
                results.licenseDiscountPercent > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descuento Aplicado:</span>
                    <span className="font-medium">
                      {results.licenseDiscountPercent.toFixed(1)}%
                    </span>
                  </div>
                )}
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-600">Valor Total del Ticket:</span>
                <span className="font-medium">
                  Q{formatCurrency(results.ticketAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">20% del Ticket:</span>
                <span className="font-medium">
                  Q{formatCurrency(results.ticketPercentageQuetzales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Costo Total Kits:</span>
                <span className="font-medium">
                  Q{formatCurrency(results.completeCostQuetzales)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Diferencia:</span>
                <span className="font-bold">
                  Q
                  {formatCurrency(
                    results.ticketPercentageQuetzales -
                      results.completeCostQuetzales
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-600 font-medium">Resultado:</span>
                <div className="flex items-center">
                  {results.isValid ? (
                    <>
                      <CheckCircle className="text-green-500 mr-1" size={18} />
                      <span className="font-bold text-green-500">
                        ACEPTABLE
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500 mr-1" size={18} />
                      <span className="font-bold text-red-500">
                        NO ACEPTABLE
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Result Banner */}
        <div
          className={`mt-4 p-3 rounded-md flex items-start sm:items-center text-sm sm:text-base ${
            results.isValid
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {results.isValid ? (
            <>
              <CheckCircle
                className="mr-2 flex-shrink-0 mt-0.5 sm:mt-0"
                size={20}
              />
              <span>
                El ticket es ACEPTABLE según la restricción (el costo total no
                supera el 20% del ticket - Q
                {formatCurrency(results.ticketPercentageQuetzales)}).
              </span>
            </>
          ) : (
            <>
              <XCircle
                className="mr-2 flex-shrink-0 mt-0.5 sm:mt-0"
                size={20}
              />
              <span>
                El ticket NO es ACEPTABLE según la restricción (el costo total
                supera el 20% del ticket - Q
                {formatCurrency(results.ticketPercentageQuetzales)}).
              </span>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default ResultsSection;
