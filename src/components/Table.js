import styled from 'styled-components';

/* 표에 CSS를 적용한 styledComponent */
const Table = styled.table`
  border-collapse: collapse;
  border-top: 3px solid #1db954;
  font-size: 14px;
  text-align: center;
  margin: auto;
  width: 100%;
  min-width: 300px;
  margin-bottom: 20px;

  th {
    color: #1db954;
    background-color: #f8fff8;
    padding: 10px;
    border: 1px solid #ddd;

    &:first-child {
      border-left: 0;
    }

    &:last-child {
      border-right: 0;
    }
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;

    &:first-child {
      border-left: 0;
    }

    &:last-child {
      border-right: 0;
    }
  }

  tr:nth-child(even) {
    background: #f8fff8;
  }
`;

export default Table;
