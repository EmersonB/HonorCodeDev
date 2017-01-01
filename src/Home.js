import React, { Component } from 'react'
import { Link,Router, Route, IndexRoute, hashHistory } from "react-router";


class Home extends Component {

    render(){
        return (
            <div>
                <div className = "rect funtext">
                <h3 className = "text-centered"> Welcome to study scope, the social media of studying. Explore other community created study guides, or create your own with our simple tool. Get started by signing up. It's all free! </h3>

                <div className="container2">
                <div className="planet"></div>
                <div className="rocket"></div>
            </div>
                <h3 className= "text-center"> Our iOS app is currently being developed </h3>
            <div className="container3">
            <div className="iphone-front"></div>
            <div className="iphone-back"></div>
            </div>

            </div>

        </div>
    )
    }
}
export default Home;