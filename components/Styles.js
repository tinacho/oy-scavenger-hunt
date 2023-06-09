import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px;
  max-width: var(--max-content-width);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const Strong = styled.strong`
  color: var(--text-accent);
  text-transform: uppercase;
  font-size: 32px;
  line-height: 1;
`;

const MemberItem = styled.li`
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  padding: 13px 22px;
  background-color: var(--light-secondary);
  color: var(--text-invert);
  border-radius: 100px;
  min-height: var(--input-height);
  width: 100%;
  margin: auto;
  &[disabled] {
    opacity: 0.7;
    background-color: #d0cbc5;
  }
  ${(props) => props.small && "width: fit-content;"}
`;

export { Box, Title, Form, Section, Strong, MemberItem, StyledButton };
