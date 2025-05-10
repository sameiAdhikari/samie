import styled, { css } from "styled-components";

const Row = styled.div`
  width: 100%;
  display: flex;
  ${(Props) =>
    Props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(Props) =>
    Props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};

export default Row;
