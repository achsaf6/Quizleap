import React, { useState } from "react";

/**
 * Sidebar component for controlling quiz settings, such as difficulty.
 * Can be toggled open or closed, and includes a slider for setting difficulty.
 */
const Sidebar = ({ difficulty, setDifficulty }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open or closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div style={{ ...styles.sidebar, ...(isOpen ? {} : styles.closed) }}>
        {/* Sidebar content visible when open */}
        {isOpen && (
          <div style={styles.content}>
            <div style={styles.sliderGroup}>
              <label className="Label" style={styles.label}>
                Difficulty:
              </label>
              <input
                type="range"
                id="difficulty"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                style={styles.input}
              />
            </div>
          </div>
        )}
        {/* Button to close the sidebar */}
        {isOpen && (
          <button style={styles.toggleBtn} onClick={toggleSidebar}>
            Close
          </button>
        )}
      </div>

      {/* Tag to reopen the sidebar when closed */}
      {!isOpen && (
        <div style={styles.reopenTag} onClick={toggleSidebar}>
          Open
        </div>
      )}
    </div>
  );
};

// Styles for the Sidebar component
const styles = {
  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: "15em",
    backgroundColor: "#f4f4f4",
    borderRight: "1px solid #ddd",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(0)",
    overflowY: "auto",
    padding: "10px",
  },
  closed: {
    transform: "translateX(-100%)",
  },
  content: {
    marginTop: "50px",
  },
  sliderGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
  },
  reopenTag: {
    position: "fixed",
    left: 0,
    top: "10%",
    transform: "translateY(-50%)",
    padding: "10px 15px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Sidebar;
