import React from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";
import { Hero, Container, Title, SubTitle, Tabs } from "reactbulma";

const LandingPage = () => {
    return (
        <div className="page-container">
            <Hero light>
                <Hero.Body>
                    <Container>
                        <Title>This is the Landing Page</Title>
                        <SubTitle>Eventually there will be stuff here</SubTitle>
                    </Container>
                </Hero.Body>
                <Hero.Foot>
                    <Tabs boxed fullwidth>
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
                </Hero.Foot>
            </Hero>
        </div>
    );
};

export default LandingPage;
