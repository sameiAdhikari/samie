import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 50px;
      font-weight: 600;
      /* background-color: yellow; */
      color: var(--color-grey-800);
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      color: var(--color-grey-800);
    `}
      ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
      color: var(--color-grey-800);
    `}
     ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: var(--color-grey-800);
      text-align: center;
    `}
    line-height:1.4
`;
export default Heading;
