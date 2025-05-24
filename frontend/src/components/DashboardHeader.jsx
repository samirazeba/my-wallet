import { useState } from "react";
import { Divide, Filter, X } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function getLastMonthRange() {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  return { startDate: start, endDate: end };
}

export default function DashboardHeader({ onDateChange }) {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const lastMonth = getLastMonthRange();
  const [dateRange, setDateRange] = useState([
    {
      startDate: lastMonth.startDate,
      endDate: lastMonth.endDate,
      key: "selection",
    },
  ]);

  // Call parent handler when date changes
  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    if (
      ranges.selection.startDate &&
      ranges.selection.endDate &&
      ranges.selection.startDate.getTime() != ranges.selection.endDate.getTime()
    ) {
      setShowCalendar(false);
      if (onDateChange) {
        onDateChange(ranges.selection);
      }
    }
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
    if (!filtered) {
      setDateRange([
        {
          startDate: lastMonth.startDate,
          endDate: lastMonth.endDate,
          key: "selection",
        },
      ]);
    }
  };

  // Format dates for display
  const formatDate = (date) => (date ? date.toLocaleDateString() : "");

  const displayStart = filtered ? dateRange[0].startDate : lastMonth.startDate;
  const displayEnd = filtered ? dateRange[0].endDate : lastMonth.endDate;

  return (
    <div>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Hello, User</h1>
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="bankAccount" className="text-sm font-medium">
            Please choose your bank account
          </label>
          <select
            id="bankAccount"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border rounded-lg p-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300 w-55"
          >
            <option value="">Select your bank account</option>
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
            <option value="account3">Account 3</option>
          </select>
        </div>
      </div>
      <div className="ml-8">
        <button
          className="flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setFiltered(false);
          }}
        >
          <Filter className="w-5 h-5 mr-1" />
          <span className="text-sm">Filter your time period</span>
        </button>

        <div className="w-70 flex flex-col items-center justify-center bg-white p-2 shadow rounded-2xl mb-4 mt-2">
          {dateRange[0].startDate && dateRange[0].endDate && (
            <span className="text-center w-full">
              Selected: {formatDate(displayStart)} - {formatDate(displayEnd)}
            </span>
          )}
        </div>

        {showCalendar && (
          <div className="z-50 mt-2 flex items-start gap-2">
            <button
              className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow self-start"
              onClick={handleCloseCalendar}
              type="button"
              aria-label="Close calendar"
            >
              <X className="w-5 h-5" />
            </button>
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              maxDate={new Date()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
