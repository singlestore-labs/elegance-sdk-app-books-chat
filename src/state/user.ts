import { DefaultValue, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "@/root/types";
import { createUser } from "@/root/utils/db";

const state = atom<User>({
  key: "userState",
  default: createUser()
});

const valueSelector = selector({
  key: "userStateValueSelector",
  get: ({ get }) => get(state),
  set: ({ set }, value) => set(state, value)
});

const idSelector = selector({
  key: "userStateIdSelector",
  get: ({ get }) => get(state).id
});

const reviewsSelector = selector({
  key: "userStateReviewsSelector",
  get: ({ get }) => get(state).reviews,
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) return value;
    return set(state, state => ({ ...state, reviews: [...state.reviews, ...value] }));
  }
});

export const userState = {
  atom: state,
  useState: () => useRecoilState(state),
  useValue: () => useRecoilValue(valueSelector),
  useSetValue: () => useSetRecoilState(valueSelector),
  useId: () => useRecoilValue(idSelector),
  useReviews: () => useRecoilValue(reviewsSelector),
  useSetReviews: () => useSetRecoilState(reviewsSelector)
};
