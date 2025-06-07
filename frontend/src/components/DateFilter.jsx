import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function getLastMonthRange() {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  return { startDate: start, endDate: end };
}

export default function DateFilter({ onDateChange }) {
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

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    if (
      ranges.selection.startDate &&
      ranges.selection.endDate &&
      ranges.selection.startDate.getTime() !==
        ranges.selection.endDate.getTime()
    ) {
      setFiltered(true);
      setShowCalendar(false);
      if (onDateChange) {
        // Add 1 day to endDate for inclusivity
        const endDate = new Date(ranges.selection.endDate);
        endDate.setDate(endDate.getDate() + 1);
        onDateChange({
          start: ranges.selection.startDate.toISOString().slice(0, 10),
          end: endDate.toISOString().slice(0, 10),
        });
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

  const formatDate = (date) => (date ? date.toLocaleDateString() : "");

  const displayStart = filtered ? dateRange[0].startDate : lastMonth.startDate;
  const displayEnd = filtered ? dateRange[0].endDate : lastMonth.endDate;

  return (
    <div className="ml-8 flex flex-col items-start mb-4">
      <div className="flex items-center">
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
        <div className="w-70 flex flex-col items-center justify-center bg-white p-2 shadow rounded-2xl ml-4">
          {dateRange[0].startDate && dateRange[0].endDate && (
            <span className="text-center w-full">
              Selected: {formatDate(displayStart)} - {formatDate(displayEnd)}
            </span>
          )}
        </div>
      </div>
      {showCalendar && (
        <div className="z-50 mt-2 flex flex-col items-start gap-2">
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
  );
}
