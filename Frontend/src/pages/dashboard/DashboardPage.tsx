import { useEffect, useState } from "react";

import api from "../../api/axios";
import StatCard from "../../components/dashboard/StatCard";

import type { DashboardStats } from "../../types/dashboard";

import RecentLeads from "../../components/dashboard/RecentLeads";
import LeadsChart from "../../components/dashboard/LeadsChart";

import { useAuth } from "../../context/AuthContext";



function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

    const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

    const [recentLeads, setRecentLeads] =
    useState([]);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get(
        "/dashboard/stats"
      );

      const leadsResponse = await api.get("/leads");

        setRecentLeads(
        leadsResponse.data.slice(0, 5)
        );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadDashboard = async () => {
    await fetchDashboardStats();
  };

  loadDashboard();
}, []);

  const formatCurrency = (
    amount: number
  ) => {
    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(amount);
  };

  if (loading) {
    return (
      <div className="text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Sales pipeline overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={stats?.totalLeads || 0}
        />

        <StatCard
          title="New Leads"
          value={stats?.newLeads || 0}
        />

        <StatCard
          title="Qualified Leads"
          value={
            stats?.qualifiedLeads || 0
          }
        />

        <StatCard
          title="Won Leads"
          value={stats?.wonLeads || 0}
        />

        <StatCard
          title="Lost Leads"
          value={stats?.lostLeads || 0}
        />

        <StatCard
          title="Total Deal Value"
          value={formatCurrency(
            stats?.totalEstimatedDealValue || 0
          )}
        />

        <StatCard
          title="Won Deal Value"
          value={formatCurrency(
            stats?.totalWonDealValue || 0
          )}
        />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <div className="xl:col-span-1">
            <RecentLeads leads={recentLeads} />
            </div>

            <div className="xl:col-span-2">
            <LeadsChart stats={stats} />
            </div>
        </div>
    </div>
  );
}

export default DashboardPage;