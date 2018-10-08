import React from 'react';
import Header from './layouts/header'
import Navigation from './layouts/navigation'

class App extends React.Component{
    render = () => {
        return(
            <div>
                <Header />
                <Navigation />
            </div>
        )
    }
}


export default App;
