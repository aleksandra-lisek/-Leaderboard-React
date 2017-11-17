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

    class Leader extends React.Component {
        render() {
            return  <tr>
                        <th>
                            <img src={this.props.img} id="img"/>
                        </th>
                        <th>{this.props.name}</th>
                        <th>{this.props.recentPoints}</th>
                        <th>{this.props.pointsAll}</th>
                        <th>{this.props.recentUpdate}</th>
                    </tr>

        }
    }

    class LeaderBoard extends React.Component {
        constructor(props) {
               super(props);
               this.state = {
                  leaders: [],
               }
           }

        componentDidMount() {
            const apiLeaders = ' https://fcctop100.herokuapp.com/api/fccusers/top/recent';

            fetch(apiLeaders)
            .then(r => r.json())
            .then(data => {
                let objects = data;

                this.setState({
                    leaders: objects,
                });

            });
        }


        render() {
            const leader = this.state.leaders.map((leader) => {
                return <Leader
                    name = {leader.username}
                    pointsAll = {leader.alltime}
                    recentPoints = {leader.recent}
                    recentUpdate = {leader.lastUpdate}
                    img = {leader.img}/>

            })
            return  <table>
                <tbody>
                {leader}
                </tbody>
            </table>



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
                <LeaderBoard/>
                <Footer/>
            </div>


        }
    }

    ReactDOM.render(
       <App/>, document.getElementById('app'));




});
