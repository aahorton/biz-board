import { useController } from "react-hook-form";
import { FieldProps } from "../../model/types";
import { z } from "zod";
import { UiFormField } from "../../../ui/form-field";
import { UiSelect } from "../../../ui/select";

const additionalFieldsSchema = z.object({
  default: z.string().optional(),
  options: z.array(z.object({ value: z.string(), label: z.string() })),
});

const defaultValueSchema = z.string().optional();

export function SelectField(props: FieldProps) {
  const parced = additionalFieldsSchema.parse(props.config);
  const defaultValue = defaultValueSchema.parse(props.defaultValue);

  const value = useController({
    name: props.config.name,
  });

  return (
    <UiFormField
      label={props.config.label}
      message={value.fieldState.error?.message}
    >
      <UiSelect
        required={props.config.required}
        options={parced.options.concat([{ value: "", label: "" }])}
        {...value.field}
        value={value.field.value ?? defaultValue ?? parced.default ?? ""}
      />
    </UiFormField>
  );
}
