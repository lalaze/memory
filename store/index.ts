import { atom, useAtom } from "jotai";
import { Session } from "next-auth";
import { Selection } from '@/models/selection'
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

type selectionToolsStateType  = Selection & {
  id: string
  x: number
  y: number
}

export const selectToolsState = atom({
  id: '',
  color: selectColorsList[0],
  text: '',
  cfi: '',
  cfiBase: '',
  x: 0,
  y: 0,
  content: '',
  tags: [] as string[],
  bookName: '',
})

export const selectToolsStateAtom = atom(
  (get) => get(selectToolsState),
  (get, set, newSelectToolsState: selectionToolsStateType) => {
    set(selectToolsState, newSelectToolsState)
  }
) 
