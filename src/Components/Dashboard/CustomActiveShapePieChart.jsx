import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaUsers, FaUserTimes, FaIdBadge, FaChartPie, FaArrowUp, FaArrowDown } from "react-icons/fa";
import api from "../../Utils/api1";
import CustomerManagement from "../../Components/CustomerManagement";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/api/customer/getAllCustomerCount");
      if (response.data.code === "SUCCESS") {
        setData(response.data.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch customers");
        setError("Failed to load data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError("Failed to load data");
      setLoading(false);
    }
  };

  // Show Loading State
  if (loading) return (
    <div className="flex items-center justify-center min-h-64 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading Dashboard Data...</p>
      </div>
    </div>
  );

  // Show Error State
  if (error) return (
    <div className="text-center py-10 text-red-500 animate-fade-in">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2">Unable to Load Data</h3>
      <p className="text-gray-600">{error}</p>
      <button
        onClick={fetchCustomers}
        className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  );

  // Prepare Chart Data
  const chartData = {
    labels: ["ACTIVE", "PENDING", "RENEW"],  
    datasets: [
      {
        data: [data.ACTIVE, data.PENDING, data.RENEW],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 2,
        hoverBackgroundColor: ["#059669", "#D97706", "#DC2626"],
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { 
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8
      },
    },
  };

  const statsCards = [
    {
      title: "Available Customers",
      value: data.AVAILABLE,
      icon: <FaUsers className="text-3xl" />,
      color: "from-emerald-400 to-cyan-500",
      hoverColor: "from-emerald-500 to-cyan-600",
      trend: "up",
      description: "Active customers"
    },
    {
      title: "Unavailable Customers",
      value: data.UNAVAILABLE,
      icon: <FaUserTimes className="text-3xl" />,
      color: "from-amber-400 to-orange-500",
      hoverColor: "from-amber-500 to-orange-600",
      trend: "down",
      description: "Inactive customers"
    },
    {
      title: "Licenses Delivered",
      value: data["TOTAL License Of CUSTOMERS"],
      icon: <FaIdBadge className="text-3xl" />,
      color: "from-blue-400 to-purple-500",
      hoverColor: "from-blue-500 to-purple-600",
      trend: "up",
      description: "Total licenses issued"
    },
    {
      title: "License Status",
      value: "Overview",
      icon: <FaChartPie className="text-3xl" />,
      color: "from-gray-400 to-gray-600",
      hoverColor: "from-gray-500 to-gray-700",
      trend: "chart",
      description: "Status distribution"
    }
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen rounded-2xl p-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Real-time insights and analytics</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mt-4 animate-scale-in"></div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up border border-white/20 backdrop-blur-sm ${
                hoveredCard === index ? 'ring-4 ring-white/30' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  {card.icon}
                </div>
                {card.trend === "chart" ? (
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FaChartPie className="text-xl" />
                  </div>
                ) : (
                  <div className={`p-2 rounded-full ${card.trend === "up" ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                    {card.trend === "up" ? (
                      <FaArrowUp className="text-green-200" />
                    ) : (
                      <FaArrowDown className="text-red-200" />
                    )}
                  </div>
                )}
              </div>
              
              {card.trend === "chart" ? (
                <div className="h-32 flex items-center justify-center">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold mb-2 drop-shadow-lg">{card.value}</p>
                  <h3 className="text-lg font-semibold mb-1 drop-shadow-md">{card.title}</h3>
                </>
              )}
              
              <p className="text-white/80 text-sm font-medium drop-shadow-sm">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Detailed Chart Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-200/50 animate-fade-in-up delay-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">License Status Distribution</h3>
              <div className="p-2 bg-cyan-100 rounded-lg">
                <FaChartPie className="text-cyan-600 text-xl" />
              </div>
            </div>
            <div className="h-80">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-600 font-bold text-lg">{data.ACTIVE}</div>
                <div className="text-emerald-700 text-sm font-medium">Active</div>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-amber-600 font-bold text-lg">{data.PENDING}</div>
                <div className="text-amber-700 text-sm font-medium">Pending</div>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <div className="text-red-600 font-bold text-lg">{data.RENEW}</div>
                <div className="text-red-700 text-sm font-medium">Renew</div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl p-6 text-white animate-fade-in-up delay-400">
            <h3 className="text-xl font-semibold mb-6 text-center">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/30 rounded-lg">
                    <FaUsers className="text-lg" />
                  </div>
                  <span className="font-semibold">Total Customers</span>
                </div>
                <span className="text-2xl font-bold">{data.AVAILABLE + data.UNAVAILABLE}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/30 rounded-lg">
                    <FaIdBadge className="text-lg" />
                  </div>
                  <span className="font-semibold">Active Licenses</span>
                </div>
                <span className="text-2xl font-bold">{data.ACTIVE}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/30 rounded-lg">
                    <FaChartPie className="text-lg" />
                  </div>
                  <span className="font-semibold">Completion Rate</span>
                </div>
                <span className="text-2xl font-bold">
                  {Math.round((data.ACTIVE / (data.ACTIVE + data.PENDING + data.RENEW)) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CustomerManagement Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 animate-fade-in-up delay-500">
          <CustomerManagement />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
      `}</style>
    </div>
  );
};

export default DashboardOverview;