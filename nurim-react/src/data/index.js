// src/data/index.js (새로 만들기)

// 1. 쪼개진 파일들을 import 합니다.
import { productTvSpecs } from "./productTv";
import { productRefSpecs } from "./productRef";
import { productAcSpecs } from "./productAc";
import { productAirSpecs } from "./productAir";
import { productWtSpecs } from "./productWt";

// 2. 하나의 큰 객체로 묶어서 export 합니다.
// 이때 사용하는 키 이름(예: productTv)이 나중에 URL의 'category' 부분이 됩니다.
export const allProductSpecs = {
  productTvSpecs: productTvSpecs, // URL에 productTv라고 입력하면 이 데이터를 씀
  productRefSpecs: productRefSpecs, // URL에 productRef라고 입력하면 이 데이터를 씀
  productAcSpecs: productAcSpecs,
  productAirSpecs: productAirSpecs,
  productWtSpecs: productWtSpecs,
};
