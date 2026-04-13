import { useId } from "react";
import { useCreateBlock } from "../model/use-create-block";
import { CreateForm } from "../ui/create-form";
import { Modal } from "../ui/modal";
import { SubmitButton } from "../ui/submit-button";

export function CreateBlockModal({
  processId,
  onSuccess,
}: {
  processId: string;
  onSuccess?: () => void;
}) {
  const formId = useId();

  const createBlock = useCreateBlock();

  if (!createBlock.createPosition) {
    return null;
  }

  return (
    <Modal
      onClose={createBlock.cancelCreate}
      title="Create block"
      body={
        <CreateForm
          formId={formId}
          onSubmit={(data) =>
            createBlock.submitCreate({ processId, ...data }).then(onSuccess)
          }
        />
      }
      footer={<SubmitButton formId={formId} />}
    />
  );
}
