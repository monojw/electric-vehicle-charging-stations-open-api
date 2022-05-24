import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/* 로딩바 컴포넌트 */
// --> https://mhnpd.github.io/react-loader-spinner
import { Grid } from 'react-loader-spinner';

/* 로딩바 뒤에 표시될 반투명 막 */
const TransLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: #0003;
  width: 100%;
  height: 100%;
`;

const Spinner = ({ width, height, color, visible }) => {
  return (
    <div>
      {visible && (
        <TransLayer>
          <Grid
            color={color}
            height={height}
            width={width}
            wrapperStyle={{
              position: 'absolute',
              zIndex: 10000,
              left: '50%',
              top: '50%',
              marginLeft: -width / 2 + 'px',
              marginTop: -height / 2 + 'px',
            }}
            ariaLabel="loading-indicator"
          />
        </TransLayer>
      )}
    </div>
  );
};

/* 기본값 정의 */
Spinner.defaultProps = {
  visible: false,
  color: '#06f',
  width: 100,
  height: 100,
};

/* 데이터 타입 설정 */
Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Spinner;
