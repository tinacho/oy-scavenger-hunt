import Challenges from "app/components/Challenges";

export default function Team() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Team page name</h1>
      <div>Team profile image</div>
      <div>
        <h2>Members:</h2>
        <ul>
          <li>Member 1</li>
          <li>Member 2</li>
          <li>Member 3</li>
        </ul>
      </div>
      <Challenges />
    </main>
  );
}
