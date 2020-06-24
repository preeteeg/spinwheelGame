import React, { useEffect,useState } from "react";
import "./spinWheel.css";

const SpinWheel = (props) =>
{
   
    let wheelOptions = props.predictions

    const spin = { spin: { score: 0, themecolor: "black" } }
    //let newWheel = Object.assign(wheelOptions, spin)
    let newWheel = { ...wheelOptions, ...spin }


    const [wheel, setWheel] = useState({
        radius: 75, // PIXELS
        rotate: 0, // DEGREES
        easeOut: 0, // SECONDS
        angle: 0, // RADIANS
        top: null, // INDEX
        offset: null, // RADIANS
        net: null, // RADIANS
        result: null, // INDEX,
        spinning:false
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
    
    

    
    // generate rbg values for wheel sectors as per Odds Id

    const getColor = (color,oddKey) =>
    {
        let c;
        if (color == "yellow" && oddKey== "x2") {
            c = "#ffc107";
        }
        if (color == "orange" && oddKey == "x3")
        {
            c = "#fd7e14";
        }
        if (color == "red" && oddKey == "x5")
        {
            c = "#dc3545";
        }
        if (color == "magneta" && oddKey == "x10")
        {
            c = "#8b0000";
        }
        if (color == "black" && oddKey == "spin")
        {
            c = "#000000";
        }

        return c;
    }

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
        ctx.strokeStyle = color;

        ctx.font = "17px Arial";
        ctx.fillStyle = "white";
        ctx.stroke();

        ctx.save();
        ctx.translate(
            baseSize + Math.cos(angle - arc / 2) * textRadius,
            baseSize + Math.sin(angle - arc / 2) * textRadius
        );
        ctx.rotate(angle - arc / 2 + Math.PI / 2);
        //console.log(text.key)
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }

    const getResult = (spin) =>
    {
        // find net rotation and add to offset angle
        // repeat substraction of inner angle amount from total distance traversed
        // use count as an index to find value of result from state list
        const { angle, top, offset } = wheel;
        let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
        let travel = netRotation + offset;
        let count = top + 1;
        let result;
        
        while (travel > 0)
        {
            travel = travel - angle;
            count--;
        }
        
        if (count >= 0)
        {
            result = count;
        } else
        {
            result = Object.keys(newWheel).length + count;
            
        }

        // return {
        //     net: netRotation,
        //     result: result
        // }

        // set state variable to display result
        setWheel({
            ...wheel,
            net: netRotation,
            result: result
        });
        console.log(spin)
    };



    useEffect(() =>
    { setWheel({
            ...wheel,
            angle: arcSize,
            top: position.top,
            offset:position.offset
        });
    }, [])
    
  
  
    //console.log(wheel)
    let numOptions = Object.keys(newWheel).length
    let arcSize = (2 * Math.PI) / numOptions
    // get index of starting position of selector
    let position = topPosition(numOptions, arcSize)
    let angle = 0
  
  
    
    useEffect(() =>
    {
        Object.entries(newWheel).map(([key, value], k) =>
        {
           // console.log(k + 1, key, angle, arcSize, getColor(value.themecolor, key), value.score)
            for (let i = 0; i < numOptions; i++)
            {
                renderSector(k+1, key, angle, arcSize, getColor(value.themecolor, key), value.score)
            }
            angle += arcSize
            
        })
    }, [newWheel])
    

       
    useEffect(() =>
    {
        if (props.spinStatus)
        {
          // set random spin degree and ease out time
          // set state variables to initiate animation
            setWheel({
                ...wheel,
                rotate: props.initRotate,
                easeOut: props.initEaseout,
                spinning: props.spinStatus
            })
            // calcalute result after wheel stops spinning
            setTimeout(() =>
            {
                getResult(props.initRotate);
            }, 2000);
            //console.log(wheel)
        //     // calcalute result after wheel stops spinning
        //     setTimeout(() =>
        //     {
        //         let wheelresult = getResult(props.initRotate);
        //           setWheel({
        //     ...wheel,
        //               net: wheelresult.netRotation,
        //               result: wheelresult.result
        // });
        //     }, 2000);
        }
     
    }, [props.spinStatus])
   






    return (
        <div className="wheelWrapper">
            {wheel.result}
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