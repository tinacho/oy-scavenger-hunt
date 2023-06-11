import { Cabin, DynaPuff, Lexend, Gluten } from "next/font/google";

const cabin = Cabin({ subsets: ["latin"] });
const dyna = DynaPuff({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });
const gluten = Gluten({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <main className={`${lexend.className} text-xl`}>
      <nav className="bg-orange-100 text-gray-800 p-12">
        <ul className="flex items-center justify-between">
          <li>
            <a href="/">OY Scavenger Hunt</a>
          </li>
          <li>
            <a href="/team/me">My team</a>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
}
