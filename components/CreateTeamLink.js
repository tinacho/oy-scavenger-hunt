import Link from "next/link";
import { Button } from "./Button";

export default function CreateTeamLink({ className }) {
  return (
    <Link href="/team/new" className={className}>
      <Button text="Create team" />
    </Link>
  );
}
