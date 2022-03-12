import { createContext, useContext } from "react";
import { PrerenderData } from "../shared/PrerenderedData";

const ServerDataContext = createContext<unknown>(null);

/** Set prerender data as context. */
const ServerDataProvider = ServerDataContext.Provider;

/**
 * Get server prerendered data
 * @returns The prerendered data if defined, otherwise return Null.
 */
const useServerData = <T>() => {
    const contextData = useContext(ServerDataContext);
    if (contextData) return contextData as T;
    
    const prerenderData =  PrerenderData.readFromDom<T>(true);
    return prerenderData;
}

export { ServerDataProvider, useServerData };