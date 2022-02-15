import React, { useState, useEffect } from 'react';


const EditGame = (props) => {

    const { id } = props;

    //Believe I will need to do an axios.get() call. Then, inside my submitHandler, I would do an axios.put() call.  

    return (
        <div>
            Edit Game
        </div>
    )
}
export default EditGame;

