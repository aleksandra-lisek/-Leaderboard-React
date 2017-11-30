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
                sortRecent:true,
            }
        }

        componentDidUpdate(prevProps, prev) {
            if (prev.sort === false && this.state.sort === true ) {
               this.props.upDate(false, true);


           } else if (prev.sort === true && this.state.sort === false ) {
               this.props.upDate(true, false);


           }

        }



        handleClick = (e) => {
            e.preventDefault();
            if(this.state.sort === false){
                this.setState({
                    sort: true,
                    sortRecent: false,
                });
            }else{
                this.setState({
                    sort: false,
                    sortRecent: true,
                });
            }

        }

        render() {

            return <thead>
                <tr>
                     <th>#</th>
                     <th></th>
                     <th>Name</th>
                     <th className= "recent-th"
                         onClick={this.handleClick}>Points in past 30days</th>
                     <th className= "all-time-th"
                         onClick={this.handleClick}>All time points</th>
                      <th></th>
                </tr>
                </thead>

        }
    }


    class Leader extends React.Component {
        render() {
            return  <tr>
                        <td>
                        {this.props.count}
                    </td>
                        <td>
                            <img src={this.props.img} id="img"/>
                        </td>
                        <td>{this.props.name}</td>
                        <td>{this.props.recentPoints}</td>
                        <td>{this.props.pointsAll}</td>
                        <td>{this.props.recentUpdate}</td>
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


        sortAllTime = (alltime) => {
            const sortedAllPoints = this.state.leaders.sort((a,b) => {
                return b.alltime - a.alltime;

            });
                this.setState({
                    leaders: sortedAllPoints,
                });
        }

        sortRecent = (recent)=> {
            const sortedRecentPoints = this.state.leaders.sort((a,b) => {
                return b.recent - a.recent;

            });
                this.setState({
                    leaders: sortedRecentPoints,
                });


        }

        setStateFunction = (recent, alltime)=>{
            if(recent === true && alltime === false){
                this.sortRecent(recent);
            }else if(recent === false && alltime === true){
                this.sortAllTime(alltime);
            }

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
                upDate={this.setStateFunction}/>
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
