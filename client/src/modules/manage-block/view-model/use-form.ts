import { useState } from "react";
import { BlockTypes } from "../model/types";

export type FormData = {
  name: string;
  type: string;
  data: string;
};

export type WebhookFormData = {
  url: string;
  method: string;
};

const defaultFormData: FormData = {
  name: "Start",
  type: BlockTypes.Start,
  data: "{}",
};

export function useForm(
  onSubmit: (data: FormData) => void,
  defaultFeilds: FormData = defaultFormData
) {
  const [partialFormData, setFormData] = useState<Partial<FormData>>({});
  const formData = { ...defaultFeilds, ...partialFormData };

  const webhookFormData: WebhookFormData =
    formData.type === "webhook" ? JSON.parse(formData.data) : undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const type = e.currentTarget.value;
    setFormData({ ...formData, type, data: "{}", name: type });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleDataChange = (e: string) => {
    setFormData({ ...formData, data: e });
  };

  const handleChangeWebhookFormData = (e: WebhookFormData) => {
    setFormData({ ...formData, data: JSON.stringify(e) });
  };

  return {
    formData,
    handleTypeChange,
    handleSubmit,
    handleNameChange,
    handleDataChange,
    webhookFormData,
    handleChangeWebhookFormData,
  };
}
