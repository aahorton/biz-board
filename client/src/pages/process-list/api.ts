import { ProcessListItem } from "./model/use-list";

export const processApi = {
  async list() {
    return await fetch("/api/processes").then(
      (res) => res.json() as Promise<ProcessListItem[]>
    );
  },

  async create(name: string) {
    return await fetch("/api/processes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
  },

  async delete(id: string) {
    return await fetch(`/api/processes/${id}`, {
      method: "DELETE",
    });
  },
};
