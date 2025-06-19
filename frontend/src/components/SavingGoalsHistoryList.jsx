import React from "react";

export default function SavingGoalsHistoryList({ history, loading, error }) {
  if (loading) return <div className="text-center py-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;
  if (!history.length) return <div className="text-center py-6 text-gray-500">No history found.</div>;

  function cleanAIResponse(ai_response) {
    if (!ai_response) return "";
    return ai_response.replace(/<think>[\s\S]*?<\/think>\s*/i, "").trim();
  }

  return (
    <div className="flex flex-col gap-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow rounded-2xl p-4 border border-gray-200 mb-2"
        >
          <div className="mb-3">
            <div>
              <span className="font-semibold text-gray-700">Name: </span>
              <span className="text-gray-900">{item.name}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Old Target: </span>
              <span className="text-gray-900">{item.old_target_amount}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Old Target Date: </span>
              <span className="text-gray-900">
                {item.old_target_date
                  ? new Date(item.old_target_date).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
          <hr className="my-2 border-gray-200" />
          <div>
            <span className="font-semibold text-gray-700">Old Description: </span>
            <span className="text-gray-900">{item.old_goal_decsription}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Old AI Response: </span>
            <span className="text-gray-900">{cleanAIResponse(item.old_ai_response)}</span>
          </div>
          <div className="text-xs text-gray-400">
            {item.updated_at
              ? new Date(item.updated_at).toLocaleString()
              : ""}
          </div>
        </div>
      ))}
    </div>
  );
}