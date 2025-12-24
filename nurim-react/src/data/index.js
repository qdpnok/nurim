// 1. 쪼개진 파일들을 import 합니다.
// (나머지 파일들: productTv, productRef 등도 같은 폴더에 있어야 합니다)
import { productTvSpecs } from "./productTv";
import { productRefSpecs } from "./productRef";
import { productAcSpecs } from "./productAc"; // 방금 만든 파일을 여기서 불러옵니다.
import { productAirSpecs } from "./productAir";
import { productWtSpecs } from "./productWt";

// 2. 하나의 큰 객체로 묶어서 export 합니다.
export const allProductSpecs = {
  productTvSpecs, // 이름이 같으면 : 생략 가능 (ES6 문법)
  productRefSpecs,
  productAcSpecs,
  productAirSpecs,
  productWtSpecs,
};
