import { useMemo } from "react";
import database from "../assets/data";

const useNameSet = () => {
  const nameSet = useMemo(() => {
    const uniquNameSet = new Set();
    database.data.forEach((e) => {
      e.entries.forEach((f) => {
        uniquNameSet.add(f.staffName);
      });
    });
    return [...new Set(uniquNameSet)];
  }, []);

  return nameSet;
};

export default useNameSet;
