import React from "react";
import { connect } from "react-redux";
import { setLoginModalOpen } from "../../../redux/actions";
import { Link, useLocation } from "react-router-dom";
import { Hero, Container, Tabs, Heading, Button } from "react-bulma-components";
import { getAuth } from "@firebase/auth";
import "./PageTop.scss";

const PageTop = ({
    title = "Title",
    subtitle = "Subtitle",
    color = "dark ",
    // redux
    loggedIn = false,
    setLoginModalOpen,
}) => {
    const auth = getAuth();
    const location = useLocation();
    const { pathname } = location;

    const links = [
        { to: "/", name: "Home", active: pathname === "/", display: true },
        {
            to: "/create",
            name: "Create Game",
            active: pathname === "/create",
            display: loggedIn,
        },
    ];

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    };

    const handleSignOutClick = () => {
        auth.signOut();
    };

    return (
        <Hero color={color} className="mb-4">
            <Hero.Body>
                <Container>
                    <div className="flex-container">
                        <div className="flex-container--left">
                            <Heading>{title}</Heading>
                            <Heading subtitle>{subtitle}</Heading>
                        </div>
                        <div className="flex-container--right">
                            {loggedIn ? (
                                <Button onClick={handleSignOutClick}>
                                    Sign Out
                                </Button>
                            ) : (
                                <Button onClick={handleLoginClick}>
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
            </Hero.Body>
            <Hero.Footer>
                <Tabs type="boxed" fullwidth>
                    <Container>
                        {links.filter((link) => link.display).length > 1 && (
                            <ul>
                                {links
                                    .filter((link) => link.display)
                                    .map((link, i) => (
                                        <li
                                            key={i}
                                            className={
                                                link.active ? "is-active" : ""
                                            }
                                        >
                                            <Link to={link.to}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </Container>
                </Tabs>
            </Hero.Footer>
        </Hero>
    );
};

const mapStateToProps = (state, ownProps) => {
    const {
        appState: {
            user: { loggedIn },
        },
    } = state;
    return { loggedIn, ...ownProps };
};

const mapDispatchToProps = { setLoginModalOpen };

export default connect(mapStateToProps, mapDispatchToProps)(PageTop);
