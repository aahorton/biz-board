import { useEffect, useState } from "react";

export function useLoad<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = () => {
    setIsLoading(true);
    fetcher()
      .then(setData)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return {
    data,
    isLoading,
    refetch: fetchList,
  };
}
