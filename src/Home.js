import React, { Component } from 'react'
import { Link,Router, Route, IndexRoute, hashHistory } from "react-router";
import { Parallax,Background } from 'react-parallax';
import {Carousel,Grid,Row,PageHeader,Col,Clearfix,Glyphicon,Label,Button} from 'react-bootstrap';
class Home extends Component {

    render(){
        const head ={color: '#ffffff'};
        const foot = {color: '#428bca'};
        return (
            <div>
            <div>
                <Parallax bgImage="background4.jpg" strength={200}>
                <div style={{
                    width: 800,
                    height: 300

                }}></div>
                <br/>
                    <PageHeader style={head} className="text-center"> Honor Code </PageHeader>
                    <h4 style={head} className="text-center"> the study guide site </h4>
                    <div className="text-center">
                    <Button bsStyle="default" bsSize="small"> <Link to="/register" className="navbar-brand">Register</Link> </Button>
                    </div>
                    <br/>
                    <br/>
            </Parallax>

            </div>
            <div>
            <br/>
                <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={4} ><h1 className="text-center"><Glyphicon glyph="glyphicon glyphicon-blackboard" /><br/> Be Efficient </h1><p>Utilize Honor Code's growing number of study guides to ace that next test. Think about it! The information you need is already here. Why do extra work?</p></Col>
                    <Col sm={6} md={4} ><h1 className="text-center"><Glyphicon glyph="glyphicon glyphicon-apple" /><br/> Be Connected </h1><p> Studies show that collaborative learning has many benefits. Why not take advantage of our tool to get together with friends and learn together? </p></Col>
                    <Col sm={6} md={4} ><h1 className="text-center"><Glyphicon glyph="glyphicon glyphicon-education" /><br/> Be Successful </h1><p>Get the grades and test scores you want with this easy to use tool. Stop your search, this is the study site you've been looking for.</p></Col>
                </Row>
                </Grid>
            <br/>
            </div>
            <div>
                <Carousel>
                <Carousel.Item>
                <img className="img-responsive center-block" width={500} height={500} alt="900x500" src="image1.jpg"/>
                    <Carousel.Caption>
                    <h3>Mobile Friendly</h3>
                <p>For on the go studing.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img className="img-responsive center-block" width={990} height={500} alt="900x500" src="slideshow1.png"/>
                    <Carousel.Caption>
                    <h3>File Upload</h3>
                <p>Share your most important study guides or find others.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img className="img-responsive center-block" width={990} height={500} alt="900x500" src="slideshow2.png"/>
                    <Carousel.Caption>
                    <h3>Endless resources</h3>
                <p>The studying never stops with our growing database of study guides.</p>
                </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
            <br />
            <div classname ="text-center">
            <h1 className= "text-center">Contact Us</h1>
            <h4 className= "text-center"> We'll get back to you as soon as we can. Thank you!</h4>
            <h4 className= "text-center"> Email: <a href="mailto:eberlik@gmail.com">eberlik@gmail.com</a></h4>
            <br />
            <br/>

            </div>
                <div>
                <Parallax bgImage="background5.jpg" strength={200}>
                    <div style={{
                    width: 800,
                        height: 300

                }}></div>
                <br/>
                    </Parallax>

                    </div>
                <div classname ="text-center">
                    <h1 className= "text-center">About Us</h1>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={6} xsOffset={3}> We created this tool to help students who don't have access to top learning tools to have the information they need to succeed in an academically rigorous environment. We are always open to feedback as to how to make our tool better. </Col>
                            </Row>
                    </Grid>
            <br/>
            <br/>
            <br/>

        </div>
        </div>
    )
    }
}
export default Home;