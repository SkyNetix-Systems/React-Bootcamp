export default async function fetchProductLoader() {
  const res = await fetch("http://localhost:9000/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
