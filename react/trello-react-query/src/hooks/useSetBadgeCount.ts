import { useEffect } from "react";

const useSetBadgeCount = <T>(items: Array<T>) => {
    useEffect(() => {
        if (!Array.isArray(items)) {
            return;
        }

        console.log(">>> update count in tab");
        // client?.setBadgeCount(items.length);
    }, [items]);
};

export { useSetBadgeCount };
