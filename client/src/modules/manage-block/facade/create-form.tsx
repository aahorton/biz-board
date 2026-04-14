import { useCreateBlock } from "../model/use-create-block";
import { DefaultFileds } from "../ui/fields/default-fields";
import { WebhookFields } from "../ui/fields/webhook-fields";
import { FormRoot } from "../ui/form-root";
import { useCreateForm } from "../view-model/use-create-form";

export function CreateForm({
  onSuccess,
  processId,
  formId,
}: {
  formId: string;
  processId: string;
  onSuccess?: () => void;
}) {
  const createBlock = useCreateBlock();

  const createForm = useCreateForm((data) =>
    createBlock.submitCreate({ processId, ...data }).then(onSuccess)
  );

  return (
    <FormRoot formId={formId} onSubmit={createForm.handleSubmit}>
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
    </FormRoot>
  );
}
