//Rus
/*
  1.	Запустите JSON-сервер (инструкции указаны в видео и в файле links).
  2.	Создайте две отдельные функции fetch для запроса данных категорий и продуктов.
  3.	Удалите старую логику использования данных категорий и продуктов в магазине, заменив её на получение данных с помощью loader в параметрах маршрутизатора.
  4.	Создайте универсальный обработчик ошибок с помощью errorElement.
  5.	Получите данные с категориями и продуктами от API, используя хук useLoaderData(), и примените их на страницах Home и Category.
  6.	С помощью state передайте массив продуктов на страницу ProductDetails. Получите данные с помощью хука useLocation() и используйте их для фильтрации конкретного продукта по параметру URL.
*/

//Eng
{
  /*
  1.	Start the JSON server (Instructions are provided in the video and in the links file).
  2.	Create two separate fetch functions to retrieve data for categories and products.
  3.	Remove the old functionality for using category and product data in the store, and replace it with data retrieval using loader in the router parameters.
  4.	Create a universal error handler using errorElement.
  5.	Retrieve the data for categories and products from the API using the useLoaderData() hook and use it on the Home and Category pages.
  6.	Use state to pass the product array to the ProductDetails page. Retrieve the data using the useLocation() hook and filter it for the specific product based on the URL parameter.
  
*/
}

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Thanks from "./pages/Thanks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "old-home", element: <Navigate to={"/"} /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "thanks", element: <Thanks /> },
      { path: "category/:categoryId", element: <Category /> },
      { path: "product/:productId", element: <ProductDetails /> },
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
