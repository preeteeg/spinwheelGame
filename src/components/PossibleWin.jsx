import React from 'react'
import PropTypes from 'prop-types'

function PossibleWin({ stakeInput, oddSelected })
{
    return (
        <div>
            {
                stakeInput >= 10 && stakeInput <= 100 ? `Possible win :${stakeInput * oddSelected}` :null
            }
           
        </div>
    )
}

PossibleWin.defaultProps = {
    stakeInput: 0,
    oddSelected:0
}

export default PossibleWin

