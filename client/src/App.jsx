import React from "react";

const App = () => {
  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        textAlign: "center", 
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f8f8",
        padding: "20px"
      }}
    >
  
      <h1 style={{ fontSize: "3rem", color: "#ff6600", marginBottom: "10px" }}>😂 Funniest Names in the World</h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "700px", marginBottom: "20px" }}>
        Ever heard a name so funny that you couldn't stop laughing?  
        Here's a collection of the most hilarious, weird, and unbelievable names from around the world!  
      </p>

     
      <div 
        style={{ 
          backgroundColor: "white", 
          padding: "20px", 
          borderRadius: "10px", 
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          marginBottom: "30px"
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "#333" }}>🤣 Sneak Peek:</h2>
        <ul style={{ textAlign: "left", fontSize: "1.2rem", listStyleType: "none", padding: 0 }}>
          
          <li>✅ Anita Bath</li>
          <li>✅ Brock Lee</li>
          <li>✅ Sue Yu</li>
          <li>✅ Barb Dwyer</li>
        </ul>
      </div>


      <button 
        style={{
          padding: "15px 30px",
          fontSize: "1.5rem",
          backgroundColor: "#ff6600",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
        }}
        onClick={() => alert("More funny names coming soon! 😂")}
      >
        See More Funny Names 🤣
      </button>
    </div>
  );
};

export default App;
