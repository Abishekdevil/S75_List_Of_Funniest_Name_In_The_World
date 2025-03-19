import React, { useState, useEffect } from "react";
import "./styles/App.css"; 
import FunnyNameCard from "./components/FunnyNameCard"; 

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showForm, setShowForm] = useState(false); 

  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      console.log("Fetched items:", data); 
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  
  useEffect(() => {
    fetchItems();
    console.log("Current state of items:", items);
  }, []);
  


  const addItem = async () => {
    if (!newItem.trim() || !newDescription.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem, description: newDescription }),
      });

      if (response.ok) {
        setNewItem("");
        setNewDescription("");
        setShowForm(false); 
        fetchItems();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">😂 Funniest Names in the World</h1>
      <p className="app-description">
        A collection of the most hilarious, weird, and unbelievable names from around the world!
      </p>

   
      <button className="add-item-button" onClick={() => setShowForm(true)}>➕ Add Funny Name</button>

      
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a Funny Name</h2>
            <input
              type="text"
              placeholder="Enter a funny name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            /><br></br><br></br>
            <input
              type="text"
              placeholder="Enter a funny description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            /><br></br><br></br>
            <button onClick={addItem}>Submit</button>
            <button className="close-button" onClick={() => setShowForm(false)}>❌ Close</button>
          </div>
        </div>
      )};

      
      <div className="card-container">
        {items.length > 0 ? (
          items.map((item) => (
            <FunnyNameCard key={item._id} name={item.name} description={item.description} />

          ))
        ) : (
          <p>No funny names found! Add one to get started. 🎉</p>
        )}
      </div>
    </div>
  );
};

export default App;
