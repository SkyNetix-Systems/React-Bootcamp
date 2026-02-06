//Rus
// 01. Настройте router согласно этой структуре
// src/
// ├── components/
// │   ├── Header.jsx            // Навигационное меню с Link/NavLink
// │   ├── Footer.jsx            // Футер страницы
// ├── pages/
// │   ├── HomePage.jsx          // Главная страница
// │   ├── AboutPage.jsx         // Статическая страница "О нас"
// │   ├── ProductsPage.jsx      // Страница со списком продуктов
// │   ├── ProductDetails.jsx    // Страница с подробной информацией о продукте
// │   ├── SearchPage.jsx        // Страница поиска с использованием query string
// │   ├── LoginPage.jsx         // Пример редиректа при логине
// │   └── NotFoundPage.jsx      // Страница 404
// ├── App.jsx                   // Корневой компонент с <Router> и маршрутизацией

// 02. Создайте ссылки на страницы в компоненте Header и разместите его на всех страницах любым удобным способом.
// 03. Настройте путь на страницу ProductDetails динамически. Отобразите на странице параметр из пути текущей страницы.
// 04. Посмотрите задание по query string в компоненте searchPage.jsx.
// 05. В компоненте LoginPage настройте кнопку "Log in" с использованием <Link></Link>, чтобы она перенаправляла пользователя на главную страницу и передавала объект state {login: "You are logged in"}.
// 06. В компоненте LoginPage программно настройте кнопку "Forgot login", чтобы она перенаправляла пользователя на главную страницу и передавала объект state {login: "You are not logged in"}.
// 07. На главной странице отобразите значение state login внутри тега <p></p>.
// 08. Настройте редирект со всех несуществующих страниц на главную страницу.

//Eng
/*
//Eng
// 01. Set up the router according to this structure:
// src/
// ├── components/
// │   ├── Header.jsx            // Navigation menu with Link/NavLink
// │   ├── Footer.jsx            // Footer of the page
// ├── pages/
// │   ├── HomePage.jsx          // Main page
// │   ├── AboutPage.jsx         // Static "About Us" page
// │   ├── ProductsPage.jsx      // Page with a list of products
// │   ├── ProductDetails.jsx    // Page with detailed product information
// │   ├── SearchPage.jsx        // Search page with query string usage
// │   ├── LoginPage.jsx         // Example of redirect on login
// │   └── NotFoundPage.jsx      // 404 error page
// ├── App.jsx                   // Root component with <Router> and routing
// ├── data/
//     └── products.jsx          // Mock data for products

// 02. Create links to the pages in the Header component and place it on all pages in any convenient way.
// 03. Set up the path to the ProductDetails page dynamically. Display the parameter from the path on the current page.
// 04. Refer to the query string task in the searchPage.jsx component.
// 05. In the LoginPage component, configure the "Log in" button using <Link></Link> to redirect the user to the main page and pass a state object {login: "You are logged in"}.
// 06. In the LoginPage component, programmatically configure the "Forgot login" button to redirect the user to the main page and pass a state object {login: "You are not logged in"}.
// 07. On the main page, display the value of the login state inside a <p></p> tag.
// 08. Set up a redirect from all non-existent pages to the main page.
*/

function App() {
  return <div></div>;
}

export default App;
