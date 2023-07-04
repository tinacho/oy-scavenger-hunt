// import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";
import styled, { keyframes } from "styled-components";
import { Lexend } from "next/font/google";
import { withRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { compose } from "ramda";
import Image from "next/image";
import { SessionContext, withSessionProvider } from "@/lib/session";
import { MenuIcon, CloseIcon } from "@/components/icons";
import oy from "@/public/oy.png";

// const cabin = Cabin({ subsets: ["latin"] });
// const dyna = DynaPuff({ subsets: ["latin"] });
// const gluten = Gluten({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

function Layout({ children, router }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loggedIn, logout } = useContext(SessionContext);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !e.path?.includes(menuRef.current) &&
        !e.composedPath?.().includes(menuRef.current)
      ) {
        setMenuOpened(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpened(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpened(false);
  }, []);

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
      <Nav ref={menuRef}>
        <InnerBox>
          {!loggedIn && (
            <Greeting>
              <StyledImage alt="ollie and yvana" src={oy} />
              <h1>
                Welcome to <br />
                <strong>Ollie & Yvana&apos;s</strong>
                <br /> Scavenger Hunt!
              </h1>
            </Greeting>
          )}
          {loggedIn && (
            <>
              <Greeting>
                <Link href="/" onClick={closeMenu}>
                  <StyledImage alt="ollie and yvana" src={oy} />
                </Link>
                <h1>
                  <strong>Ollie & Yvana&apos;s</strong>
                  <br /> Scavenger Hunt!
                </h1>
              </Greeting>
              <IconBox onClick={menuOpened ? closeMenu : openMenu}>
                {menuOpened ? <CloseIcon /> : <MenuIcon />}
              </IconBox>
            </>
          )}
        </InnerBox>

        {loggedIn && menuOpened && (
          <Menu>
            <MenuItem href="/" onClick={closeMenu}>
              Leader board
            </MenuItem>
            <MenuItem href="/rules" onClick={closeMenu}>
              Game rules
            </MenuItem>
            <MenuItem href="/team/me" onClick={closeMenu}>
              My Team
            </MenuItem>
            <LogoutBox onClick={logout}>Logout</LogoutBox>
          </Menu>
        )}
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
  width: 95px;
  margin-right: 10px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  line-height: 1.2;
  font-weight: bolder;
`;

const Nav = styled.nav`
  background-color: var(--light-secondary);
  color: var(--text-invert);
  display: flex;
  flex-direction: column;
  align-items: center;
  mask: radial-gradient(5.38px at 50% calc(100% - 7.6px), #000 99%, #0000 101%)
      calc(50% - 8px) 0/16px 100%,
    radial-gradient(5.38px at 50% calc(100% + 3.6px), #0000 99%, #000 101%) 50%
      calc(100% - 4px) / 16px 100% repeat-x;
`;

const Main = styled.div`
  overflow-x: hidden;
`;

const IconBox = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;

const Menu = styled.div`
  background-color: var(--light-secondary);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 15px;
`;

const InnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 10px 20px;
`;

const MenuItemStyles = `
  width: 100%;
  padding: 7px 0;
  text-align: center;
  cursor: pointer;
`;

const MenuItem = styled(Link)`
  ${MenuItemStyles}
  border-bottom: 1px solid #dab181;
`;

const LogoutBox = styled.div`
  ${MenuItemStyles}
`;

export default compose(withRouter, withSessionProvider)(Layout);
