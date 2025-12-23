import { productTv } from "./productTv";
import { productRef } from "./productRef";
import { productAc } from "./productAc";
import { productAir } from "./productAir";
import { productWt } from "./productWt";

// 2. 하나의 큰 객체로 묶어서 export 합니다.
// 이때 사용하는 키 이름(예: productTv)이 나중에 URL의 'category' 부분이 됩니다.
export const allProductSpecs = {
  productTv: productTv, // URL에 productTv라고 입력하면 이 데이터를 씀
  productRef: productRef, // URL에 productRef라고 입력하면 이 데이터를 씀
  productAc: productAc,
  productAir: productAir,
  productWt: productWt,
};
