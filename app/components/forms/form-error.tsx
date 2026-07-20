interface FormErrorProps {
  errorMessage?: string;
}

export default function FormError({ errorMessage }: FormErrorProps) {
  return <p className="text-sm text-talora-red">{errorMessage}</p>;
}
