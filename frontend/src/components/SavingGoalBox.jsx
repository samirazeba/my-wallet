import React from "react";
import useSavingGoals from "../hooks/useSavingGoals";

export default function SavingGoalBox() {
  const userId = localStorage.getItem("user_id");
  // Always fetch latest by updated_at desc
  const { goals, loading, error } = useSavingGoals(
    userId,
    "updated_at",
    "desc"
  );
  // Pick the latest goal
  const goal = goals && goals.length > 0 ? goals[0] : null;

  function cleanAIResponse(ai_response) {
    if (!ai_response) return "";
    return ai_response.replace(/<think>[\s\S]*?<\/think>\s*/i, "").trim();
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="font-semibold text-lg">Saving Goal</div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : goal ? (
        <>
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-semibold text-[#3b4a6b]">Goal:</span>{" "}
              <span className="text-gray-800">{goal.name}</span>
            </div>
            <div>
              <span className="font-semibold text-[#3b4a6b]">Target:</span>{" "}
              <span className="text-gray-800">{goal.target_amount} BAM</span>
              <span className="text-gray-500 ml-2">
                by {goal.target_date?.slice(0, 10)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#3b4a6b]">Description:</span>{" "}
              <span className="text-gray-700">{goal.goal_description}</span>
            </div>
          </div>
          {/* Optional: Progress bar if you have current_amount */}
          {/* {goal.current_amount && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>
                  {goal.current_amount} / {goal.target_amount} BAM
                </span>
              </div>
              <div className="w-full bg-[#b3c7e6]/30 rounded-full h-3">
                <div
                  className="bg-[#b3c7e6] h-3 rounded-full"
                  style={{
                    width: `${Math.min(
                      (goal.current_amount / goal.target_amount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          )} */}
          {typeof goal.current_amount !== "undefined" && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>
                  {Number(goal.current_amount).toLocaleString()} /{" "}
                  {Number(goal.target_amount).toLocaleString()}{" "}
                  {goal.currency || "BAM"}
                </span>
              </div>
              <div className="w-full bg-[#b3c7e6]/30 rounded-full h-3">
                <div
                  className="bg-[#b3c7e6] h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (goal.current_amount / goal.target_amount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {goal.target_amount - goal.current_amount > 0
                  ? `You need ${Number(
                      goal.target_amount - goal.current_amount
                    ).toLocaleString()} ${
                      goal.currency || "BAM"
                    } more to reach your goal.`
                  : "Goal reached!"}
              </div>
            </div>
          )}
          {goal.ai_response && (
            <div className="mt-2 p-3 bg-white/80 rounded-xl border border-[#b3c7e6]">
              <span className="font-semibold text-[#3b4a6b]">Solution:</span>
              <div className="text-gray-700 mt-1">
                {cleanAIResponse(goal.ai_response)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500">No saving goals found.</div>
      )}
    </div>
  );
}
