import type { Lead } from "../../types/lead";

import StatusBadge from "../leads/StatusBadge";

interface Props {
  leads: Lead[];
}

function RecentLeads({ leads }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-full">
      <h2 className="text-xl font-bold mb-6">
        Recent Leads
      </h2>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between border-b border-slate-100 pb-4"
          >
            <div>
              <p className="font-semibold">
                {lead.leadName}
              </p>

              <p className="text-sm text-gray-500">
                {lead.companyName}
              </p>
            </div>

            <StatusBadge
              status={lead.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentLeads;