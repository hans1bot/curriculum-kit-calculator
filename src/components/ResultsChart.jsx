// Modificar ResultsChart.jsx para eliminar la leyenda inferior
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../utils/formatters";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ResultsChart = ({ data }) => {
  // Comprobar si hay datos válidos
  if (!data || !data.details) {
    return (
      <div className="text-center text-gray-500">
        Ingresa datos para generar el gráfico.
      </div>
    );
  }

  // Transform data into chart format
  const chartData = Object.entries(data.details)
    .filter(([_, details]) => details.cost > 0) // Solo incluir divisiones con costos > 0
    .map(([division, details], index) => ({
      name: division,
      value: details.cost,
      color: COLORS[index % COLORS.length],
    }));

  // Si no hay datos con costo después del filtrado, mostrar mensaje
  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Ingresa datos para generar el gráfico.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          labelLine={true}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `Q${formatCurrency(value)}`}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "8px",
          }}
        />
        {/* Se ha eliminado el componente Legend */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ResultsChart;
