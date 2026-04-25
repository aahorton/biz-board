import { UiInput } from "../../../../../shared/ui/input";
import { UiSelect } from "../../../../../shared/ui/select";
import { WebhookFormData } from "../../../view-model/use-form";

export function Layout({
  formData,
  onChangeFormData,
}: {
  formData: WebhookFormData;
  onChangeFormData: (data: WebhookFormData) => void;
}) {
  return (
    <>
      <UiInput
        name="url"
        type="text"
        value={formData.url}
        onChange={(value) => onChangeFormData({ ...formData, url: value })}
      />

      <UiSelect
        name="method"
        value={formData.method}
        onChange={(value) => onChangeFormData({ ...formData, method: value })}
        options={[
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
        ]}
      />
    </>
  );
}
