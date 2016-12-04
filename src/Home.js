import React, { Component } from 'react'
import { Link,Router, Route, IndexRoute, hashHistory } from "react-router";


class Home extends Component {

    render(){
        return (
            <div>
            <div className="header2">
            <div className="container">

            <div classNameName="row header-info">
            <div className="col-sm-10 col-sm-offset-1 text-center">
            <h1 className="wow animated fadeIn text-left">The study <br/>guide site.</h1>
        <br />
        <p className="lead wow animated fadeIn text-left" data-wow-delay="0.5s">Help us revolutionize studying one study guide at a time</p>
        <br />

        <div className="row">
            <div className="col-md-8  text-left">
            <div className="row text-left">
            <div className="col-xs-8 text-left wow animated fadeInUp" data-wow-delay="1s">
            <a className="btn btn-secondary-inverse btn-lg scroll "><Link to="/archives"> View Projects </Link></a>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>

            <section id="main-info" className="pad-xl">
            <div className="container">
            <div className="row">
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
            <hr className="line blue"/>
            <h3>Features</h3>
            <ul>
                <li>Tools:</li>
                <li> real-time chat </li>
                <li> quick notes </li>
                <li> file storage </li>
                <li> practice questions </li>
                <li> private study guides </li>
                <li> Large database of complete study materials </li>
            </ul>
        <hr className="line blue"/>
        </div>
        <div className="col-sm-6 wow fadeIn" data-wow-delay="0.8s">
            <div className="iphone wow fadeInUp" data-wow-delay="1s">
            <img src="img/macbook.png"/>
                </div>
        </div>
        </div>
        </div>
        </section>
        <section id="be-the-first" className="pad-xl">
            <div className="container">
            <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s">
            <div className="h21">Start now</div>
        <p className="lead">Change the way you study.</p>
        </div>
        </div>

        <div className="iphone wow fadeInUp" data-wow-delay="1s">
            <img src="img/iphone.png"/>
            </div>
            </div>
            </section>

            <section id="main-info" className="pad-xl">
            <div className="container">
            <div className="row">
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
            <hr className="line blue2"/>
            <h3>Personal (free)</h3>
        <p> Create up to 10 projects for the world to see and have free access to our massive database of user-made study guides.<br/><br/></p><a className="btn btn-primary btn-lg scroll "><Link to="/register"> Get Started </Link></a>
        </div>
        <div className="col-sm-6 wow fadeIn" data-wow-delay="0.8s">
            <hr  className="line red"/>
            <h3>Student <strike>($5/month)</strike>(free)</h3>
        <p>Don't want to stop your studying? Create unlimited projects, private or public, depending on how confidential your material is. Access to our study guide database is included.</p><a className="btn btn-secondary btn-lg scroll "><Link to="/register"> Get Started </Link></a>
        </div>
        </div>
        </div>
        </section>
        <footer>
        <div className="container white2body">

            <div className="row">
            <div className="col-sm-8 margin-20">
            <ul className="list-inline social">
            <li>Connect with us on</li>
            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
            <li><a href="https://www.facebook.com/thestudyguidesite/"><i className="fa fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
            </ul>
            </div>

            <div className="col-sm-4 text-right">
            <p><small>Copyright &copy; 2016. All rights reserved. <br/>
        Created by <a href="#">Emerson Berlik</a></small></p>
        </div>
        </div>

        </div>
        </footer>
        </div>
    )
    }
}
export default Home;