import React from 'react'
import PropTypes from 'prop-types'

function Wheel({ wheelOptions })
{
    let size = Object.keys(wheelOptions).length*4;
    console.log(wheelOptions)
    const wheelVars = {
        '--nb-item': size
    };
    return (
        <div className="wheel-container">
            <div className={`wheel`} style={wheelVars} >
                {
                    Object.entries(wheelOptions).map(([key, value], index) =>
                        <div className={`wheel-item ${value.themecolor}`} key={key} style={{ '--item-nb': index}}>
                            {key}
                        </div> 
                    )
                }
    
            </div>
        </div>
    )
}



export default Wheel

