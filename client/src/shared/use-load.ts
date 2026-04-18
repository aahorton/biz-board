import { useEffect, useState } from "react";

export function useLoad<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = () => {
    return fetcher().then(setData);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchList().finally(() => setIsLoading(false));
  }, []);

  return {
    data,
    isLoading,
    refetch: fetchList,
  };
}
