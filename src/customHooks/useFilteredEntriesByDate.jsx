import React from "react";
import { useMemo } from "react";
import database from "../assets/data";

const useFilteredEntriesByDate = (selectedName, selectedDate) => {
  return useMemo(() => {
    const selectedData = database.data.find((e) => e.date === selectedDate);
    if (!selectedData) return [];
    return selectedData.entries.filter((entry) =>
      selectedName ? entry.staffName === selectedName : true
    );
  }, [selectedDate, selectedName]);
};

export default useFilteredEntriesByDate;
