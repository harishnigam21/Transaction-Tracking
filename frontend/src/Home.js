import { useEffect, useState } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { Nav } from "./Nav";
import { SideBar } from "./SideBar";
import bg1 from "./assets/images/bg1.jpg";
import { ImageCarousel } from "./component_data/ImageSlidebar";
import { nav_item } from "./component_data/nav_item";
import bg2 from "./assets/images/bg2.jpg";
import bg3 from "./assets/images/bg3.jpg";
import bg4 from "./assets/images/bg4.jpg";

export function Home() {
  const location = useLocation();
  const [childPaths, setChildPaths] = useState([]);
  const [screensize, setScreensize] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreensize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const images = [bg1, bg2, bg3, bg4];
  useEffect(() => {
    setChildPaths([]);
    for (let i = 1; i < nav_item().length; i++) {
      setChildPaths((pre) => [...pre, nav_item()[i].path]);
    }
  }, []);
  const hasChildRouteMatch = childPaths.some((pathPattern) =>
    matchPath(pathPattern, location.pathname)
  );
  return (
    <main className="flex flex-col justify-center box-border min-h-screen">
      <header className="fixed top-0 z-10">
        {screensize.width > 720 ? <Nav /> : <SideBar />}
        <p
          id="pops"
          className="hidden pops p-2 text-center text-white font-extrabold bg-black rounded-b-3xl animate-[fromTop_1s_ease]"
        >
          for popping messages
        </p>
      </header>
      {!hasChildRouteMatch ? (
        <article className="intro box-border grow flex flex-col justify-center items-center p-4 text-center animate-[fromUp_1s_ease]">
          <h1 className="text-6xl font-bold pb-4 pt-16">
            Take Control of Your Money
          </h1>
          <h2 className="text-2xl font-bold pb-4">
            Effortlessly Track Spending, Budget Smarter, and Achieve Financial
            Goals
          </h2>
          <p className="md:w-1/2">
            <span className="font-bolder text-2xl text-blue-500">"</span>
            Are you tired of wondering where your money goes each month? Our
            intuitive transaction and expense tracker helps you gain
            crystal-clear insights into your finances. Easily log your income
            and expenses, categorize spending, and visualize your financial
            habits with powerful reports. Start budgeting effectively, identify
            areas to save, and work towards your financial dreams with
            confidence.
            <span className="font-bolder text-2xl text-blue-500">"</span>
          </p>
          <ImageCarousel images={images} autoPlayInterval={5000} />
        </article>
      ) : (
        <article className="pt-16 grow">
          <Outlet />
        </article>
      )}
      <footer className="sticky bottom-0 bg-blue-800 w-full text-center text-white">
        Created by Harish
      </footer>
    </main>
  );
}
