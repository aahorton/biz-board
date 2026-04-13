import { useParams } from "react-router-dom";

export function useProcessId() {
  const { id } = useParams();

  return id!;
}
