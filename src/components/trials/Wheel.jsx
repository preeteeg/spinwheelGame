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


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// function auth() {

//   axios.post('http://myweburl.org/app/web/checkLogin', { headers: {'Accept': 'application/json'} })
//     .then((response) => {
//       console.log(response);
//       if(response.data.success){
//         return true;
//       }else if(response.data.error){
//         return false;
//       }
//     });

// };

// const isAuthorized = auth();