import { FormProvider } from "react-hook-form";
import { useCreateBlock } from "../../model/use-create-block";
import { DefaultFileds } from "../../ui/default-fields";
import { FormRoot } from "../../ui/form-root";
import { useFormBlockTypes } from "../../model/use-form-block-types";
import { useManageBlockForm } from "../../view-model/use-form";
import { FormBuilderFields } from "../../../../shared/form-builder";

export function CreateForm({
  onSuccess,
  processId,
  formId,
}: {
  formId: string;
  processId: string;
  onSuccess?: () => void;
}) {
  const { types, typesOptions } = useFormBlockTypes();
  const createBlock = useCreateBlock();

  const createForm = useManageBlockForm({
    onSubmit: (data) =>
      createBlock.submitCreate({ processId, ...data }).then(onSuccess),
    blockTypes: types,
  });
  const config = types[createForm.type]?.template;

  return (
    <FormProvider {...createForm.form}>
      <FormRoot formId={formId} onSubmit={createForm.handleSubmit}>
        <DefaultFileds
          typeOptions={typesOptions}
          formData={createForm.deafultValue}
        />
        {config && (
          <FormBuilderFields
            config={config}
            defaultValue={createForm.deafultValue}
          />
        )}
      </FormRoot>
    </FormProvider>
  );
}
