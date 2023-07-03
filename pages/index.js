import { useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Box } from "@/components/team/Styles";
import ImageWithFallback from "@/components/ImageWithFallback";
import { queries, withApiData } from "../api";
import { getTeamScore } from "@/lib/getTeamScore";
import DefaultPicture from "@/public/default-profile.jpeg";

function Home({ data }) {
  const orderedTeams = useMemo(() => {
    if (data?.allTeams?.data) {
      return data.allTeams.data;
    }
    return [];
  }, [data]);

  return (
    <Box>
      <Title>Scoreboard</Title>
      <TableBox>
        <Table>
          <thead>
            <tr>
              <TeamNameHeader as="th">Team</TeamNameHeader>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {orderedTeams.map((team) => (
              <tr key={team._id}>
                <Cell>
                  <StyledLink href={`/team/${team._id}`}>
                    <LogoBox>
                      {team.logoSrc && (
                        <StyledImage
                          src={team.logoSrc}
                          alt="profile image"
                          width={100}
                          height={100}
                          fallback={DefaultPicture}
                        />
                      )}
                    </LogoBox>
                    <span>{team.name}</span>
                  </StyledLink>
                </Cell>
                <Cell>{getTeamScore(team)}</Cell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableBox>
    </Box>
  );
}

const Title = styled.h1`
  padding: 15px 25px;
  border-radius: 10px 10px 0 0;
  border: var(--border-primary);
  border-bottom: none;
`;

const StyledImage = styled(ImageWithFallback)`
  width; 100%;
  height: 100%;
  object-fit: cover;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBox = styled.div`
  border: var(--border-primary);
  border-radius: 10px;
  background-color: rgb(10 10 10 / 0.2);
  width: 100%;
  margin-bottom: 40px;
  padding: 20px;
  padding-top: 10px;
`;

const LogoBox = styled.div`
  border-radius: 300px;
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Cell = styled.td`
  vertical-align: middle;
  height: 80px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const TeamNameHeader = styled(Cell)`
  text-align: left;
  padding-left: 70px;
`;

export default withApiData({
  query: queries.home,
  // options: { pollInterval: 3000 },
})(Home);
