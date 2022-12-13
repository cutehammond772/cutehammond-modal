import styled from "@emotion/styled";

export const Notification = styled.div`
  position: relative;
  width: auto;
  height: auto;

  border-radius: 15px;
  padding: 20px;

  display: grid;
  grid-template-rows: 3fr 5fr;
  grid-template-columns: 1fr 9fr;
  grid-gap: 1rem;

  cursor: pointer;

  background: rgba(0, 0, 0, 0.2);

  :hover {
    background: rgba(0, 0, 0, 0.5);
  }

  transition: background 300ms;

  & > .icon {
    grid-row: 1 / 4;

    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      font-size: 4rem;
      color: var(--dark);
    }
  }

  & > .title {
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 100%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--dark);
  }

  & > .content {
    font-size: 1.25rem;
    word-break: keep-all;

    color: var(--dark);
  }

  & > .remove {
    width: auto;
    height: auto;

    position: absolute;
    bottom: 15px;
    right: 15px;

    border-radius: 10px;
    padding: 5px 10px 5px 10px;
    font-size: 1rem;

    color: var(--dark);
  }

  @media screen and (max-width: 768px) {
    & > .icon {
      & > * {
        font-size: 3rem;
      }
    }

    & > .title {
      font-size: 1.5rem;
    }

    & > .content {
      font-size: 1.25rem;
    }
  }
`;
