import Link from "next/link";

export default function CreateTeamLink({ className }) {
  return (
    <Link href="/team/new" className={className}>
      <button>Create team</button>
    </Link>
  );
}
