import { useUpdateBlock, useUpdateBlockData } from "../../model/update-block";
import { DefaultFileds } from "../../ui/fields/default-fields";
import { WebhookFields } from "../../ui/fields/webhook-fields";
import { FormRoot } from "../../ui/form-root";
import { useForm } from "../../view-model/use-form";

export function UpdateForm({
  onSuccess,
  processId,
  formId,
}: {
  formId: string;
  processId: string;
  onSuccess?: () => void;
}) {
  const createBlock = useUpdateBlock();
  const updateBlockData = useUpdateBlockData();

  const updateForm = useForm(
    (data) => createBlock.submitUpdate({ processId, ...data }).then(onSuccess),
    updateBlockData.data
  );

  return (
    <FormRoot formId={formId} onSubmit={updateForm.handleSubmit}>
      <DefaultFileds
        formData={updateForm.formData}
        onTypeChange={updateForm.handleTypeChange}
        onNameChange={updateForm.handleNameChange}
        isTypeDisabled
        isNameDisabled={updateBlockData.isLoading}
      />
      {updateForm.webhookFormData && (
        <WebhookFields
          formData={updateForm.webhookFormData}
          onChangeFormData={updateForm.handleChangeWebhookFormData}
        />
      )}
    </FormRoot>
  );
}
