import { BlockTypes } from "../../../model/types";
import { FormData } from "../../../view-model/use-form";
import styles from "./styles.module.css";

export function Layout({
  formData,
  onNameChange,
  onTypeChange,
  isNameDisabled,
  isTypeDisabled,
}: {
  formData: FormData;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isNameDisabled?: boolean;
  isTypeDisabled?: boolean;
}) {
  return (
    <>
      <select
        className={styles.input}
        name="type"
        required
        value={formData.type}
        disabled={isTypeDisabled}
        onChange={onTypeChange}
      >
        {Object.values(BlockTypes).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        className={styles.input}
        disabled={isNameDisabled}
        name="name"
        type="text"
        placeholder="block name"
        required
        value={formData.name}
        onChange={onNameChange}
      />
    </>
  );
}
