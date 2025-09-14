import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CategoryPieChart from "./PieChart";

// Fetch carts from Fake Store API
const fetchCarts = async () => {
  const res = await fetch("https://fakestoreapi.com/carts");
  return res.json();
};

// 🔹 Skeleton Loader for Charts
const ChartSkeleton = () => (
  <div className="flex-1">
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg">
      <div className="bg-gray-900 rounded-2xl p-6 h-[300px] animate-pulse">
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>
        <div className="h-full w-full bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);

const RevenueChart = () => {
  const { data: carts = [], isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  if (error) return <p className="text-red-400 p-6">⚠️ Failed to load chart</p>;

  // Transform data: sum total price per cart date
  const chartData = carts.map((cart) => {
    const total = cart.products.reduce(
      (sum, p) => sum + p.quantity * 20, // approximation
      0
    );

    return {
      date: new Date(cart.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: total,
    };
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Revenue Line Chart */}
      <div className="flex-1">
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg">
          <div className="bg-gray-900 rounded-2xl p-6 h-full">
            <h2 className="text-lg font-semibold text-white mb-4">Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Pie/Donut Chart */}
      <div className="flex-1">
        <div className="relative rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg">
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
