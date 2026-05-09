interface StatusBadgeProps {
  status: string;
}

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const statusColors: Record<
    string,
    string
  > = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED:
      "bg-yellow-100 text-yellow-700",
    QUALIFIED:
      "bg-purple-100 text-purple-700",
    PROPOSAL_SENT:
      "bg-indigo-100 text-indigo-700",
    WON: "bg-green-100 text-green-700",
    LOST: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default StatusBadge;