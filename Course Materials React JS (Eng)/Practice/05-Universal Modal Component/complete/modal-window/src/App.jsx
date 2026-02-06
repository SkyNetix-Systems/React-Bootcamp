import { useState } from "react";
import "./index.css";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Button from "./components/Button";

//Rus
// 1. Создайте отдельные компоненты:
//    - Button: универсальный компонент кнопки.
//    - Modal: универсальный компонент модального окна.
//    - Main: компонент, представляющий основное содержимое приложения.

// 2. Разместите файлы компонентов:
//    - Поместите компоненты Button, Modal и Main в отдельные файлы внутри папки src/components.

// 3. Экспортируйте и импортируйте компоненты:
//    - Экспортируйте Button, Modal и Main из их файлов.
//    - Импортируйте эти компоненты в тех местах, где они используются.

// 4. Создайте универсальный компонент Button:
//    - Настройте компонент так, чтобы он:
//      - Принимал проп `children` для отображения текста внутри кнопки.
//      - Принимал проп для изменения CSS-класса кнопки:
//          - Например, класс "button" для одной стилизации и "closeButton" для другой.
//      - Позволял добавлять разные функции в `onClick` (например, для закрытия модального окна).

// 5. Создайте универсальный компонент Modal:
//    - Настройте модальное окно с помощью следующих пропсов:
//      - `title`: текст заголовка окна.
//      - `content`: содержимое окна (текст или компоненты).
//      - `showCloseButton`: флаг, который управляет отображением кнопки закрытия.

// 6. Создайте функцию в App:
//    - Напишите функцию в компоненте App, которую можно передавать через пропсы в компонент Button.
//    - Эта функция будет выполнять какое-либо действие, например, открывать или закрывать модальное окно.

// 7. Избавьтесь от "prop drilling":
//    - Используйте технику component composition, чтобы передавать данные и функции напрямую между компонентами.
//    - Это поможет избежать передачи пропсов через промежуточный компонент Main.

///////////////////
//Eng
/*

// 1. Create separate components:
//    - Button: a universal button component.
//    - Modal: a universal modal window component.
//    - Main: a component representing the main content of the application.

// 2. Organize component files:
//    - Place the Button, Modal, and Main components in separate files inside the src/components folder.

// 3. Export and import components:
//    - Export Button, Modal, and Main from their respective files.
//    - Import these components wherever they are needed in the application.

// 4. Create a universal Button component:
//    - Configure the Button component to:
//      - Accept a `children` prop to display text inside the button.
//      - Accept a prop to modify the button's CSS class:
//          - For example, the "button" class for one style and the "closeButton" class for another.
//      - Allow passing different functions to the `onClick` prop (e.g., to close the modal window).

// 5. Create a universal Modal component:
//    - Configure the modal window with the following props:
//      - `title`: the text for the modal's title.
//      - `content`: the content of the modal (text or components).
//      - `showCloseButton`: a flag that determines whether the close button is displayed.

// 6. Create a function in the App component:
//    - Write a function in the App component that can be passed as a prop to the Button component.
//    - This function will perform specific actions, such as opening or closing the modal window.

// 7. Eliminate "prop drilling":
//    - Use the component composition technique to pass data and functions directly between components.
//    - This approach avoids passing props through intermediate components like Main.
*/

function App() {
  // Define a state variable isModalOpen to manage the open/closed state of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal by setting isModalOpen to true
  function openModal() {
    setIsModalOpen(true);
  }

  // Function to close the modal by setting isModalOpen to false
  function closeModal() {
    setIsModalOpen(false);
  }

  // Function to display an alert message and then close the modal
  function alertCloseModal() {
    alert("OK"); // Show a confirmation message
    setIsModalOpen(false); // Close the modal
  }

  return (
    <div className="app">
      {/* Pass the modal state and its controlling functions to the Main component */}
      <Main
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={closeModal}
        alertCloseModal={alertCloseModal}
        openModal={openModal}
      >
        {/* Render the Modal component with props for its title, content, and control functions */}
        <Modal
          title="Confirm Your Action" // Modal title
          content="Are you sure you want to proceed? This action cannot be undone." // Modal content
          showButton // Show the close button inside the modal
          closeModal={closeModal} // Function to close the modal
          alertCloseModal={alertCloseModal} // Function to alert and close the modal
        >
          {/* Button to close the modal */}
          <Button handleClick={closeModal} variant={"closeButton"}>
            &times;
          </Button>

          {/* Button to cancel and close the modal */}
          <Button handleClick={closeModal} variant={"secondaryButton"}>
            Cancel
          </Button>

          {/* Button to confirm, alert, and close the modal */}
          <Button handleClick={alertCloseModal} variant={"primaryButton"}>
            Yes, Continue
          </Button>
        </Modal>
      </Main>
    </div>
  );
}

export default App;
