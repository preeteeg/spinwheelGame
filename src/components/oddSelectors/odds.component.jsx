import React, { forwardRef, useImperativeHandle,useRef }from 'react'
import axios from 'axios'
import InputField from '../fields/InputField.component'

const OdddsPanel = forwardRef((props, ref) =>
{
  
    const [value, setValue] = React.useState("");
    const [checked, setOddsState] = React.useState(false);
    const [error, setError] = React.useState("");
    
    let radioref = useRef([
        React.createRef()
    ]);


    
    const handleChange = (event) =>
    {
        //console.log(event.target.checked)
        
        setValue({ value : event.target.value })
        setOddsState({ checked: event.target.checked})
       
        props.onChange(event.target.name, event.target.value)
    }
    const validateOdds = () =>
    {
        
        //return true if is valid 
        //else return false
        var radios = document.getElementsByName("odds");
        var formValid = false;

        var i = 0;
        while (!formValid && i < radios.length)
        {
            if (radios[i].checked) formValid = true;
            i++;
        }

        if (!formValid)
        {
          // setError("Please select one Odd to play!")
            return false
        }
        return formValid;


    }

    useImperativeHandle(ref, () =>
    {
  
        return {

            validateOdds: () =>validateOdds()
           
           
        }
    })

   
    return (
        <div className="radio-toolbar" ref={radioref}>
            {
                Object.entries(props.predictions).map(([key, value], i) =>
                    <React.Fragment key={key}>
                        
                        <label key={key} className={value.themecolor}>{key} 
                            <input
                                type="radio"
                                id={key}
                                name={props.name}
                                value={value.score}
                                checked={checked}
                                onChange={handleChange}
                            />
                              
                        </label>
                        {error && (
                            <p className="error">{error}</p>
                        )}
                    </React.Fragment>
                )

                
            }
        </div>
    )
})

export default OdddsPanel;