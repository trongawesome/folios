import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";

import Section from "@components/Section";
import Logo from "@components/Logo";

import Icons from "@icons";
import mediaqueries from "@styles/media";
import {
  getWindowDimensions,
  getBreakpointFromTheme,
} from "@utils";

const siteQuery = graphql`
  {
    sitePlugin(name: { eq: "@narative/gatsby-theme-novela" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
  }
`;

const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};

const NavigationHeader: React.FC<{}> = () => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("/");
  const { sitePlugin } = useStaticQuery(siteQuery);

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const { rootPath, basePath } = sitePlugin.pluginOptions;

  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const isNotPaginated = !location.pathname.includes("/page/");

    setShowBackArrow(
      previousPathWasHomepage && isNotPaginated && width <= phablet,
    );
    setPreviousPath(prev);
  }, []);

  return (
    <Container>
      <Section narrow>
        <NavContainer>

          <NavControlsLeft>
            <NavLink to={`/`} title={`All portfolios`} activeClassName="active" >
              Portfolios
            </NavLink>
            <NavLink to={`/case-studies`} title={`Case studies`} activeClassName="active" >
              Case studies
            </NavLink>
          </NavControlsLeft>

          <LogoLink
            to={rootPath || basePath}
            data-a11y="false"
            title="Navigate back to the homepage"
            aria-label="Navigate back to the homepage"
            back={showBackArrow ? "true" : "false"}
          >
            {showBackArrow && (
              <BackArrowIconContainer>
                <Icons.ChevronLeft fill={fill} />
              </BackArrowIconContainer>
            )}
            <Logo fill={fill} />
            <Hidden>Navigate back to the homepage</Hidden>
          </LogoLink>

          <NavControlsRight>
            <NavLink to={`/journal`} title={`Journal`} activeClassName="active" >
              Journal
            </NavLink>
            <NavLink to={`/about`} title={`About`} activeClassName="active" >
              About
            </NavLink>
            {/* <DarkModeToggle /> */}
          </NavControlsRight>
        </NavContainer>
      </Section>
    </Container>
  );
};

export default NavigationHeader;

const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: 1000;
  margin-bottom: -112px;
`;

const NavContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-gap: 32px;
  padding: 16px 0;
  
`;

const NavLink = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  margin-left: 32px;

  ${mediaqueries.phablet`
    font-size: 14px;
    line-height: 14px;
    margin-left: 16px;
  `}

  &:hover {
    color: ${p => p.theme.colors.accent};
  }
  
  &.active {
    color: ${p => p.theme.colors.accent};
  }
`;

const LogoLink = styled(Link)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: ${p => (p.back === "true" ? "-54px" : 0)};

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`;

const NavControlsLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-self: end;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`;

const NavControlsRight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-self: start;

  ${mediaqueries.phablet`
    right: -5px;
  `}

  & a:first-child {
    margin-left: 0;
  }
`;

const ButtonExit = styled.button`
  margin-left: 10px;
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 4px;


    &:hover {
      opacity: 0.5;
    }
  `}
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease;
`;

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const HideOnMobile = styled.div`
  ${mediaqueries.phablet`
    display: none;
  `}
`;