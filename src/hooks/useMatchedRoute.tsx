import {Box, Fade, Grow, Slide} from "@mui/material";
import React from "react";
import {matchPath, Route, Routes, useLocation, RouteMatch} from "react-router-dom";
import {PathParams, TRoute} from "../types/global";
import {validateParams} from "../utils/router";

interface UseMatchedRouteOptions {
    notFoundComponent?: React.FC;
    matchOnSubPath?: boolean;
    transition?:
        | "none"
        | "fade"
        | "grow"
        | "slide-up"
        | "slide-down"
        | "slide-left"
        | "slide-right";
}

const useMatchedRoute = (
    routes: ReadonlyArray<TRoute>,
    fallbackComponent?: React.FC,
    options?: UseMatchedRouteOptions
): {
    route: TRoute;
    params: PathParams | null;
    MatchedElement: JSX.Element;
} => {
    const {notFoundComponent, matchOnSubPath, transition = "fade"} =
    options || {};
    const location = useLocation();
    // `exact`, `sensitive` and `strict` options are set to true
    // to ensure type safety.
    const results = routes
        .map((route: TRoute): {
            route: TRoute;
            match: any | null;
        } => ({
            route,
            match: matchPath(location.pathname, route.path)
        }))
        .filter(({match}) => !!match && (matchOnSubPath ? true : match.isExact));
    const [firstResult] = results;
    const {match, route} = firstResult || {};
    const Fallback = fallbackComponent;
    const NotFound = notFoundComponent || (() => <>not found</>);

    interface TransitionProps {
        match: RouteMatch | null | boolean;
        children: React.ReactNode;
    }

    const Transition: React.FC<TransitionProps> = React.useMemo(() => {
        if (transition === "fade") {
            const FadeTransition: React.FC<TransitionProps> = ({
                                                                   children,
                                                                   match
                                                               }) => (
                <Fade in={!!match} timeout={300} unmountOnExit>
                    <Box height={"100%"}>{children}</Box>
                </Fade>
            );

            return FadeTransition;
        }

        if (transition === "grow") {
            const GrowTransition: React.FC<TransitionProps> = ({
                                                                   children,
                                                                   match
                                                               }) => (
                <Grow in={match ? true : false} timeout={300} unmountOnExit>
                    <Box height={"100%"}>{children}</Box>
                </Grow>
            );

            return GrowTransition;
        }

        if (transition.startsWith("slide")) {
            const [, direction] = transition.split("-");
            const SlideTransition: React.FC<TransitionProps> = ({
                                                                    children,
                                                                    match
                                                                }) => (
                <Slide
                    in={match ? true : false}
                    direction={direction as "left" | "right" | "up" | "down"}
                    timeout={300}
                    unmountOnExit
                >
                    <Box height={"100%"}>{children}</Box>
                </Slide>
            );

            return SlideTransition;
        }
        return (({children}) => children) as React.FC<TransitionProps>;
    }, [transition]) as React.FC<TransitionProps>;

    return {
        route: route,
        params:
            match && validateParams(route.path, match.params) ? match.params : {},
        MatchedElement: (
            <Routes>
                {matchOnSubPath &&
                    routes.map(({path, Component: RouteComponent}, i) => (
                        <Route key={path + "root"} path={path} element={
                            <Transition match={match}>
                                <RouteComponent/>
                            </Transition>
                        }/>
                    ))}
                {routes.map(({path, Component: RouteComponent}, i) => (
                    <Route key={path + "root"} path={path} element={
                        <Transition match={match}>
                            <RouteComponent/>
                        </Transition>
                    }/>
                ))}
                {Fallback && (
                    <Route path="*" element={
                        <Transition match={true}>
                            <Fallback/>
                        </Transition>
                    }/>
                )}
                {!Fallback && (
                    <Route path="*" element={
                        <Transition match={true}>
                            <NotFound/>
                        </Transition>
                    }/>
                )}
            </Routes>
        )
    };
};

export default useMatchedRoute;
