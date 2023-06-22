import React, { useState } from "react";
import "./app.css";
import Component from "./Component";
const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const addMoveable = async () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];
    getRandomPhoto();
    const { url } = await getRandomPhoto();
    
    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 25,
        photo: url,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true
      },
    ]);
  };

  const handleSelectedComponent = (ref) => {
    //remove border from previously selected component
    if (selectedComponent) {
      selectedComponent.style.outline = "none";
    }
    //add border to selected component
    ref.style.outline = "0.15em solid white";
    ref.style.outlineOffset = "-2px";
    
    setSelectedComponent(ref);
    
  };
  

  // get random photo from jsonplaceholder
  const getRandomPhoto = async () => {
    const randomNumber = Math.floor(Math.random() * 3000);
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${randomNumber}`);
    const json = await response.json();
    return json;
  }

  const removeSelectedMoveable = () => {
    // Remove the selected moveable component from the array

    const updatedMoveables = moveableComponents.filter(
      (moveable) => moveable.id !== parseInt(selectedComponent.id)
      );
    console.log("updatedMoveables", updatedMoveables)
    setMoveableComponents(updatedMoveables);
    setSelectedComponent(null);

  };
  
  // const updateMoveable = (id, newComponent, updateEnd = false) => {
  //   const updatedMoveables = moveableComponents.map((moveable, i) => {
  //     if (moveable.id === id) {
  //       return { id, ...newComponent, updateEnd };
  //     }
  //     return moveable;
  //   });
  //   setMoveableComponents(updatedMoveables);
  // };

  // const handleResizeStart = (index, e) => {
  //   console.log("e", e.direction);
  //   // Check if the resize is coming from the left handle
  //   const [handlePosX, handlePosY] = e.direction;
  //   // 0 => center
  //   // -1 => top or left
  //   // 1 => bottom or right

  //   // -1, -1
  //   // -1, 0
  //   // -1, 1
  //   if (handlePosX === -1) {
  //     console.log("width", moveableComponents, e);
  //     // Save the initial left and width values of the moveable component
  //     const initialLeft = e.left;
  //     const initialWidth = e.width;

  //     // Set up the onResize event handler to update the left value based on the change in width
  //   }
  // };


  return (
    <main style={{ height : "100vh", width: "100vw", backgroundColor: "#494D5F" }}>
      <h1>Challenge Kosmos - React JS</h1>
      <div className="buttons">
      <button onClick={addMoveable}>Add Moveable1</button>
      {selectedComponent && <button className="danger" onClick={removeSelectedMoveable}>Remove Selected Moveable</button>}
      </div>
      <div
        id="parent"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(100,50,100,0.75)",
          margin: "auto",
          position: "relative",
          background: "#E5EAF5",
          height: "80vh",
          width: "80vw",
        }}
      >
      {moveableComponents.map((element) => (
        <Component handleSelectedComponent={handleSelectedComponent} key={element.id} elementProperties={element} />
      ))}
      </div>
    </main>
  );
};

export default App;
