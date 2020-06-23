import React, { forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) =>
{
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("");

    const handleChange = (event) =>
    {
        setValue(event.target.value)
        setError("");
        props.onChange(event.target.name, event.target.value)
    }

    const validate = () =>
    {
        //return true if is valid 
        //else return false

        if (props.validation)
        {
            const rules = props.validation.split("|");

            for (let i = 0; i < rules.length; i++)
            {
                let current = rules[i];

                if (current === "required")
                {
                    if (!value)
                    {
                        setError("This field is required");
                        return false
                    }
                }
                else
                {
                    const pair = current.split(":")
                    //console.log(pair)
                    switch (pair[0])
                    {
                        case "min":
                            if (parseInt(value) < parseInt(pair[1]))
                            {
                                setError(`${props.label} a minimum of $${pair[1]} is required as bet amount `);
                                return false
                            }
                            break;
                        case "max":
                            if (parseInt(value) > parseInt(pair[1]))
                            {
                                setError(`${props.label} a maximum of $${pair[1]} is required as bet amount `);
                                return false;
                            }
                            break;
                        default:
                            break;
                    }
                    
                }
              
            }
        }

        return true;
    }

    useImperativeHandle(ref, () =>
    {
       // console.log(props.validation)
        return {
           
            validate: () => validate()
        }
    })

    return (
        <div className="input-wrapper">
            {props.label && (
                <label>{props.label}</label>
            )}
            <input
                placeholder={props.placeholder}
                name={props.name}
                onChange={(event) => handleChange(event)}
                type={props.type}
                id={props.id}
                value={props.value ? props.value : value}
                autoComplete={props.autoComplete}
                
            />
            {error && (
                <p className="error">{error}</p>
            )}
        </div>
    )
})

InputField.defaultProps = {

    placeholder: "",
    name: "",
    type: "text",
    value: "",
    autoComplete: "off",
    validation: ""
}


export default InputField;