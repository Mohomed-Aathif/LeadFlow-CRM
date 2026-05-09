import { useEffect, useState } from "react";

import api from "../../api/axios";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import type { Lead } from "../../types/lead";

import StatusBadge from "../../components/leads/StatusBadge";

function LeadsPage() {
  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [leadSourceFilter, setLeadSourceFilter] =
    useState("");

  const [
    salespersonFilter,
    setSalespersonFilter,
  ] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/leads",
        {
          params: {
            search,
            status: statusFilter,
            leadSource:
              leadSourceFilter,
            assignedSalesperson:
              salespersonFilter,
          },
        }
      );

      setLeads(response.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to fetch leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    search,
    statusFilter,
    leadSourceFilter,
    salespersonFilter,
  ]);

  const deleteLead = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/leads/${id}`);

      toast.success("Lead deleted");

      fetchLeads();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete lead"
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your sales leads
          </p>
        </div>

        <Link
          to="/leads/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow-sm"
        >
          + Create Lead
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-slate-300 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            All Statuses
          </option>

          <option value="NEW">
            New
          </option>

          <option value="CONTACTED">
            Contacted
          </option>

          <option value="QUALIFIED">
            Qualified
          </option>

          <option value="PROPOSAL_SENT">
            Proposal Sent
          </option>

          <option value="WON">
            Won
          </option>

          <option value="LOST">
            Lost
          </option>
        </select>

        <select
          value={leadSourceFilter}
          onChange={(e) =>
            setLeadSourceFilter(
              e.target.value
            )
          }
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            All Sources
          </option>

          <option value="WEBSITE">
            Website
          </option>

          <option value="LINKEDIN">
            LinkedIn
          </option>

          <option value="REFERRAL">
            Referral
          </option>

          <option value="COLD_EMAIL">
            Cold Email
          </option>

          <option value="EVENT">
            Event
          </option>
        </select>

        <select
          value={salespersonFilter}
          onChange={(e) =>
            setSalespersonFilter(
              e.target.value
            )
          }
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            All Salespeople
          </option>

          <option value="Sarah Johnson">
            Sarah Johnson
          </option>

          <option value="Michael Brown">
            Michael Brown
          </option>

          <option value="Emma Wilson">
            Emma Wilson
          </option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">
              No leads found
            </h3>

            <p className="text-gray-500">
              Try adjusting your
              filters or create a new
              lead.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4">
                  Lead
                </th>

                <th className="text-left p-4">
                  Company
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Deal Value
                </th>

                <th className="text-left p-4">
                  Salesperson
                </th>

                <th className="text-left p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">
                        {lead.leadName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {lead.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {lead.companyName}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={lead.status}
                    />
                  </td>

                  <td className="p-4">
                    $
                    {lead.dealValue.toLocaleString()}
                  </td>

                  <td className="p-4">
                    {
                      lead.assignedSalesperson
                    }
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/leads/${lead.id}`}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        View
                      </Link>

                      <Link
                        to={`/leads/${lead.id}/edit`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteLead(
                            lead.id
                          )
                        }
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeadsPage;