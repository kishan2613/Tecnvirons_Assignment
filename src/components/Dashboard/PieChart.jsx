import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Fetch products
const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"]; // Indigo, Green, Yellow, Red

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, percent } = payload[0];
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-md border border-gray-700">
        <p className="font-semibold">{name}</p>
        <p>Products: {value}</p>
        <p>Share: {(percent * 100).toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

const CategoryPieChart = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="text-gray-400 p-6">Loading chart...</p>;
  if (error) return <p className="text-red-400 p-6">Failed to load chart</p>;

  // Count products by category
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCount).map((cat) => ({
    name: cat,
    value: categoryCount[cat],
  }));

  return (
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg">
      <div className="bg-gray-900 rounded-2xl p-4 h-full">
        <h2 className="text-lg font-semibold text-white mb-4">Products by Category</h2>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}   // ✅ donut style
              outerRadius={120}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;
