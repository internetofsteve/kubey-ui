import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

const client = axios.create();

function App() {
    const [page, updatePage] = useState({
        cowboyNames: [],
        error: undefined
    });

    const loadCowboyNames = () => {
        client({
            headers: {
                Accept: 'application/json',
            },
            method: 'GET',
            url: '/cowboyNames'
        }).then(({data}) => updatePage({
            ...page,
            cowboyNames: data.cowboyNames,
        })).catch(() => updatePage({
            cowboyNames: [],
            error: "Unable to load cowboy names."
        }));
    };

    const CowboyNames = () => {
        return !!page.error ?
            <div>{page.error}</div> :
            page.cowboyNames.map(name => <div>${name}</div>);
    };

    return (
        <div className="App">
            <input type="button" onClick={loadCowboyNames} value="Load Cowboy Names"/>
            <CowboyNames/>
        </div>
    );
}

export default App;
