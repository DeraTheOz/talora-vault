import type { CustomSelectOption } from "@/app/components/forms/custom-select";
import CustomSelect from "@/app/components/forms/custom-select";

interface EpisodeSelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: CustomSelectOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export default function EpisodeSelectField({
  id,
  name,
  label,
  options,
  value,
  defaultValue,
  disabled,
  onChange,
}: EpisodeSelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-talora-white">
        {label}
      </label>

      <CustomSelect
        id={id}
        name={name}
        options={options}
        value={value}
        defaultValue={defaultValue}
        ariaLabel={label}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
