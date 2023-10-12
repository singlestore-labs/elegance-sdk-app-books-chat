import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Book } from "@/root/types";

const state = atom<Book | undefined>({ key: "bookToReviewState", default: undefined });

const valueSelector = selector({
  key: "bookToReviewStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const bookToReviewState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
