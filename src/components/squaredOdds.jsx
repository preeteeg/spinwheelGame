import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import InputField from './fields/InputField.component'

const Wheelsquares = (props) =>
{

    const { wheelOptions } = props.wheelOptions
    const [board, setBoard] = React.useState({ }) 
    const newBoard = { ...wheelOptions, spin: { score: 0, themecolor: "black" }}
   
    React.useEffect(() =>
    {
        setBoard({ ...wheelOptions, ['spin']: { score: 0, themecolor: "black" } } )
     }, []);
     
    console.log({ board })


    return (
        <div className="radio-toolbar">
            {
                // Object.entries(board).map(([key, value], i) =>
                //     <React.Fragment key={key}>

                //         <label key={key} className={value.themecolor}  data={value.score}>
                //             {key}
                           
                //         </label>
                      
                //     </React.Fragment>
                // )


            }
        </div>
    )
}

export default Wheelsquares;