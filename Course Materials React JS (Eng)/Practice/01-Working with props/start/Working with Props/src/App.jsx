import React from "react";
import "./index.css";

//Rus
// 1 - Создать компонент <Card/>, который вложить в <CardContainer/>.
// 2 - Создать компоненты <CardTag/>, которые вложить в <Card/>
// 3 - Передать данные из объекта cardData в компонент <Card/> от компонента <CardContainer/> через пропсы вручную.
// 4 - Передать данные тегов из объекта cardData в компоненты <CardTag/> от компонента <Card/> через пропсы вручную.

//Eng
// 1 - Create a <Card/> component and nest it within <CardContainer/>.
// 2 - Create <CardTag/> components and nest them within <Card/>.
// 3 - Pass data from the cardData object to the <Card/> component from <CardContainer/> manually via props.
// 4 - Pass tag data from the cardData object to the <CardTag/> components from <Card/> manually via props.

const cardData = [
  {
    title: "Мокка",
    description: "Развиваем финтех-продукт для международного рынка",
    date: "24 апреля 2024",
    imageUrl: "/img-1.jpeg",
    tags: ["#финтех", "#международный", "#рынок"],
    archived: false,
  },
  {
    title: "Деньги Вперед",
    description: "Фронтенд и бэкенд для сервиса выплат зарплат по запросу",
    date: "16 января 2024",
    imageUrl: "/img-2.jpeg",
    tags: ["#финансы", "#сервис", "#выплаты"],
    archived: false,
  },
  {
    title: "ResolHR",
    description: "Помогли HR-tech-стартапу с кастомизацией для VIP-клиентов",
    date: "10 октября 2023",
    imageUrl: "/img-3.jpeg",
    tags: ["#HR", "#кастомизация", "#VIP"],
    archived: true,
  },
  {
    title: "ActivePlatform",
    description: "Интеграция Adobe и развитие платформы комплексной подписки",
    date: "10 ноября 2022",
    imageUrl: "/img-4.jpeg",
    tags: ["#интеграция", "#платформа", "#подписка"],
    archived: false,
  },
  {
    title: "START",
    description: "Разработали платформу A/B тестов для стримингового сервиса",
    date: "22 сентября 2022",
    imageUrl: "/img-5.jpeg",
    tags: ["#A/B тесты", "#стриминг", "#платформа"],
    archived: false,
  },
  {
    title: "Mindbox",
    description: "Поддерживаем редизайн платформы автоматизированного маркетинга",
    date: "21 сентября 2022",
    imageUrl: "/img-6.jpeg",
    tags: ["#маркетинг", "#редизайн", "#автоматизация"],
    archived: false,
  },
];

export default function CardContainer() {
  return <div className="card-container"></div>;
}
