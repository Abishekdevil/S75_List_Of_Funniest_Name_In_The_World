import React from "react";
import "./styles/App.css"; 
import FunnyNameCard from "./components/FunnyNameCard"; 

const App = () => {
  const funnyNames = [
    { name: "Anita Bath", description: "Sounds like 'I need a bath' 😂" },
    { name: "Brock Lee", description: "Healthy and hilarious 🥦" },
    { name: "Sue Yu", description: "A perfect lawyer's name! ⚖️" },
    { name: "Barb Dwyer", description: "Ouch, that must hurt! 🏴‍☠️" }
  ];

  return (
    <div className="app-container">
      <h1 className="app-title">😂 Funniest Names in the World</h1>
      <p className="app-description">
        A collection of the most hilarious, weird, and unbelievable names from around the world!
      </p>


      <div className="funny-names-list">
        {funnyNames.map((item, index) => (
          <FunnyNameCard key={index} name={item.name} description={item.description} />
        ))}
      </div>

      <button className="see-more-button" onClick={() => alert("More funny names coming soon! 😂")}>
        See More Funny Names 🤣
      </button>
    </div>
  );
};

export default App;
