import { atom, useAtom } from "jotai";
import { Session } from "next-auth";
import { selectColorsList } from "@/tailwind.config";

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

type selectionToolsStateType = {
  nowColor: string
  text: string
  content: string
  tags: string[]
}

const selectToolsState = atom({
  nowColor: selectColorsList[0],
  text: '',
  content: '',
  tags: [] as string[]
})

export const selectToolsStateAtom = atom(
  (get) => get(selectToolsState),
  (get, set, newSelectToolsState: selectionToolsStateType) => {
      set(selectToolsState, newSelectToolsState)
  }
) 
