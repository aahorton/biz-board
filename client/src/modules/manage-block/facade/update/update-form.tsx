import { FormBuilderFields } from "../../../../shared/form-builder";
import { useUpdateBlock, useUpdateBlockData } from "../../model/update-block";
import { DefaultFileds } from "../../ui/default-fields";
import { FormRoot } from "../../ui/form-root";
import { useFormBlockTypes } from "../../model/use-form-block-types";
import { useManageBlockForm } from "../../view-model/use-form";
import { FormProvider } from "react-hook-form";

export function UpdateForm({
  onSuccess,
  processId,
  formId,
}: {
  formId: string;
  processId: string;
  onSuccess?: () => void;
}) {
  const { types, typesOptions } = useFormBlockTypes();
  const createBlock = useUpdateBlock();
  const updateBlockData = useUpdateBlockData();

  const updateForm = useManageBlockForm({
    onSubmit: (data) =>
      createBlock.submitUpdate({ processId, ...data }).then(onSuccess),
    blockTypes: types,
    defaultFields: updateBlockData.data,
  });
  const config = types[updateForm.type]?.template;

  return (
    <FormProvider {...updateForm.form}>
      <FormRoot formId={formId} onSubmit={updateForm.handleSubmit}>
        <DefaultFileds
          typeOptions={typesOptions}
          formData={updateForm.deafultValue}
          isTypeDisabled
          isNameDisabled={updateBlockData.isLoading}
        />
        {config && (
          <FormBuilderFields
            config={config}
            defaultValue={updateForm.deafultValue}
          />
        )}
      </FormRoot>
    </FormProvider>
  );
}
