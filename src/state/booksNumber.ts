import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const state = atom<number>({ key: "booksNumberState", default: 0 });

const valueSelector = selector({
  key: "booksNumberStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const booksNumberState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
