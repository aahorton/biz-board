import { processApi } from "./api";
import { useFilters } from "./model/use-filters";
import { useList } from "./model/use-list";
import { Card } from "./ui/card";
import { CreateForm } from "./ui/create-form";
import { Filters } from "./ui/filters";
import { Root } from "./ui/root";

export function Page() {
  const list = useList(processApi);
  const [filteredList, filters] = useFilters(list.items);

  return (
    <Root
      isLoading={list.isLoading}
      actionsPanel={
        <>
          <CreateForm onSubmit={list.createItem} />
          <Filters q={filters.q} onQChange={filters.setQ} />
        </>
      }
      list={filteredList.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          onDelete={item.onDelete}
        />
      ))}
    />
  );
}
