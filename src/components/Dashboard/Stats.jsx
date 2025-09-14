import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const fetchUsers = async () => {
  const res = await fetch("https://fakestoreapi.com/users");
  return res.json();
};

const fetchCarts = async () => {
  const res = await fetch("https://fakestoreapi.com/carts");
  return res.json();
};

// 🔹 Skeleton Card Component
const StatSkeleton = () => (
  <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg">
    <div className="bg-gray-900 rounded-2xl p-6 h-full animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

const StatsCards = () => {
  const { data: products = [], isLoading: loadingProducts, error: productsError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: users = [], isLoading: loadingUsers, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: carts = [], isLoading: loadingCarts, error: cartsError } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  // 🔹 Show Skeletons while loading
  if (loadingProducts || loadingUsers || loadingCarts) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  if (productsError || usersError || cartsError) {
    return <p className="text-red-400 p-6">⚠️ Failed to load API data</p>;
  }

  // 🔹 Stats calculations
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = carts.length;
  const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / totalProducts).toFixed(2);

  const stats = [
    { title: "Total Products", value: totalProducts, gradient: "from-cyan-500 to-blue-600", isCurrency: false },
    { title: "Total Users", value: totalUsers, gradient: "from-green-400 to-emerald-600", isCurrency: false },
    { title: "Total Orders", value: totalOrders, gradient: "from-yellow-400 to-orange-500", isCurrency: false },
    { title: "Average Price", value: avgPrice, gradient: "from-pink-400 to-violet-600", isCurrency: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg"
        >
          <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col justify-between">
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {stat.isCurrency ? "$" : ""}
              <CountUp end={stat.value} duration={2} separator="," />
            </p>
            <p
              className={`text-sm mt-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
            >
              Live Data
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
