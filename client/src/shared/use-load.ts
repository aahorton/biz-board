import { useEffect, useState } from "react";

export function useLoad<T>(fetcher: () => Promise<T>, key = "default") {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = () => {
    return fetcher().then(setData);
  };

  useEffect(() => {
    if (!key) {
      return;
    }
    setIsLoading(true);
    fetchList().finally(() => setIsLoading(false));
  }, [key]);

  return {
    data,
    isLoading,
    refetch: fetchList,
  };
}
