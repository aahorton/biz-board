import { useController } from "react-hook-form";
import { FormData } from "../../view-model/use-form";
import styles from "./styles.module.css";
import { Option, UiSelect } from "../../../../shared/ui/select";
import { UiFormField } from "../../../../shared/ui/form-field";
import { UiInput } from "../../../../shared/ui/input";

export function Layout({
  formData,
  isNameDisabled,
  typeOptions,
  isTypeDisabled,
}: {
  formData: FormData;
  isNameDisabled?: boolean;
  isTypeDisabled?: boolean;
  typeOptions: Option[];
}) {
  const typeController = useController({
    name: "type",
  });
  const nameController = useController({
    name: "name",
  });

  return (
    <>
      <UiFormField label="Type">
        <UiSelect
          className={styles.input}
          required
          disabled={isTypeDisabled}
          options={typeOptions}
          {...typeController.field}
          value={typeController.field.value ?? formData.type}
        />
      </UiFormField>
      <UiFormField label="Name">
        <UiInput
          className={styles.input}
          disabled={isNameDisabled}
          type="text"
          placeholder="block name"
          required
          {...nameController.field}
          value={nameController.field.value ?? formData.name}
        />
      </UiFormField>
    </>
  );
}
