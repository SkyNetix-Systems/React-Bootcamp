import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Thanks from "./pages/Thanks";
import { Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Category = lazy(() => import("./pages/Category"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "old-home", element: <Navigate to={"/"} /> },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "thanks", element: <Thanks /> },
      {
        path: "category/:categoryId",
        element: <Category />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      { path: "*", element: <NotFound /> },
      // { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Header />
//         <Home />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "about",
//     element: (
//       <>
//         <Header />
//         <About />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "cart",
//     element: (
//       <>
//         <Header /> <Cart />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "categories",
//     element: (
//       <>
//         <Header />
//         <Categories />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "product",
//     element: (
//       <>
//         <Header />
//         <ProductDetails />
//         <Footer />
//       </>
//     ),
//   },
//   {
//     path: "*",
//     element: (
//       <>
//         <Header />
//         <NotFound />
//         <Footer />
//       </>
//     ),
//   },
// ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
