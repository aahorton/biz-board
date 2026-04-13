import { BlockTypes } from "../../../model/types";
import { FormData } from "../../../view-model/use-create-form";
import styles from "./styles.module.css";

export function Layout({
  formData,
  onNameChange,
  onTypeChange,
}: {
  formData: FormData;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <select
        className={styles.input}
        name="type"
        required
        value={formData.type}
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
