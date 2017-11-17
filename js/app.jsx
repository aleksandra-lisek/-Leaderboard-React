import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener('DOMContentLoaded', function() {

    class Header extends React.Component {
        render() {
            return     <header>
                    <h1>Leaderboard</h1>
                </header>

        }
    }




    class Footer extends React.Component {
        render() {
            return <footer>
                    <p>Created by <a href="#">Aleksandra Lisek</a></p>

                </footer>

        }
    }

    class App extends React.Component {
        render() {
            return <div className="all">
                <Header/>
                <Footer/>
            </div>


        }
    }

    ReactDOM.render(
       <App/>, document.getElementById('app'));




});
