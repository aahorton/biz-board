import { useEffect, useState } from "react";
import { processApi } from "../api";
import { Process } from "./types";

export function useProcess(id: string) {
  const [process, setProcess] = useState<Process>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProcess = () => {
    return processApi.getById(id).then((process) => {
      setProcess(process);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProcess().finally(() => setIsLoading(false));
  }, []);

  return {
    data: process,
    isLoading,
    refetch: fetchProcess,
  };
}
