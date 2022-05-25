/**
 * @filename    : KakaoMap.js
 * @author      : 전우열
 * @description : 카카오 Maps API 사용하여 화면에 충전소를 표시
 */

/* global kakao */
import React, { useEffect } from 'react';

import '../scss/KakaoMap.scss';
import imgSrc from '../img/marker.png';

const { kakao } = window;

const KakaoMap = ({ data }) => {
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(
        data[0].REFINE_WGS84_LAT, // 위도
        data[0].REFINE_WGS84_LOGT, // 경도
      ), // 지도 중심 좌표
      level: 7, // 지도 확대 레벨
    };
    let map = new kakao.maps.Map(container, options); // 지도를 생성한다.
    let imgSize = new kakao.maps.Size(45, 45); // 이미지 사이즈
    let markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize); // 이미지를 생성한다.

    for (let i = 0; i < data.length; i++) {
      // 마커를 생성한다.
      let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          data[i].REFINE_WGS84_LAT,
          data[i].REFINE_WGS84_LOGT,
        ),
        title: data[i].CHRGSTATN_NM,
        image: markerImg,
        map: map,
      });

      let content = `
      <div class="infoWindowContainer">
        <div class="infoWindow">
          <div class="infoTitle">
            <b>충전소명: </b>${data[i].CHRGSTATN_NM}
          </div>
          <div class="address">
            <b>주소: </b>${data[i].REFINE_ROADNM_ADDR}
          </div>
        </div>
      </div>
      `; // 인포 윈도우 표시 내용

      let position = new kakao.maps.LatLng(
        data[i].REFINE_WGS84_LAT,
        data[i].REFINE_WGS84_LOGT,
      ); // 인포 윈도우 표시 위치

      // 인포 윈도우를 생성한다.
      let infoWindow = new kakao.maps.CustomOverlay({
        content,
        position,
      });

      // 마우스를 올리면 인포 윈도우가 나타난다.
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infoWindow.setMap(map);
      });

      // 마우스가 나가면 인포 윈도우가 사라진다.
      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infoWindow.setMap(null);
      });
    }
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default KakaoMap;
