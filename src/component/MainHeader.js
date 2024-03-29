import React, { useState } from "react";
import ReactDOM from "react-dom";
import MainNavigation from "./MainNavigation";
import ProfileSec from "./ProfileSec";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { ReactComponent as HamburgerIcon } from "../files/icons/menu_FILL0_wght400_GRAD0_opsz48.svg";
import classes from "./MainHeader.module.css";
import { useSelector } from "react-redux";
import CustomLink from "./CustomLink";
import Overlay from "../ui/Overlay";

const MainHeader = () => {
  const uid = useSelector((state) => state.auth.uid);
  const navigate = useNavigate();
  const [navIsOpen, setNavIsOpen] = useState(false);
  const location = useLocation();
  const fullURL = location.pathname + location.search;
  const isInAuthPages =
    fullURL === "/auth/?mode=login" || fullURL === "/auth/?mode=signup";

  function openNavOverlayHandler() {
    setNavIsOpen(true);
  }

  function closeNavOverlayHandler() {
    setNavIsOpen(false);
  }

  return (
    <header className={classes["main-header"]}>
      <div className={classes["menubtn-logo-container"]}>
        <div className={classes["main-nav-container"]}>
          <input
            type="checkbox"
            id="show-menu-cbx"
            // defaultChecked={navIsOpen}
            checked={navIsOpen}
            onChange={() => {}}
          />
          <label
            className={classes["show-menu-label"]}
            htmlFor="show-menu-cbx"
            onClick={openNavOverlayHandler}
          >
            <HamburgerIcon />
          </label>
          {ReactDOM.createPortal(
            <Overlay
              className="main-nav-overlay"
              overlayIsOpen={navIsOpen}
              onClickBackdrop={closeNavOverlayHandler}
            >
              <MainNavigation onCloseNav={closeNavOverlayHandler} />
            </Overlay>,
            document.getElementById("overlay")
          )}
        </div>
        <div className={classes["logo"]}>
          <h1>
            <Link to="/">ایزی بیت</Link>
          </h1>
        </div>
        <MainNavigation
          className={"min-1030"}
          onCloseNav={closeNavOverlayHandler}
        />
      </div>
      <div className={classes["user-links"]}>
        {uid && <ProfileSec />}
        {!uid && !isInAuthPages && (
          <div className={classes["header-auth-links"]}>
            <CustomLink to="auth/?mode=login" className="header-login">
              ورود
            </CustomLink>
            <CustomLink to="auth/?mode=signup" className="golden-link">
              ثبت نام
            </CustomLink>
          </div>
        )}
        {isInAuthPages && !uid && (
          <CustomButton
            className="golden-btn"
            onClick={() => {
              // navigate(-1);
              navigate("/");
            }}
          >
            بازگشت
          </CustomButton>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
