import { useId } from "react";
import { useCreateBlock } from "../../model/use-create-block";
import { CreateForm } from "./create-form";
import { Modal } from "../../ui/modal";
import { UiButton } from "../../../../shared/ui/button";

export function CreateBlockModal({ processId, onSuccess }: { processId: string; onSuccess?: () => void }) {
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
          processId={processId}
          onSuccess={onSuccess}
        />
      }
      footer={<UiButton form={formId}>Save</UiButton>}
    />
  );
}
