import React, { useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { css } from "@emotion/css";

const { kakao } = window;

function KakaoMap({ onMapLoad }) {
  useEffect(() => {
    // Kakao Maps API 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    console.log(
      "process.env.REACT_APP_KAKAO_API_KEY",
      process.env.REACT_APP_KAKAO_API_KEY
    );

    // 스크립트 로드 완료 후 실행
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.451475, 126.570528), // 지도의 중심좌표
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        // 맵 로드 완료 후 부모 컴포넌트에 map 객체 전달
        // console.log("[IN ONLOAD] : map", map);
        onMapLoad(map);

        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(33.450701, 126.570667),
        });
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        const InfoOverlay = () => {
          return (
            <div
              className={css`
                margin-top: 60px;
                padding: 5px;
                background-color: white;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: row;
              `}
            >
              {[
                { bgColor: "#FBB89D", inColor: "#FE4437" },
                { bgColor: "#FEF33F", inColor: "#F8BF00" },
                { bgColor: "#D8F068", inColor: "#00B451" },
              ].map((data) => (
                <div
                  className={css`
                    color: ${data.inColor};
                    border: 0.1rem solid ${data.inColor};
                    background-color: ${data.bgColor};
                    border-radius: 0.3rem;
                    margin: 0 0.2rem;
                    padding: 0.1rem 0.2rem;
                  `}
                >
                  10%
                </div>
              ))}
            </div>
          );
        };
        var coContent = ReactDOMServer.renderToString(<InfoOverlay />);

        // 인포윈도우를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
          content: coContent,
          map: map,
          position: marker.getPosition(),
        });
        customOverlay.setMap(map);
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

export default React.memo(KakaoMap);
