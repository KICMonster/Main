import React from 'react';
import Gam from "../../img/gam.jpg";
import Guaka from "../../img/guaka.jpg";
import Fruit from "../../img/fruit.jpg";
import Lagu from "../../img/lagu.jpg";
import Nacho from "../../img/nacho.jpg";
import "./styles/SideMenuMainPage.css";

function SideMenuMainPage() {
  const sideMenus = [
    { id: 1, name: "감바스 알 아히요", image: Gam, link: "" },
    { id: 2, name: "과일 플래터", image: Fruit, link: "" },
    { id: 3, name: "과카몰리", image: Guaka, link: "" },
    { id: 4, name: "나초 치즈", image: Nacho, link: "" },
    { id: 5, name: "라구 파스타", image: Lagu, link: "" },
  ];

  // 배열을 섞어서 첫 4개를 선택하는 함수
  const getRandomMenus = (menus) => {
    const shuffled = [...menus].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const randomMenus = getRandomMenus(sideMenus);

  return (
    <div className="side-menu-container">
      {randomMenus.map((menu) => (
        <div key={menu.id} className="side-menu-item">
          <a href={menu.link} target="_blank" rel="noopener noreferrer">
            <img src={menu.image} alt={menu.name} />
            <p>{menu.name.length > 6 ? menu.name.slice(0, 6) + "..." : menu.name}</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default SideMenuMainPage;
