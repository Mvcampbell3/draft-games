import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hero, Container, Tabs, Heading } from "react-bulma-components";
import "./PageTop.scss";

const PageTop = ({
    title = "Title",
    subtitle = "Subtitle",
    color = "dark ",
}) => {
    const location = useLocation();
    const { pathname } = location;

    const links = [
        { to: "/", name: "Home", active: pathname === "/" },
        { to: "/testing", name: "Testing", active: pathname === "/testing" },
    ];

    return (
        <Hero color={color} className="mb-4">
            <Hero.Body>
                <Container>
                    <Heading>{title}</Heading>
                    <Heading subtitle>{subtitle}</Heading>
                </Container>
            </Hero.Body>
            <Hero.Footer>
                <Tabs type="boxed" fullwidth>
                    <Container>
                        <ul>
                            {links.map((link, i) => (
                                <li
                                    key={i}
                                    className={link.active ? "is-active" : ""}
                                >
                                    <Link to={link.to}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </Container>
                </Tabs>
            </Hero.Footer>
        </Hero>
    );
};

export default PageTop;
