import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];


const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);


  // Prepare Chart Data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onSeeMore = ()=>{
    navigate('/admin/tasks')
  }

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-2">
              Good Morning, <span className="gradient-text">{user?.name}</span>! 👋
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {moment().format("dddd, MMMM Do YYYY")} • Here's what's happening today
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Current Time</p>
              <p className="text-lg font-semibold text-neutral-900 dark:text-dark-text">
                {moment().format("h:mm A")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard
          label="Total Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color="bg-gradient-to-r from-primary-500 to-primary-600"
          trend="up"
          trendValue="12"
        />

        <InfoCard
          label="Pending Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Pending || 0
          )}
          color="bg-gradient-to-r from-warning-500 to-warning-600"
          trend="down"
          trendValue="5"
        />

        <InfoCard
          label="In Progress Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.InProgress || 0
          )}
          color="bg-gradient-to-r from-info-500 to-info-600"
          trend="up"
          trendValue="8"
        />

        <InfoCard
          label="Completed Tasks"
          value={addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Completed || 0
          )}
          color="bg-gradient-to-r from-success-500 to-success-600"
          trend="up"
          trendValue="15"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card-hover">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-text">Task Distribution</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Overview of task status</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>

          <CustomPieChart
            data={pieChartData}
            colors={COLORS}
          />
        </div>

        <div className="card-hover">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-text">Task Priority Levels</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Priority distribution</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>

          <CustomBarChart
            data={barChartData}
          />
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="card-hover">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-text">Recent Tasks</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Latest task activities</p>
          </div>

          <button 
            className="btn-secondary flex items-center gap-2 px-4 py-2" 
            onClick={onSeeMore}
          >
            View All
            <LuArrowRight className="text-base" />
          </button>
        </div>

        <TaskListTable tableData={dashboardData?.recentTasks || []} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
