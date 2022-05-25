/**
 * @filename    : Pagination.js
 * @author      : 전우열
 * @description : 페이지네이션 기능
 */

import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 8px;
  margin: 0;
  background: #1db954;
  color: white;
  font-size: 1rem;

  &:hover {
    background: #ff4b60;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #28291b;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #ff4b60;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((v, i) => (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
              }}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
