import { useBlockTypes } from "../../../generic-modules/block";

export function useFormBlockTypes() {
  const types = useBlockTypes((s) => s.getData());

  const typesOptions = Object.values(types).map((typeObject) => ({
    value: typeObject!.type,
    label: typeObject!.type,
  }));

  return {
    typesOptions,
    types,
  };
}
