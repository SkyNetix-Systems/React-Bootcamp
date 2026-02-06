import "./index.css";

//Rus
// 1 - Создайте состояние isOpen для управления открытием и закрытием приложения. Интерфейс скрывается при нажатии на крестик и отображается при нажатии на кнопку "Начать".
// 2 - Реализуйте функционал отображения карточек в зависимости от активного таба. Переключать табы можно как нажатием на кнопки "Prev" и "Next", так и нажатием на сам таб.

//Eng
// 1 - Create a state variable, isOpen, to control opening and closing the app. The interface is hidden when the close icon is clicked and shown when the Start button is pressed.
// 2 - Implement functionality to display cards based on the currently active tab. Tabs can be switched either by clicking the Prev and Next buttons or by clicking directly on the tab itself.

// Card data with details for each card
const cardData = [
  {
    title: "Mocha",
    description: "Developing a fintech product for the international market",
    date: "April 24, 2024",
    imageUrl: "/img-1.jpeg",
    tags: ["#fintech", "#international", "#market"],
    archived: false,
  },
  {
    title: "Money Forward",
    description: "Frontend and backend for a salary payout service on demand",
    date: "January 16, 2024",
    imageUrl: "/img-2.jpeg",
    tags: ["#finance", "#service", "#payouts"],
    archived: false,
  },
  {
    title: "ActivePlatform",
    description: "Adobe integration and platform development for comprehensive subscriptions",
    date: "November 10, 2022",
    imageUrl: "/img-4.jpeg",
    tags: ["#integration", "#platform", "#subscription"],
    archived: false,
  },
  {
    title: "START",
    description: "Developed an A/B testing platform for a streaming service",
    date: "September 22, 2022",
    imageUrl: "/img-5.jpeg",
    tags: ["#A/B testing", "#streaming", "#platform"],
    archived: false,
  },
  {
    title: "Mindbox",
    description: "Supporting the redesign of an automated marketing platform",
    date: "September 21, 2022",
    imageUrl: "/img-6.jpeg",
    tags: ["#marketing", "#redesign", "#automation"],
    archived: false,
  },
];

// Grouping cards into three tabs
const tabData = [
  [cardData[0], cardData[1]], // Tab 1
  [cardData[2], cardData[3]], // Tab 2
  [cardData[4]], // Tab 3
];

export default function App() {
  return (
    <>
      {/*<button >Start</button>*/}

      <div className="app">
        <span className="close">&times;</span>
        <h1>State Tabs Card Display</h1>

        <div className="tab-buttons">
          <button className="tab-button  active">Tab 1</button>
          <button className="tab-button">Tab 2</button>
          <button className="tab-button">Tab 3</button>
        </div>

        <CardContainer cards={tabData[0]} />

        <div className="navigation-buttons">
          <button>&lt; Previous</button>
          <button>Next &gt;</button>
        </div>

        <Footer />
      </div>
    </>
  );
}

// Container component to display the cards for the active tab
function CardContainer({ cards }) {
  return (
    <div className="card-container">
      <Card cardObj={cards[0]} />
      {cards[1] && <Card cardObj={cards[1]} />}
    </div>
  );
}

// Component to render individual card information
function Card({ cardObj }) {
  return (
    <div className="card">
      <img className="card-image" src={cardObj.imageUrl} alt={cardObj.title} />
      <div className="card-content">
        <h2 className="card-title">{cardObj.title}</h2>
        <p className="card-description">{cardObj.description}</p>
        <p className="card-date">{cardObj.date}</p>

        {/* Tags section */}
        <div className="card-tags">
          <CardTag tag={cardObj.tags[0]} />
          {cardObj.tags[1] && <CardTag tag={cardObj.tags[1]} />}
          {cardObj.tags[2] && <CardTag tag={cardObj.tags[2]} />}
        </div>
      </div>
    </div>
  );
}

// Component to render individual tag
function CardTag({ tag }) {
  return <span className="card-tag">{tag}</span>;
}

// Footer component listing the technologies used in the project
function Footer() {
  return (
    <footer className="footer">
      <p>
        <strong>Technologies used:</strong> React, JSX, useState, Conditional Rendering, CSS
        Modules, Event Handling.
      </p>
    </footer>
  );
}
