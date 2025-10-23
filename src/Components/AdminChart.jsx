import React from "react";

const AdminChart = () => {

  const users = [
    {
      id: 1,
      name: "Jane Cooper",
      mobileNo: "123-456-7890",
      email: "jane.cooper@example.com",
      address: "123 Main St, City, Country",
      status: "Active",
      role: "Admin",
      date: "2025-01-01",
    },
    {
      id: 2,
      name: "John Smith",
      mobileNo: "987-654-3210",
      email: "john.smith@example.com",
      address: "456 Elm St, City, Country",
      status: "Inactive",
      role: "User",
      date: "2025-01-10",
    },
    {
      id: 3,
      name: "Emily Davis",
      mobileNo: "555-123-4567",
      email: "emily.davis@example.com",
      address: "789 Oak St, City, Country",
      status: "Active",
      role: "User",
      date: "2025-01-05",
    },
  ];

  // Calculate the number of users in each status category
  const statusCounts = {
    "License Applied": users.filter(user => user.status === "License Applied").length,
    Inprogress: users.filter(user => user.status === "Inprogress").length,
    Active: users.filter(user => user.status === "Active").length,
    Inactive: users.filter(user => user.status === "Inactive").length,
  };

  // Total number of users to calculate the maximum circle size
  const totalUsers = users.length;

  // Helper function to create a circular progress bar
  const CircleProgress = ({ count, statusName, maxCount }) => {
    const radius = 20; // Radius of the circle
    const strokeWidth = 4; // Thickness of the stroke
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const strokeDashoffset = circumference - (count / maxCount) * circumference; // Length of the unfilled part of the circle

    return (
      
      <div className="flex flex-col items-center">

        
        <svg width="50" height="50" className="transform rotate-90">
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke={
              statusName === "License Applied"
                ? "#3b82f6"
                : statusName === "Inprogress"
                ? "#f59e0b"
                : statusName === "Active"
                ? "#16a34a"
                : "#ef4444"
            }
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="text-sm font-semibold text-gray-900">{statusName}</div>
        <div className="text-2xl font-bold">{count}</div>
      </div>
    );
  };

  return (
    <>
    
   
    <div class="max-w-3xl mx-auto text-center mt-2 mb-4">
    <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">License Management</span>
        <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
    </h1>
    {/* <p class="text-lg text-gray-800 mb-8"></p> */}
</div>
 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <CircleProgress
          count={statusCounts["License Applied"]}
          statusName="License Applied"
          maxCount={totalUsers}
        />
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
        <CircleProgress
          count={statusCounts.Inprogress}
          statusName="In Progress"
          maxCount={totalUsers}
        />
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow-md">
        <CircleProgress
          count={statusCounts.Active}
          statusName="Active"
          maxCount={totalUsers}
        />
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow-md">
        <CircleProgress
          count={statusCounts.Inactive}
          statusName="Inactive"
          maxCount={totalUsers}
        />
      </div>
    </div>
    </>
  );
};

export default AdminChart;
