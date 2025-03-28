import { Link, Outlet } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineMenu, AiFillMoon, AiFillSun } from "react-icons/ai";
import Img1 from "../imgs/logo.png";
import Img2 from "../imgs/logow.png";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface Modal {
  name: string;
  to?: string;
}

const Layout = () => {
  const [text, seTtext] = useState("");
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const showingHandler = () => setIsShowing((prev) => !prev);
  const [isDark, setIsDark] = useState(false);
  const darkMode = () => setIsDark((prev) => !prev);

  const modalbtns: Modal[] = useMemo(() => {
    const texts: Modal[] = [
      { name: "로그인", to: "/login" },
      { name: "상품보기", to: "/" },
      { name: "나의정보", to: "/my" },
    ];
    return texts;
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchMessage = useMemo(() => {
    if (text.length === 0) {
      return "검색어가 입력되지 않았어요!";
    }
  }, [text]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (searchMessage) {
        alert(searchMessage);
        return inputRef.current?.focus();
      }
    },
    [searchMessage]
  );
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const getScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, []);

  return (
    <>
      <header
        className={twMerge(
          "border-b border-gray-200 flex p-2.5 gap-x-2.5 bg-white  items-center ",
          scroll >= 100 && "fixed top-0 left-0 w-full z-10"
        )}
      >
        <div className="  justify-between  w-full flex gap-x-4 items-center max-w-300 mx-auto ">
          <div className="flex gap-x-4 items-center flex-1  ">
            <Link to={"/"}>
              <img src={!isDark ? Img1 : Img2} className="h-8 w-25 min-w-25" />
            </Link>
            <form
              className="flex flex-2 border border-gray-400 rounded h-10 justify-between max-w-300  "
              onSubmit={onSubmit}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => seTtext(e.target.value)}
                placeholder="검색어를 입력해주세요. "
                className="text-md outline-0 p-2.5 w-full"
              />
              <button className=" border-l border-border bg-amber-200 rounded-r-xs items-center p-2">
                <SlMagnifier className=" text-xl  " />
              </button>
            </form>
          </div>
          <button
            onClick={darkMode}
            className="border text-2xl p-2 rounded border-gray-300  bg-gray-50"
          >
            {isDark ? (
              <AiFillMoon className="text-yellow-500" />
            ) : (
              <AiFillSun className="text-red-400" />
            )}
          </button>
          <button onClick={showingHandler}>
            <AiOutlineMenu className="text-3xl" />
          </button>
        </div>
      </header>
      {isShowing && (
        <>
          <div className="absolute w-full flex flex-col border-b bg-white  border-border shadow-md">
            <span
              className="absolute top-0 left-0 w-full h-screen "
              onClick={() => setIsShowing(false)}
            />
            <ul className="z-10 bg-white w-full">
              {modalbtns.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to!}
                    className="flex flex-col items-center p-2.5 hover:text-theme"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
