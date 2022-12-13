import styled from "@emotion/styled";

export const Menu = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  column-gap: 10px;
  row-gap: 10px;
`;

export const MenuButton = styled.div`
  width: auto;
  height: auto;

  cursor: pointer;
  border-radius: 20px;
  padding: 15px 20px 15px 20px;

  background-color: var(--primary);

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  column-gap: 10px;

  & * {
    font-size: 1.15rem;
    line-height: 100%;
    color: var(--light);
    text-decoration: none;
  }

  :hover {
    filter: brightness(0.75);
  }

  transition: filter 300ms;
`;
