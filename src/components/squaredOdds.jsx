import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import InputField from './fields/InputField.component'

const Wheelsquares = (props) =>
{

    const wheelOptions  = props.wheelOptions
    const [board, setBoard] = React.useState({ }) 
  
    const spin = { spin: { score: 0, themecolor: "black" } };

    const options = { ...wheelOptions, ...spin };
    // React.useEffect(() =>
    // {
    //     setBoard({ ...options, ...spin } )
    //  }, []);
     
    // console.log(board )


    return (
        <div className="radio-toolbar">
            {
                Object.entries(wheelOptions).map(([key, value], i) =>
                    <React.Fragment key={key}>

                        <label key={key} className={value.themecolor}  data={value.score}>
                            {key}
                           
                        </label>
                        <label key={"spin"} className={"black"} data={0}>
                            spin

                        </label>
                      
                    </React.Fragment>
                )


            }
        </div>
    )
}

export default Wheelsquares;