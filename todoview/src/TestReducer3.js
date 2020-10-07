import React, {useReducer} from "react";

const reducer = (prev, action) => {
    const {type, value} = action;

    if (type==="SET_NUMBER") {
        return {
            ...prev,
            number: parseInt(value) + 1
        }
    }
}

export default function TestReducer3() {

    
    const [num, dispatch] = React.useReducer(reducer, {
            "number":0
    })

    const change = (e) => {        

        const {value, name:type} = e.target;
        dispatch({
            type,
            value
        })
    }

    return (
        <>
            <div>현재 숫자는? {num.number}</div>
            <button value={num.number} name="SET_NUMBER" onClick={change}>클릭</button>
        </>
    )
}