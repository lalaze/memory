import { atom, useAtom } from "jotai";
import { Session } from "next-auth";

export const session = atom<Session | null>(null);

export const showSession = atom(
    (get) => get(session),
    (_get, set, newSession: Session | null) => {
        set(session, newSession);
    }
);

export const search = atom<string>("")

export const showSearch = atom(
    (get) => get(search),
    (_get, set, newSearch: string) => {
        set(search, newSearch);
    }
)

const navFunctionAtom = atom({ fn: () => { } })

export const navFnAtom = atom(
    (get) => get(navFunctionAtom),
    (get, set, newFn: any) => {
        set(navFunctionAtom, { fn: newFn })
    }
)

