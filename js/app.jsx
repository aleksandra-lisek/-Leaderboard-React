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

    class THeader extends React.Component {
        constructor(props){
            super();
            this.state = {
                sort: false,
            }
        }

        componentDidUpdate(prevProps, prev) {
            if (prev.sort === false && this.state.sort === true) {
               this.props.upDate(true);

           } else if (prev.sort === true && this.state.sort === false) {
               this.props.upDate(false);

           }


        }

        handleClick = (e) => {
            e.preventDefault();
            this.setState({
                sort: true,
            });
        }
        render() {
            return <thead>
                <tr>
                     <th>#</th>
                     <th></th>
                     <th>Name</th>
                     <th
                         >Points in past 30days</th>
                     <th
                         onClick={this.handleClick}>All time points</th>
                </tr>
                </thead>

        }
    }


    class Leader extends React.Component {
        render() {
            return  <tr>
                        <th>
                        {this.props.count}
                        </th>
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


        sortObjects = (isSort) => {
            console.log("is sorted");
            const sortedAllPoints = this.state.leaders.sort((a,b) => {
                return b.alltime - a.alltime;

            });
            this.setState({
                leaders: sortedAllPoints,
            })
            console.log(sortedAllPoints);
        }


        render() {
            let count = 0;

            const leader = this.state.leaders.map((leader) => {
                count ++;
                return <Leader
                    key={leader.username}
                    count={count}
                    name = {leader.username}
                    pointsAll = {leader.alltime}
                    recentPoints = {leader.recent}
                    recentUpdate = {leader.lastUpdate}
                    img = {leader.img}/>

            });

            return  <table>
            <THeader
                upDate={this.sortObjects}/>
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
