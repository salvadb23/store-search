import { useState } from "react";

import '../styles/Typeahead.css'

function Typeahead(props){
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
                let response = await fetch(url).then(r => r.json()).then(r => setStores(r.stores));
                console.log(stores);
        }    
    }

    return(
        <div style={{padding: '10px'}}>
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