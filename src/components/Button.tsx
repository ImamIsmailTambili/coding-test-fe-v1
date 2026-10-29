export function Button({ className = "", ...rest }) {
  return (
    <button
      className={`rounded-lg px-4 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...rest}
    />
  );
}
