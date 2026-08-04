import { CustomSelectOption } from "@/app/components/forms/custom-select";

export function createRatingOptions(
  t: (key: string) => string,
): CustomSelectOption[] {
  return [
    { value: "", label: t("chooseRating") },
    { value: "10", label: t("rating10") },
    { value: "9", label: t("rating9") },
    { value: "8", label: t("rating8") },
    { value: "7", label: t("rating7") },
    { value: "6", label: t("rating6") },
    { value: "5", label: t("rating5") },
    { value: "4", label: t("rating4") },
    { value: "3", label: t("rating3") },
    { value: "2", label: t("rating2") },
    { value: "1", label: t("rating1") },
  ];
}
