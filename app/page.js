import Image from "next/image";
import teams from "../mock-data/teams.json";
import challenges from "../mock-data/challenges.json";

export default function Home() {
  const orderedTeams = teams.sort((a, b) => b.score - a.score);
  return (
    <main className="">
      <h1>Scoreboard</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {orderedTeams.map((team) => (
            <tr key={team.id}>
              <td>
                <div>
                  <Image
                    src={team.profileImg}
                    alt="profile image"
                    width={40}
                    height={40}
                  />
                </div>

                <span>{team.name}</span>
              </td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/team/new">
        <button>Create team</button>
      </a>
    </main>
  );
}
