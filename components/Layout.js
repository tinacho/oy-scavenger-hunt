// import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";
import { Lexend } from "next/font/google";
import { withRouter } from "next/router";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { compose } from "ramda";
import { SessionContext, withSessionProvider } from "@/lib/session";

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
    <main className={`${lexend.className} text-xl`}>
      <nav className="bg-orange-100 text-gray-800 p-12">
        <ul className="flex items-center justify-between">
          {!loggedIn && <h2>Welcome to OY Scavenger Hunt!</h2>}
          {loggedIn && (
            <>
              <li>
                <Link href="/">Scoreboard</Link>
              </li>
              <li>
                <Link href="/team/me">My Team</Link>
              </li>
              <li>
                <button onClick={logout}>logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      {children}
    </main>
  );
}

export default compose(withRouter, withSessionProvider)(Layout);
