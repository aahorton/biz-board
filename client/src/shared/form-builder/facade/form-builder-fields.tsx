import { FC } from "react";
import { DefaultField } from "./fields/default";
import { SelectField } from "./fields/select";
import { TextInputField } from "./fields/text-input";
import {
  FieldProps,
  FormBuilderConfig,
  FormFieldConfig,
  FormValue,
} from "../model/types";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../ui/error-fallback";

const fields: Record<string, FC<FieldProps>> = {
  input: TextInputField,
  select: SelectField,
};

export function FormBuilderFields({
  config,
  defaultValue,
}: {
  config: FormBuilderConfig;
  defaultValue?: FormValue;
}) {
  const renderFormField = (field: FormFieldConfig) => {
    const Field = fields[field.type] ?? DefaultField;
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Field
          config={field}
          defaultValue={defaultValue ? defaultValue[field.name] : undefined}
        />
      </ErrorBoundary>
    );
  };

  return <>{config.fields.map(renderFormField)}</>;
}
