import React, { useEffect,useState } from "react";
import "./spinWheel.css";

const SpinWheel = (props) =>
{
   
     // const [options, setOddOptions] = useState({ odds: { ...wheelOptions}})
    
    const [wheel, setWheel] = useState({
        radius: 75, // PIXELS
        rotate: 0, // DEGREES
        easeOut: 0, // SECONDS
        angle: 0, // RADIANS
        top: null, // INDEX
        offset: null, // RADIANS
        net: null, // RADIANS
        result: null, // INDEX,
    })
    
    const topPosition = (num, angle) =>
    {
        // set starting index and angle offset based on list length
        // works upto 9 options
        let topSpot = null;
        let degreesOff = null;
        if (num === 9)
        {
            topSpot = 7;
            degreesOff = Math.PI / 2 - angle * 2;
        } else if (num === 8)
        {
            topSpot = 6;
            degreesOff = 0;
        } else if (num <= 7 && num > 4)
        {
            topSpot = num - 1;
            degreesOff = Math.PI / 2 - angle;
        } else if (num === 4)
        {
            topSpot = num - 1;
            degreesOff = 0;
        } else if (num <= 3)
        {
            topSpot = num;
            degreesOff = Math.PI / 2;
        }
        return {top:topSpot-1,offset:degreesOff}
       
    }
    
    // let wheelOptions = props.predictions


    // let spin = { spin: { score: 0, themecolor: "red" } };
    // let newOdds = { ...spin } 
    // const [odds, setOdds] = useState(wheelOptions);
    let odds = {
        spin: { score: 0, themecolor: "red" },
        x2: {
            score: 2,
             themecolor: "yellow"
        },
        x3: {
         score: 3,
         themecolor: "orange"
        },
        x5: {
            score: 5,
             themecolor: "red"
        },
        x10: {
            score: 10,
             themecolor: "magneta"
        }
    
    };

    let numOptions = Object.keys(odds).length;
    let arcSize = (2 * Math.PI) / numOptions;
    // get index of starting position of selector
    let position =topPosition(numOptions, arcSize);
    
    const getColor = (color) =>
    {
        let c;
        switch (color)
        {
            case "red":
                c = "#dc3545";
                break;
            case "orange":
                c = "#fd7e14";
                break;
            case "magneta":
                c = "#8b0000"
                break;
            case "yellow":
                c = "#ffc107";
                break;
            case "black":
                c = "#00000";
                break;
            default:
                c = "#ffffff";
                break;

        }
        // randomly generate rbg values for wheel sectors
        return c;
    }

    useEffect(() =>
    {
        const renderSector = (index, text, start, arc, color, score) =>
        {
            // create canvas arc for each list element
            let canvas = document.getElementById("wheel");
            let ctx = canvas.getContext("2d");
            let x = canvas.width / 2;
            let y = canvas.height / 2;
            let radius = wheel.radius;
            let startAngle = start;
            let endAngle = start + arc;
            let angle = index * arc;
            let baseSize = radius * 3.33;
            let textRadius = baseSize - 150;

            ctx.beginPath();
            ctx.arc(x, y, radius, startAngle, endAngle, false);
            ctx.lineWidth = radius * 2;
            ctx.strokeStyle = getColor(color);

            ctx.font = "17px Arial";
            ctx.fillStyle = "black";
            ctx.stroke();

            ctx.save();
            ctx.translate(
                baseSize + Math.cos(angle - arc / 2) * textRadius,
                baseSize + Math.sin(angle - arc / 2) * textRadius
            );
            ctx.rotate(angle - arc / 2 + Math.PI / 2);
            //console.log(text.key)
            ctx.fillText(text.key, -ctx.measureText(text.key).width / 2, 0);
            ctx.restore();
        }
        let angle = 0;
        for (let i = 0; i < numOptions; i++)
        {
            Object.entries(odds).map(([key, value], k) =>
            {
                console.log()
                renderSector(k+1, { key }, angle, arcSize, value.themecolor, value.score)

            })
            angle += arcSize
        }

        setWheel({
            ...wheel,
            angle: arcSize,
            top: position.top,
            offset:position.offset
        });
        
      
    },[])
  
    console.log(wheel)
   





    return (
         <div>
                <span id="selector">&#9660;</span>
                <canvas
                    id="wheel"
                    width="500"
                    height="500"
                    style={{
                        WebkitTransform: `rotate(${wheel.rotate}deg)`,
                        WebkitTransition: `-webkit-transform ${
                            wheel.easeOut
                            }s ease-out`
                    }}
                />
            </div>
        );
    



}






export default SpinWheel