import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "@/core/constants";

export function useTmdb<T>(url: string, params: Record<string, unknown>, deps: (string | number | undefined)[]) {
  const [data, setData] = useState<T | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: params excluded to prevent infinite re-renders
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: API_KEY,
            ...params,
          },
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, ...deps]);

  return { data };
}
