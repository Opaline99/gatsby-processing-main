import React from "react";
import { useState, useContext } from "react";
// app
// p5
import { Menu } from "../components/menu";
import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";
import { P5DispatchContext, P5StateContext } from "../components/P5Manager";
import { MenuButton } from "../components/menuButton";

const Artwork_wrapper = P5Wrapper("my artwork");
const Button_refresh = P5Wrapper("refresh");

const ArtWork = () => (
  <>
    <P5Manager>
      <div style={{ position: "absolute" }}>
        <ComponentBuffer comp={Artwork_wrapper} />
      </div>
      <div style={{ position: "absolute" }}>
        <Menu></Menu>
        <MenuButton comp={Button_refresh} label="REFRESH" what="add_x" />
      </div>
    </P5Manager>
  </>
);

export default ArtWork;

let buf = {
  value: 0,
};

function ComponentBuffer(props) {
  const { x } = useContext(P5StateContext);
  const [state_data, set_data] = useState(buf);
  if (x !== state_data.value) {
    buf.value = x;
    set_data(buf);
  }

  return (
    <props.comp sketch={my_sketch_background} data={state_data}></props.comp>
  );
}


function  my_sketch_background(p5) {
  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    }
  }

  
  p5.draw = function () {
    //p5.circle(p5.mouseX, p5.mouseY, 50);
    p5.background(0);
    grille(15)
    p5.stroke(255);
  }

  function grille (step) {
    let offset = step /2;
    let inc = 0;
  
      for (let i = 0 ; i < p5.width ; i = i + step) {
        for (let p = 0; p < p5.height ; p = p + step) {
        let x = i + offset;
        let y = p + offset;
        inc +=1;
        pierre(x,y,5,inc);
      }
    }
  }


  function pierre (x,y,taille, inc) {
    p5.fill('hsla(200, 80%, 80%, 0.9)');
    p5.noStroke();
      if(inc%10 === 0) {
    pierre_rotation(x,y,taille, taille*5, inc);
    }
  } 

  function pierre_rotation(x,y,w,h,rotation) {
    let offset_x = w /2;
    let offset_y = h /2;
    p5.push();
    p5.translate(x, y);
    p5.push();
    p5.rotate((rotation + p5.frameCount) * 0.05);
    p5.translate(-offset_x, -offset_y);
    p5.ellipse(0,0,h,w/3);
    p5.pop();
    p5.pop();
  }

}
