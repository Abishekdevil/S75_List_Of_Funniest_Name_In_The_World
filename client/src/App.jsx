import React, { useState, useEffect } from "react";
import "./styles/App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // For filtering and form
  const [createdByValues, setCreatedByValues] = useState([]); // All creators
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      setItems(data);

      // Extract unique 'created_by' values
      const creators = [...new Set(data.map((item) => item.created_by))];
      setCreatedByValues(creators);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    if (!newItem.trim() || !newDescription.trim() || !selectedUser.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItem,
          description: newDescription,
          created_by: selectedUser,
        }),
      });

      if (response.ok) {
        setNewItem("");
        setNewDescription("");
        setSelectedUser("");
        setShowForm(false);
        fetchItems();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async () => {
    if (!newItem.trim() || !newDescription.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/items/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItem,
          description: newDescription,
          created_by: selectedUser,
        }),
      });

      if (response.ok) {
        setNewItem("");
        setNewDescription("");
        setSelectedUser("");
        setEditingItem(null);
        setShowForm(false);
        fetchItems();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem(item.name);
    setNewDescription(item.description);
    setSelectedUser(item.created_by);
    setShowForm(true);
  };

  const filteredItems = items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const userMatch = selectedUser ? item.created_by === selectedUser : true;
    return nameMatch && userMatch;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">😂 Funniest Names in the World</h1>
      <p className="app-description">
        A collection of the most hilarious, weird, and unbelievable names from around the world!
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search funny names..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="dropdown-container">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="user-dropdown"
        >
          <option value="">-- Show All Creators --</option>
          {createdByValues.map((creator) => (
            <option key={creator} value={creator}>{creator}</option>
          ))}
        </select>
      </div>

      <button
        className="add-item-button"
        onClick={() => {
          setShowForm(true);
          setEditingItem(null);
          setNewItem("");
          setNewDescription("");
          setSelectedUser("");
        }}
      >
        ➕ Add Funny Name
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingItem ? "Edit Funny Name" : "Add a Funny Name"}</h2>
            <input
              type="text"
              placeholder="Enter a funny name"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            /><br /><br />
            <input
              type="text"
              placeholder="Enter a funny description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            /><br /><br />
            <input
              type="text"
              placeholder="Your name (creator)"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            /><br /><br />
            <button onClick={editingItem ? updateItem : addItem}>
              {editingItem ? "Update" : "Submit"}
            </button>
            <button className="close-button" onClick={() => setShowForm(false)}>❌ Close</button>
          </div>
        </div>
      )}

      <div className="card-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>By:</strong> {item.created_by}</p>
              <button onClick={() => startEditing(item)}>✏️ Edit</button>
              <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
            </div>
          ))
        ) : (
          <p>No funny names found! Add one to get started. 🎉</p>
        )}
      </div>
    </div>
  );
};

export default App;
