import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { setIsDarkModeCookiesValue } from "@/utils";

const state = atom<boolean>({
  key: "isDarkModeState",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        setIsDarkModeCookiesValue(newValue);
      });
    }
  ]
});

const valueSelector = selector({
  key: "isDarkModeStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

export const isDarkModeState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector)
};
