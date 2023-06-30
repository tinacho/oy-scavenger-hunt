// import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";
import { Lexend } from "next/font/google";
import { withRouter } from "next/router";
import Link from "next/link";
import {  useContext } from "react";
import { compose } from "ramda";
import { SessionContext, withSessionProvider } from "@/lib/session";

// const cabin = Cabin({ subsets: ["latin"] });
// const dyna = DynaPuff({ subsets: ["latin"] });
// const gluten = Gluten({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

function Layout({ children }) {

  const { loggedIn, logout } = useContext(SessionContext)
 
  return (
    <main className={`${lexend.className} text-xl`}>
      <nav className="bg-orange-100 text-gray-800 p-12">
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/">OY Scavenger Hunt</Link>
          </li>
          {loggedIn && (
            <>
              <li>
                <Link href="/team/me">My team</Link>
              </li>
              <li>
                <button onClick={logout}>logout</button>
              </li>
            </>
          )}
          {!loggedIn && (
            <>
              <li>
                <Link href="/team/me">Create or Join team</Link>
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
