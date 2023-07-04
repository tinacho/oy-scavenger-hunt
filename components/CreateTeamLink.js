import Link from "next/link";
import styled from "styled-components";
import { Button } from "./Button";

export default function CreateTeamLink({ className }) {
  return (
    <StyledLink href="/team/new" className={className}>
      <Button text="Create team" />
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  width: 100%;
`;
