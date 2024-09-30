import React, { useState, useRef, useEffect, useCallback } from "react";
import "../App.css"; // 스타일을 위한 CSS 파일
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { css } from "@emotion/css";

const MapPageStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative; /* 메뉴바를 이동시키기 위해 상대적 위치로 설정 */
  //overflow: hidden; /* 스크롤바를 숨김 */
`;

const InputField = styled.input`
  position: absolute;
  top: 1.5rem;
  border: solid #d9d9d9 0.1rem;
  border-radius: 0.5rem;
  width: 90%;
  height: 3rem;
  z-index: 2;
  font-size: 2rem;
  &:focus {
    /* outline: red 1px; */
  }
  box-shadow: 0 4px 4px rgb(0, 0, 0, 0.25);
`;

const MenuBar = styled.div`
  position: absolute;
  bottom: ${(props) => props.position}px;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
`;

const DragHandle = styled.div`
  width: 3rem;
  height: 0.3rem;
  background-color: #c7c7c7;
  border-radius: 0.3rem;
  margin: 0.6rem auto;
`;

const MenuContent = styled.div`
  padding: 0.6rem;
  text-align: center;
`;

const CategoryContainer = styled.div`
  position: absolute;
  top: 5.5rem;
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 2;
`;

const CategoryTag = styled.div`
  --height: 2rem;
  background-color: white;
  line-height: var(--height);
  height: var(--height);
  padding: 0 1rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  color: #979797;
  box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
`;
const { kakao } = window;

const MapPage = () => {
  const [position, setPosition] = useState(0); // 메뉴바의 초기 위치
  // useEffect(() => {
  //   console.log("position", position);
  // }, [position]);
  const isDragging = useRef(false);
  const offsetY = useRef(0); // 클릭한 지점과 menubar의 bottom 차이를 저장
  const animationFrame = useRef(null); // 애니메이션 프레임 저장

  useEffect(() => {
    const initialPosition = -window.innerHeight * 0.8;
    setPosition(initialPosition);

    // 문서 전체에서 mouseup을 감지하여 드래그를 중지
    const handleDocumentMouseUp = () => {
      isDragging.current = false;
      cancelAnimationFrame(animationFrame.current);
    };

    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentMouseUp);
    };
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      isDragging.current = true;
      offsetY.current = window.innerHeight - e.clientY - position; // 클릭한 위치와 메뉴바 하단 간의 차이 계산
      // console.log("newPosition", position);
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging.current) {
        cancelAnimationFrame(animationFrame.current); // 이전 애니메이션을 취소

        animationFrame.current = requestAnimationFrame(() => {
          let newPosition = window.innerHeight - e.clientY - offsetY.current;
          // 메뉴바가 화면 아래로 내려가는 것을 방지 (bottom이 0 이상일 때)
          if (newPosition > 0) {
            newPosition = 0;
          }

          // 메뉴바가 화면의 가장 위로 올라올 수 있도록 제한
          if (newPosition < -window.innerHeight + 100) {
            newPosition = -window.innerHeight + 100;
          }

          setPosition(newPosition);
        });
      }
    },
    [position]
  );

  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    offsetY.current = window.innerHeight - e.touches[0].clientY - position; // 터치 시작 위치와 메뉴바 하단 간의 차이 계산
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isDragging.current) {
      cancelAnimationFrame(animationFrame.current); // 이전 애니메이션을 취소

      animationFrame.current = requestAnimationFrame(() => {
        let newPosition =
          window.innerHeight - e.touches[0].clientY - offsetY.current;
        // 메뉴바가 화면 아래로 내려가는 것을 방지
        if (newPosition > 0) {
          newPosition = 0;
        }
        // 메뉴바가 화면의 가장 위로 올라올 수 있도록 제한
        if (newPosition < -window.innerHeight + 100) {
          newPosition = -window.innerHeight + 100;
        }
        setPosition(newPosition);
      });
    }
  }, []);

  //------------ 여기까지 MenuBar 관련 함수 -----------------
  const [keyword, setKeyword] = useState("");
  const [categoryTags, setCategoryTags] = useState([
    "카페",
    "음식점",
    "편의점",
    "주유소",
  ]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const [map, setMap] = useState();

  useEffect(() => {
    // if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        console.log("marker data : ", data);
        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 2 });

    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
    console.log("kakao ps", ps);
  }, [map, keyword]);

  //------------ 여기까지 Keyword 관련 함수 -----------------

  const getSearchResult = () => {};

  const handleMapLoad = useCallback((loadedMap) => {
    setMap(loadedMap); // 맵 객체를 상태로 저장
    console.log("loadedMap", loadedMap);
  }, []);

  // useEffect(() => {
  //   console.log("map", map);
  //   if (map) {
  //     console.log("in map", map);
  //     getSearchResult();
  //   }
  // }, [map]);

  return (
    <MapPageStyle onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      <InputField onChange={handleKeyword} />
      <CategoryContainer>
        {categoryTags.map((text) => (
          <CategoryTag>{text}</CategoryTag>
        ))}
      </CategoryContainer>
      {/* <KakaoMap onMapLoad={handleMapLoad} /> */}
      <Map
        center={{ lat: 37.554371328, lng: 126.9227542239 }}
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
        onCreate={setMap}
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 33.55635,
            lng: 126.795841,
          }}
        />
        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
          <div
            className={css`
              margin-top: 25px;
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
        </CustomOverlayMap>
      </Map>
      <MenuBar
        position={position}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <DragHandle />
        <div
          className={css`
            padding: 0.6rem;
            display: flex;
            /* align-items: center; */
            justify-content: center;
          `}
        >
          <div
            className={css`
              width: 80%;

              /* height: 13.627rem; */
              background-color: white;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <div
              className={css`
                display: flex;
                flex-direction: row;
              `}
            >
              <div
                className={`
            
          `}
              >
                카즈야
              </div>
              {"      "}
              <div
                className={`
            
          `}
              >
                음식점
              </div>
            </div>
            <div
              className={`
            
          `}
            >
              서울 강남구 테헤란로27길 8-4 늘봄빌딩
            </div>
          </div>
        </div>
      </MenuBar>
      <NavBar isSelected={"Map"} />
    </MapPageStyle>
  );
};

export default React.memo(MapPage);
