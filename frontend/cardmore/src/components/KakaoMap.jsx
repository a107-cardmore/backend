import React, { useState, useRef, useEffect } from "react";

const { kakao } = window;

function KakaoMap({ onMapLoad }) {
  useEffect(() => {
    // Kakao Maps API 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    // 스크립트 로드 완료 후 실행
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 맵 로드 완료 후 부모 컴포넌트에 map 객체 전달
        onMapLoad(map);
      });
    };

    document.head.appendChild(script);
  }, [onMapLoad]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
}

export default KakaoMap;
