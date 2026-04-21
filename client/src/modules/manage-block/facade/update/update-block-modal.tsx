import { useId } from "react";

import { Modal } from "../../ui/modal";
import { SubmitButton } from "../../ui/submit-button";
import { UpdateForm } from "./update-form";
import { useUpdateBlock } from "../../model/update-block";

export function UpdateBlockModal({
  processId,
  onSuccess,
}: {
  processId: string;
  onSuccess?: () => void;
}) {
  const formId = useId();

  const createBlock = useUpdateBlock();

  if (!createBlock.updateBlockId) {
    return null;
  }

  return (
    <Modal
      onClose={createBlock.cancelUpdate}
      title="Update block"
      body={
        <UpdateForm
          formId={formId}
          processId={processId}
          onSuccess={onSuccess}
        />
      }
      footer={<SubmitButton formId={formId} />}
    />
  );
}
