import { BlockTypesRecord } from "../../../generic-modules/block";
import { removeUndefined } from "../../../shared/lib/object";
import { BlockTypes } from "../model/types";
import { useForm } from "react-hook-form";

export type FormData = {
  name: string;
  type: string;
  data: string;
  [key: string]: unknown;
};

export function useManageBlockForm({
  onSubmit,
  blockTypes,
  defaultFields,
}: {
  onSubmit: (data: FormData) => void;
  blockTypes: BlockTypesRecord;
  defaultFields?: FormData;
}) {
  const form = useForm<FormData>();

  const typeValue =
    form.watch("type") ?? defaultFields?.type ?? BlockTypes.Start;

  const getDefaultValue = () => {
    if (defaultFields) return defaultFields;
    return {
      name: blockTypes[typeValue]?.label ?? "Start",
      type: typeValue,
      data: `{}`,
    };
  };
  const getParsedDefaultData = () => {
    return JSON.parse(getDefaultValue().data) as { [key: string]: unknown };
  };

  const handleSubmit = form.handleSubmit(({ data, name, type, ...rest }) => {
    onSubmit({
      ...getDefaultValue(),
      ...removeUndefined({ name, type }),
      data: JSON.stringify({
        ...getParsedDefaultData(),
        ...removeUndefined(rest),
      }),
    });
  });

  const deafultValue = {
    ...getDefaultValue(),
    ...getParsedDefaultData(),
  };

  return {
    deafultValue,
    type: typeValue,
    form,
    handleSubmit,
  };
}
