import { useLoad } from "../../../shared/use-load";

export type ListApi<T extends { id: string }, P> = {
  list: () => Promise<T[]>;
  create: (name: P) => Promise<unknown>;
  delete: (id: string) => Promise<unknown>;
};

export function useList<T extends { id: string }, P>(listApi: ListApi<T, P>) {
  const {
    data: processList = [],
    refetch,
    isLoading,
  } = useLoad(() => listApi.list());

  const createItem = async (params: P) => {
    await listApi.create(params);
    refetch();
  };

  const deleteItem = async (id: string) => {
    await listApi.delete(id);
    refetch();
  };

  const items = processList.map((item) => ({
    ...item,
    onDelete: () => deleteItem(item.id),
  }));

  return {
    items,
    createItem,
    isLoading,
  };
}
