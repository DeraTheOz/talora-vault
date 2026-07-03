import CustomSelect, { type CustomSelectOption } from "./custom-select";

const ratingOptions: CustomSelectOption[] = [
  {
    value: "",
    label: "Choose a rating",
  },
  {
    value: "10",
    label: "10 - Masterpiece",
  },
  {
    value: "8",
    label: "8 - Great",
  },
  {
    value: "6",
    label: "6 - Good",
  },
  {
    value: "4",
    label: "4 - Mixed",
  },
  {
    value: "2",
    label: "2 - Poor",
  },
];

interface ReviewFormProps {
  reviewPlaceholder?: string;
  submitLabel?: string;
}

export default function ReviewForm({
  reviewPlaceholder = "Share what stood out...",
  submitLabel = "Save review",
}: ReviewFormProps) {
  return (
    <section aria-labelledby="review-title">
      <h2 id="review-title" className="mb-4 text-2xl font-normal">
        Rate and Review
      </h2>

      <form className="rounded-lg bg-talora-semi-dark-blue p-4 md:p-6">
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-talora-white">
          Your rating
        </label>

        <CustomSelect
          id="rating"
          name="rating"
          options={ratingOptions}
          ariaLabel="Choose your rating"
        />

        <label
          htmlFor="review"
          className="mt-5 block text-sm font-medium text-talora-white">
          Leave a review
        </label>

        <textarea
          id="review"
          name="review"
          rows={5}
          placeholder={reviewPlaceholder}
          className="mt-2 w-full resize-none rounded-lg border border-talora-dark-blue bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none placeholder:text-talora-white/35 focus:border-talora-red"
        />

        <button
          type="button"
          className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white transition hover:bg-talora-red/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
