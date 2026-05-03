import { useController } from "react-hook-form";
import { FieldProps } from "../../model/types";
import { UiInput } from "../../../ui/input";
import { z } from "zod";
import { UiFormField } from "../../../ui/form-field";

const additionalFieldsSchema = z.object({
  default: z.string().optional(),
  min: z.string().optional(),
});

const defaultValueSchema = z.string().optional();

export function TextInputField(props: FieldProps) {
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
      <UiInput
        required={props.config.required}
        min={parced.min}
        {...value.field}
        value={value.field.value ?? defaultValue ?? parced.default}
      />
    </UiFormField>
  );
}
