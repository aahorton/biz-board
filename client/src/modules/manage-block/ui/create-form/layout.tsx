import { useCreateForm, FormData } from "../../view-model/use-create-form";
import { DefaultFileds } from "../fields/default-fields";
import { WebhookFields } from "../fields/webhook-fields";
import styles from "./styles.module.css";

export function Layout({
  onSubmit,
  formId,
}: {
  formId: string;
  onSubmit: (formData: FormData) => void;
}) {
  const createForm = useCreateForm(onSubmit);

  return (
    <form
      className={styles.root}
      onSubmit={createForm.handleSubmit}
      id={formId}
    >
      <DefaultFileds
        formData={createForm.formData}
        onTypeChange={createForm.handleTypeChange}
        onNameChange={createForm.handleNameChange}
      />
      {createForm.webhookFormData && (
        <WebhookFields
          formData={createForm.webhookFormData}
          onChangeFormData={createForm.handleChangeWebhookFormData}
        />
      )}
    </form>
  );
}
