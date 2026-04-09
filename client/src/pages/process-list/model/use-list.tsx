import { useEffect, useState } from "react";
import { processApi } from "../api";

export type ProcessListItem = {
  id: string;
  name: string;
};

export function useList() {
  const [processList, setProcessList] = useState<ProcessListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = () => {
    setIsLoading(true);
    processApi
      .list()
      .then(setProcessList)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, []);

  const create = async (name: string) => {
    await processApi.create(name);
    fetchList();
  };

  const deleteProcess = async (id: string) => {
    await processApi.delete(id);
    fetchList();
  };

  const items = processList.map((item) => ({
    ...item,
    onDelete: () => deleteProcess(item.id),
  }));

  return {
    items,
    create,
    isLoading,
  };
}
