"use client";

import { createContext, useContext } from "react";
import { Session } from "next-auth";

interface SessionContextProps {
    session: Session | null;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export function SessionProvider({ session, children }: { session: Session | null, children: React.ReactNode }) {
    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export function useSessionContext() {
    const context = useContext(SessionContext);
    if (!context) throw new Error("useSessionContext must be used within a SessionProvider");
    return context;
};
