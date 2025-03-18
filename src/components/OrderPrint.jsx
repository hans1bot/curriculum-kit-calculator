import React from "react";
import { Printer } from "lucide-react";

const FACTOR_CONVERSION = 7.5; // Q7.5 = $1

import { formatCurrency, formatInteger } from "../utils/formatters";

const OrderPrint = ({ results }) => {
  const handlePrint = () => {
    if (!results) return; // Prevent printing if there are no results

    const printWindow = window.open("", "_blank");

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Orden de Pedido de Kits</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #00B1E5;
            padding-bottom: 10px;
          }
          .header h1 {
            color: #00B1E5;
            font-size: 24px;
            margin: 0 0 5px 0;
          }
          .order-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
            text-align: left;
          }
          tfoot td {
            font-weight: bold;
            background-color: #f9f9f9;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            font-size: 18px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .validation {
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 30px;
            text-align: center;
          }
          .validation.valid {
            background-color: #e8f5e9;
            border: 1px solid #a5d6a7;
            color: #1b5e20;
          }
          .validation.invalid {
            background-color: #ffebee;
            border: 1px solid #ef9a9a;
            color: #b71c1c;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
          }
          .signature {
            width: 45%;
            text-align: center;
          }
          .signature-line {
            border-top: 1px solid #000;
            padding-top: 5px;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ORDEN DE PEDIDO DE KITS</h1>
          <p>1bot Kits</p>
        </div>
        
        <div class="order-info">
          <div>
            <p><strong>Fecha:</strong> ${getCurrentDate()}</p>
            <p><strong>No. Orden:</strong> ${getOrderNumber()}</p>
          </div>
          <div>
            <p><strong>Total de Niños:</strong> ${formatInteger(
              results.totalChildren
            )}</p>
            <p><strong>Valor del Ticket:</strong> Q${formatCurrency(
              results.ticketAmount
            )}</p>
            <p><strong>Estado:</strong> ${
              results.isValid ? "ACEPTABLE" : "NO ACEPTABLE"
            }</p>
          </div>
        </div>
        
        <div class="section">
          <h2>Detalle de Pedido</h2>
          <table>
            <thead>
              <tr>
                <th>División</th>
                <th>Tipo de Kit</th>
                <th style="text-align: right">Estudiantes</th>
                <th style="text-align: right">Cantidad Kits</th>
                <th style="text-align: right">Precio Unitario</th>
                <th style="text-align: right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(results.details)
                .filter(([_, info]) => info.students > 0)
                .map(
                  ([division, info]) => `
                  <tr>
                    <td>${division}</td>
                    <td style="text-align: center">
                      ${
                        division === "Preescolar"
                          ? "mTiny"
                          : division === "Primaria Baja"
                          ? "Codey Rocky"
                          : division === "Primaria Alta" ||
                            division === "Secundaria Baja"
                          ? "mBot"
                          : "mBot2"
                      }
                    </td>
                    <td style="text-align: right">${formatInteger(
                      info.students
                    )}</td>
                    <td style="text-align: right">${formatInteger(
                      info.kits
                    )}</td>
                    <td style="text-align: right">Q${formatCurrency(
                      info.kitPrice * FACTOR_CONVERSION
                    )}</td>
                    <td style="text-align: right">Q${formatCurrency(
                      info.cost * FACTOR_CONVERSION
                    )}</td>
                  </tr>
                `
                )
                .join("")}
              ${
                results.customKitsCostQuetzales > 0
                  ? `
                <tr>
                  <td colspan="4">Kits Propios</td>
                  <td style="text-align: right">-</td>
                  <td style="text-align: right">Q${formatCurrency(
                    results.customKitsCostQuetzales
                  )}</td>
                </tr>
              `
                  : ""
              }
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5"><strong>Total</strong></td>
                <td style="text-align: right"><strong>Q${formatCurrency(
                  results.completeCostQuetzales
                )}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="section">
          <h2>Información de Licencias</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Total de Niños:</strong></td>
                <td style="text-align: right">${formatInteger(
                  results.totalChildren
                )}</td>
              </tr>
              <tr>
                <td><strong>Costo por Licencia:</strong></td>
                <td style="text-align: right">Q${formatCurrency(
                  results.licenseCost
                )}</td>
              </tr>
              ${
                results.discountEnabled && results.licenseDiscountPercent > 0
                  ? `
                <tr>
                  <td><strong>Descuento Aplicado:</strong></td>
                  <td style="text-align: right">${results.licenseDiscountPercent}%</td>
                </tr>
              `
                  : ""
              }
              <tr style="border-top: 1px solid #eee">
                <td><strong>Valor Total del Ticket:</strong></td>
                <td style="text-align: right"><strong>Q${formatCurrency(
                  results.ticketAmount
                )}</strong></td>
              </tr>
              <tr>
                <td><strong>20% del Ticket (límite):</strong></td>
                <td style="text-align: right">Q${formatCurrency(
                  results.ticketPercentageQuetzales
                )}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="validation ${results.isValid ? "valid" : "invalid"}">
          <p><strong>
            ${
              results.isValid
                ? `El pedido es ACEPTABLE. El costo total (Q${formatCurrency(
                    results.completeCostQuetzales
                  )}) no supera el 20% del ticket (Q${formatCurrency(
                    results.ticketPercentageQuetzales
                  )}).`
                : `El pedido NO es ACEPTABLE. El costo total (Q${formatCurrency(
                    results.completeCostQuetzales
                  )}) supera el 20% del ticket (Q${formatCurrency(
                    results.ticketPercentageQuetzales
                  )}).`
            }
          </strong></p>
        </div>
        
        <div class="footer">
          <p>Documento generado el ${getCurrentDate()} • 1bot</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getOrderNumber = () => {
    return `ORD-${Date.now().toString().substring(6)}`;
  };

  return (
    <div className="flex sm:justify-center justify-end  mb-4">
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md cursor-pointer font-medium hover:bg-blue-700 transition-colors"
      >
        <Printer className="mr-2" size={18} />
        Imprimir Orden de Pedido
      </button>
    </div>
  );
};

export default OrderPrint;
