import styled from "styled-components";

const StyledHero = styled.header`
  min-height: 60vh;
  background: url(${({ img }) => img});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;