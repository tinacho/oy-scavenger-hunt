import Image from "next/image";
import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import teams from "../mock-data/teams.json";
import challenges from "../mock-data/challenges.json";
import { queries, withApiData } from "../api";

function Home({ data }) {
  console.log(
    "%c ------------------------data------------------------",
    "background: green; color: white; display: block;",
    data
  );

  const orderedTeams = teams.sort((a, b) => b.score - a.score);
  return (
    <div>
      <div className="w-full bg-neutral-950/20 border rounded-md border-orange-200/100 p-6">
        <h1>Scoreboard</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {orderedTeams.map((team) => (
              <tr key={team.id}>
                <td className="flex items-center">
                  <div className="rounded-full overflow-hidden w-20 h-20 mr-3">
                    <Image
                      src={team.profileImg}
                      alt="profile image"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span>{team.name}</span>
                </td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/team/new">
        <button>Create team</button>
      </a>
    </div>
  );
}

export default withApiData(queries.home)(Home);