import React, { useEffect } from "react";

const { kakao } = window;

function Marker({ map, position }) {
  useEffect(() => {
    if (map) {
      const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 맵에 마커를 추가
      marker.setMap(map);

      // 클린업 함수로 마커를 삭제
      return () => marker.setMap(null);
    }
  }, [map, position]);

  return null;
}

export default Marker;
