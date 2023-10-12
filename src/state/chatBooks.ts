import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Book } from "@/root/types";

const state = atom<Book[]>({
  key: "chatBooksState",
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      onSet(books => {
        setSelf([...books].sort((a, b) => a.title.localeCompare(b.title)));
      });
    }
  ]
});

const valueSelector = selector({
  key: "chatBooksStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const chatBooksState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
