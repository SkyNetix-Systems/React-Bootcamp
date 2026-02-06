import React from "react";
import "./index.css";

// Array of product data with details about each product in the store
const productData = [
  {
    name: "Laptop Pro",
    description: "High-performance laptop for professionals.",
    price: 1200,
    photoName: "/laptop.png",
    soldOut: false,
  },
  {
    name: "Smartphone X",
    description: "Latest model with stunning display.",
    price: 800,
    photoName: "/smartphone.png",
    soldOut: false,
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling headphones with great sound quality.",
    price: 200,
    photoName: "/headphones.png",
    soldOut: false,
  },
  {
    name: "Smartwatch Z",
    description: "Stylish smartwatch with fitness tracking features.",
    price: 150,
    photoName: "/smartwatch.png",
    soldOut: false,
  },
  {
    name: "Gaming Console",
    description: "Powerful gaming console for endless fun.",
    price: 400,
    photoName: "/console.png",
    soldOut: true,
  },
  {
    name: "4K TV",
    description: "Ultra HD television with vibrant colors.",
    price: 1000,
    photoName: "/tv.png",
    soldOut: false,
  },
];

// Main App component that renders the Header, Catalog, and Footer components
export default function App() {
  return (
    <>
      <Header />
      <Catalog />
      <Footer />
    </>
  );
}

// Header component that displays the store name, navigation, and working hours
export function Header() {
  const hour = new Date().getHours(); // Get the current hour
  const openHours = 9; // Store opening hour
  const closeHours = 21; // Store closing hour

  // Determine if the store is currently open
  const isOpen = hour >= openHours && hour <= closeHours;

  return (
    <header className="header">
      <h1>Electronik Store</h1>
      {/* Navigation menu */}
      <nav className="nav">
        <ul>
          <li>
            Home
            <a href="#home"></a>
          </li>
          <li>
            Catalog
            <a href="#catalog"></a>
          </li>
          <li>
            About Us
            <a href="#about"></a>
          </li>
          <li>
            Contacts
            <a href="#contacts"></a>
          </li>
        </ul>
      </nav>
      {/* Display opening hours message based on whether the store is open or closed */}
      <div className="working-hours">
        {isOpen ? (
          <p>
            We are currently open. Hours: {openHours}:00 - {closeHours}:00
          </p>
        ) : (
          <p>
            We are closed. Open from {openHours}:00 - {closeHours}:00
          </p>
        )}
      </div>
    </header>
  );
}

// Catalog component that displays a list of products
function Catalog() {
  return (
    <main className="catalog">
      <ul className="products">
        {/* Map through product data to render each product as a Product component */}
        {productData.map((item) => (
          <Product productOjb={item} key={item.name} />
        ))}
      </ul>
    </main>
  );
}

// Product component that displays individual product details
function Product({ productOjb }) {
  return (
    <li className={`product ${productOjb.soldOut ? "sold-out" : ""}`}>
      <img src={productOjb.photoName} alt={productOjb.name} />
      <div>
        <h3>{productOjb.name}</h3>
        <p>{productOjb.description}</p>
        {/* Display "SOLD-OUT" if the product is sold out, otherwise show the price */}
        <span>{productOjb.soldOut ? "SOLD-OUT" : productOjb.price}</span>
      </div>
    </li>
  );
}

// Footer component, currently just displaying "Footer" text
function Footer() {
  return <footer className="footer">Footer</footer>;
}
