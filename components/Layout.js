// import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";
import { Lexend } from "next/font/google";
import { withRouter } from "next/router";
import Link from "next/link";

// const cabin = Cabin({ subsets: ["latin"] });
// const dyna = DynaPuff({ subsets: ["latin"] });
// const gluten = Gluten({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

function Layout({ children }) {
  return (
    <main className={`${lexend.className} text-xl`}>
      <nav className="bg-orange-100 text-gray-800 p-12">
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/">OY Scavenger Hunt</Link>
          </li>
          <li>
            <Link href="/team/me">My team</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
}

export default withRouter(Layout);
