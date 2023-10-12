import { atom, useRecoilState } from "recoil";

const state = atom<boolean>({ key: "recommendedBooksIsLoadingState", default: false });

export const useRecommendedBooksIsLoadingState = () => useRecoilState(state);
