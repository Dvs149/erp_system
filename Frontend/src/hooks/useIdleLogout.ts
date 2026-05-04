import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIME = 60 * 60 * 1000; // 1 minute

export const useIdleLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let timeout: any;

        const logout = () => {
            sessionStorage.removeItem("token");
            navigate("/login", { replace: true });
        };

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(logout, IDLE_TIME);
        };

        const events = ["mousemove", "keydown", "click", "scroll"];

        events.forEach((event) =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer(); // start timer

        return () => {
            clearTimeout(timeout);
            events.forEach((event) =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [navigate]);
};