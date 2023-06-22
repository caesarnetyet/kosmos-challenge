import { useRef } from "react"
import Moveable from "react-moveable";

const Component = ({elementProperties, handleSelectedComponent}) => {
  const targetRef = useRef(null);
  const moveableRef = useRef(null);
  const {id, top, left, width, height, photo} = elementProperties
  
  return (
    <>
      <div id={id} className="target" ref={targetRef} style={{
          position: "absolute",
          "width": width,
          "height": height,
          "top": top,
          "left": left,
          backgroundImage: `url(${photo})`,
          transform: "scale(1.5, 1)",
          
      }}>
      </div>
        <Moveable
            ref={moveableRef}
            target={targetRef}
            draggable={true}
            throttleDrag={1}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            scalable={true}
            keepRatio={false}
            throttleScale={0}
            onClick={() => handleSelectedComponent(targetRef.current)}
            snappable={true}
            bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
            onScale={e => {
                e.target.style.transform = e.drag.transform;
            }}
      />
    </>
  )

}

export default Component