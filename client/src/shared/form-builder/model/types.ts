export type FormFieldConfig = {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  [key: string]: unknown;
};

export type FormBuilderConfig = {
  fields: FormFieldConfig[];
};

export type FormValue = Record<string, unknown>;

export type FieldProps = {
  config: FormFieldConfig;
  defaultValue?: unknown;
};
