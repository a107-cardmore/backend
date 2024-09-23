import React, { useState, useRef, useEffect } from "react";
import "../App.css"; // 스타일을 위한 CSS 파일
import KakaoMap from "../components/KakaoMap";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const MapPageStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative; /* 메뉴바를 이동시키기 위해 상대적 위치로 설정 */
  overflow: hidden; /* 스크롤바를 숨김 */
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
  const isDragging = useRef(false);
  const offsetY = useRef(0); // 클릭한 지점과 menubar의 bottom 차이를 저장
  const animationFrame = useRef(null); // 애니메이션 프레임 저장
  const [keyword, setKeyword] = useState("");
  const [categoryTags, setCategoryTags] = useState([
    "카페",
    "음식점",
    "편의점",
    "주유소",
  ]);

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

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offsetY.current = window.innerHeight - e.clientY - position; // 클릭한 위치와 메뉴바 하단 간의 차이 계산
  };

  const handleMouseMove = (e) => {
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
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    offsetY.current = window.innerHeight - e.touches[0].clientY - position; // 터치 시작 위치와 메뉴바 하단 간의 차이 계산
  };

  const handleTouchMove = (e) => {
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
  };

  const handleKeyword = (e) => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  };

  const getSearchResult = () => {
    var ps = new kakao.maps.services.Places(document.getElementById("map"));
    console.log("pspsps", ps);
  };

  const [map, setMap] = useState(null);

  const handleMapLoad = (loadedMap) => {
    setMap(loadedMap); // 맵 객체를 상태로 저장
    console.log("loadedMap", loadedMap);
  };

  useEffect(() => {
    console.log("map", map);
    if (map) {
      console.log("in map", map);
      getSearchResult();
    }
  }, [map]);

  return (
    <MapPageStyle onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      <InputField onChange={handleKeyword} />
      <CategoryContainer>
        {categoryTags.map((text) => (
          <CategoryTag>{text}</CategoryTag>
        ))}
      </CategoryContainer>
      <KakaoMap onMapLoad={handleMapLoad} />
      <MenuBar
        position={position}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <DragHandle />
        <MenuContent>
          <p>Menu Bar</p>
        </MenuContent>
      </MenuBar>
      <NavBar />
    </MapPageStyle>
  );
};

export default MapPage;
