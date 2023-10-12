import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Book } from "@/root/types";

const state = atom<Book[]>({ key: "recommendedBooksState", default: [] });

const valueSelector = selector({
  key: "recommendedBooksStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const recommendedBooksState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
