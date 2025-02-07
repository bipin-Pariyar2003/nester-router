import React from "react";
import { useMemo } from "react";
import database from "../assets/data";

const useFilteredEntries = (selectedName) => {
  return useMemo(() => {
    if (!selectedName) return [];

    const staffEntries = [];
    database.data.forEach((e) => {
      e.entries.forEach((f) => {
        if (f.staffName === selectedName) {
          staffEntries.push({ ...f, date: e.date });
        }
      });
    });

    //Grouped Entries by Date
    return staffEntries.reduce((acc, e) => {
      if (!acc[e.date]) {
        acc[e.date] = [];
      }

      acc[e.date].push(e);
      return acc;
    }, {});
  }, [selectedName]);
};

export default useFilteredEntries;
