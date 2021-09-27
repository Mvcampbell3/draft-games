import React from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";
import { Hero, Container, Heading, Tabs } from "react-bulma-components";

const LandingPage = () => {
    return (
        <div className="page-container">
            <Hero color="dark">
                <Hero.Body>
                    <Container>
                        <Heading>This is the Landing Page</Heading>
                        <Heading>Eventually there will be stuff here</Heading>
                    </Container>
                </Hero.Body>
                <Hero.Footer>
                    <Tabs type="boxed" fullwidth>
                        <Container>
                            <ul>
                                <li className="active">
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/testing">Testing Page</Link>
                                </li>
                            </ul>
                        </Container>
                    </Tabs>
                </Hero.Footer>
            </Hero>
        </div>
    );
};

export default LandingPage;
