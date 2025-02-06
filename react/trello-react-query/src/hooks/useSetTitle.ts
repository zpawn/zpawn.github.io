import { useEffect } from "react";

const useSetTitle = (title: string): void => {
    useEffect(() => {
        console.log(">>> update title in tab");
        // client.setTitle(title);
    }, [title]);
};

export { useSetTitle };
