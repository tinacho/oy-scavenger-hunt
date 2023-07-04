// import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";
import styled, { keyframes } from "styled-components";
import { Lexend } from "next/font/google";
import { withRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { compose } from "ramda";
import Image from "next/image";

import { SessionContext, withSessionProvider } from "@/lib/session";
import { Button } from "./Button";
import oy from "@/public/oy.png";

// const cabin = Cabin({ subsets: ["latin"] });
// const dyna = DynaPuff({ subsets: ["latin"] });
// const gluten = Gluten({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

function Layout({ children, router }) {
  const { loggedIn, logout } = useContext(SessionContext);

  useEffect(() => {
    if (!loggedIn) {
      console.log("pushing to me route");
      router.push("/team/me");
    }
    // the router seems to change on every mount so dont use it as dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <Main className={lexend.className}>
      <Nav>
        <ul className="flex items-center justify-between">
          {!loggedIn && (
            <Greeting>
              <StyledImage alt="ollie and yvana" src={oy} />
              <h2>
                Welcome to <br />
                <strong>Ollie & Yvana</strong>&apos;s
                <br /> Scavenger Hunt!
              </h2>
            </Greeting>
          )}
          {loggedIn && (
            <>
              <li>
                <Link href="/">Scoreboard</Link>
              </li>
              <li>
                <Link href="/team/me">My Team</Link>
              </li>
              <li>
                <Button onClick={logout} text="Logout" />
              </li>
            </>
          )}
        </ul>
      </Nav>
      {children}
    </Main>
  );
}

const spin = keyframes`
    100% { transform: rotate(2turn); }
`;

const StyledImage = styled(Image)`
  animation: ${spin} 1s forwards;
  width: 100px;
  margin-right: 20px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1.2;
  font-weight: bolder;
`;

const Nav = styled.nav`
  padding: 20px;
  background-color: var(--light-secondary);
  color: var(--text-invert);
`;

const Main = styled.div`
  overflow-x: hidden;
`;

export default compose(withRouter, withSessionProvider)(Layout);
