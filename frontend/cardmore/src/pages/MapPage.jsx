import React, { useState, useRef, useEffect, useCallback } from "react";
import "../App.css"; // 스타일을 위한 CSS 파일
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
  padding-top: 0.3rem;
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
  console.log("[MAPPAGE RENDERING]");
  const [position, setPosition] = useState(0); // 메뉴바의 초기 위치
  const [nowLocation, setNowLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 37.554371328,
    lng: 126.9227542239,
  });
  const [markers, setMarkers] = useState([]);
  console.log("[MARKER] : ", markers);

  const [selectedCategory, setSelectedCategory] = useState("카페");

  useEffect(() => {
    const initialPosition = -window.innerHeight * 0.8;
    setPosition(initialPosition);

    // geolocation을 이용해서 접속 위치를 얻어옴
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNowLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          console.log(
            "lat, lng",
            position.coords.latitude,
            position.coords.longitude
          );
          setMapCenter({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
        },
        (err) => {
          setNowLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setNowLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }

    // 맵 중심 위치 현재 위치로 변경
  }, []);

  const clickMenuBar = (e) => {
    e.stopPropagation();
    const upPosition = -window.innerHeight * 0.3;
    setPosition(upPosition);
  };

  const clickMap = (e) => {
    const downPosition = -window.innerHeight * 0.8;
    setPosition(downPosition);
  };

  //------------ 여기까지 MenuBar 관련 함수 -----------------
  const [keyword, setKeyword] = useState("");
  // const [placeData, setPlaceData] = useState([]);
  const [categoryTags, setCategoryTags] = useState([
    "카페",
    "음식점",
    "편의점",
    "주유소",
  ]);
  const [clickedPlace, setClickedPlace] = useState(null);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const [map, setMap] = useState();
  const mapRef = useRef(null);
  const nextButton = useRef(null);

  const removeMarker = () => {
    // for (var i = 0; i < markers.length; i++) {
    //   markers[i].setMap(null);
    // }
    setMarkers([]);
  };

  useEffect(() => {
    console.log("[map]", map);
    // if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        console.log("marker data : ", data);
        removeMarker();
        setMarkers(data);
        for (var i = 0; i < data.length; i++) {
          // displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 2 });

    // function displayMarker(place) {
    //   // 마커를 생성하고 지도에 표시합니다
    //   var marker = new kakao.maps.Marker({
    //     map: map,
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });
    //   // 마커에 클릭이벤트를 등록합니다
    //   kakao.maps.event.addListener(marker, "click", function () {
    //     setClickedPlace(place);
    //   });
    //   markers.push(marker);
    // }
    console.log("kakao ps", ps);
  }, [map, keyword]);

  //------------ 여기까지 Keyword 관련 함수 -----------------

  // 현재 위치 기준으로 정보 가져오기
  const getPlacesInWindow = () => {
    var ps = new kakao.maps.services.Places(map);
    // 카테고리로 은행을 검색합니다
    let categoryCode = null;
    if (selectedCategory === "카페") {
      categoryCode = "CE7";
    } else if (selectedCategory === "음식점") {
      categoryCode = "FD6";
    } else if (selectedCategory === "문화시설") {
      categoryCode = "CT1";
    } else if (selectedCategory === "대형마트") {
      categoryCode = "MT1";
    } else if (selectedCategory === "편의점") {
      categoryCode = "CS2";
    } else if (selectedCategory === "주유소") {
      categoryCode = "OL7";
    } else {
      throw new Error(`Invalid category: ${selectedCategory}`);
    }
    ps.categorySearch(categoryCode, placesSearchIW, { useMapBounds: true });
    removeMarker();
  };

  const placesSearchIW = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log("marker data : ", data);
      var markers_temp = markers;
      for (var i = 0; i < data.length; i++) {
        markers_temp.push(data[i]);
      }
      setMarkers(markers_temp);
    }
  };

  return (
    <MapPageStyle onClick={clickMap}>
      <InputField onChange={handleKeyword} />
      <CategoryContainer>
        {categoryTags.map((text) => (
          <div
            className={css`
              --height: 2rem;
              background-color: ${selectedCategory === text
                ? "#979797"
                : "white"};
              line-height: var(--height);
              height: var(--height);
              padding: 0 1rem;
              margin-right: 0.5rem;
              border-radius: 1rem;
              color: ${selectedCategory === text ? "white" : "979797"};
              box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
            `}
            onClick={(e) => {
              setSelectedCategory(text);
            }}
          >
            {text}
          </div>
        ))}
      </CategoryContainer>
      {/* <KakaoMap onMapLoad={handleMapLoad} /> */}
      <Map
        center={mapCenter}
        style={{ width: "100%", height: "100vh", zIndex: 1 }}
        onCreate={setMap}
        ref={mapRef}
        onDragEnd={getPlacesInWindow}
      >
        {!nowLocation.isLoading && ( // 현재 위치 빨간 원 모양 마커로 표시
          <MapMarker
            position={nowLocation.center}
            image={{
              src: "/NowLocationIcon.svg",
              size: {
                width: 30,
                height: 30,
              },
              options: {
                offset: {
                  x: 0,
                  y: 0,
                },
              },
            }}
          />
        )}
        {markers.map((markerInfo) => (
          <>
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: markerInfo.y,
                lng: markerInfo.x,
              }}
            />
            <CustomOverlayMap
              position={{ lat: markerInfo.y, lng: markerInfo.x }}
            >
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
          </>
        ))}
      </Map>
      <MenuBar position={position} onClick={clickMenuBar}>
        {/* <DragHandle /> */}
        {clickedPlace && (
          <div
            className={css`
              padding: 0.6rem;
              display: flex;
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
                  width: 100%;
                  justify-content: space-evenly;
                `}
              >
                <div className={``}>{clickedPlace.place_name}</div>
                <div className={``}>{clickedPlace.category_group_name}</div>
              </div>
              <div className={``}>{clickedPlace.road_address_name}</div>
            </div>
          </div>
        )}
      </MenuBar>
      <NavBar isSelected={"Map"} />
    </MapPageStyle>
  );
};

export default React.memo(MapPage);
