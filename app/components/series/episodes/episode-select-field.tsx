import type { CustomSelectOption } from "@/app/components/forms/custom-select";
import CustomSelect from "@/app/components/forms/custom-select";

interface EpisodeSelectFieldProps {
  id: string;
  name: string;
  label: string;
  options: CustomSelectOption[];
  defaultValue?: string;
}

export default function EpisodeSelectField({
  id,
  name,
  label,
  options,
  defaultValue,
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
        defaultValue={defaultValue}
        ariaLabel={label}
      />
    </div>
  );
}
