import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterValue, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeField = searchParams.get(filterValue) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterValue, value);
    if (searchParams.get("page")) setSearchParams.set("page", 1);
    else setSearchParams(searchParams);
  }

  return (
    //making re-usable filter button on the bases of passing props
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === activeField}
          disabled={option.value === activeField}
        >
          {option.label}
        </FilterButton>
      ))}

      {/* <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        with discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        no discount
      </FilterButton> */}
    </StyledFilter>
  );
}

export default Filter;
