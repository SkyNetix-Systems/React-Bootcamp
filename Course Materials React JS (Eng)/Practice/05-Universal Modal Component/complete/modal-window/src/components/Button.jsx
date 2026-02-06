export default function Button({ children, variant, handleClick }) {
  return (
    <button className={variant} onClick={handleClick}>
      {children}
    </button>
  );
}
