import { useState } from "react";

import '../styles/Typeahead.css'

let Typeahead = () =>{
    const [stores, setStores] = useState([]);
    const [input, setInput] = useState("");

    let handleChange = async (e) => {
        setInput(e.target.value);
        let userInput = e.target.value;

        switch(userInput){
            case "":
                setStores([]);
                break
            default:
                let url = 'http://localhost/backend/stores?search=' + userInput;
                let response = await fetch(url).then(r => r.json());
                setStores(response.stores)
        }    
    }

    return(
        <div className="wrapper">
            <input 
                type="text"
                onChange={handleChange}
                className="input"
                value={input}
            />
            <ul>
                {stores.map(item => {
                    return <li className="item">{item.name} <pre className="tags">  #{item.tags}</pre></li>
                })}
            </ul>
        </div>
    )
}

export default Typeahead