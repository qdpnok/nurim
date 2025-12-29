import React from "react";
import styled from "styled-components";
import { PageTitle } from "../../styles/AdminStyles";

const AdminProductRegister = () => {
  return (
    <>
      <PageTitle>상품 정보 입력</PageTitle>

      <FormContainer>
        <FormRow>
          <FormGroup>
            <label>상품명 *</label>
            <input type="text" placeholder="상품명을 입력하세요" />
          </FormGroup>
          <FormGroup>
            <label>카테고리 *</label>
            <select>
              <option>카테고리 선택</option>
            </select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <label>정상가격 *</label>
            <input type="number" placeholder="0" />
          </FormGroup>
          <FormGroup>
            <label>할인가격</label>
            <input type="number" placeholder="0" />
          </FormGroup>
          <FormGroup>
            <label>재고수량 *</label>
            <input type="number" placeholder="0" />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label>상품 이미지</label>
          <ImageUploadBox>
            <div className="icon">⬆</div>
            <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
            <button>파일 선택</button>
          </ImageUploadBox>
        </FormGroup>

        <FormGroup>
          <label>상품 설명 *</label>
          <textarea placeholder="상품에 대한 자세한 설명을 입력하세요"></textarea>
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label>브랜드</label>
            <input type="text" placeholder="브랜드명" />
          </FormGroup>
          <FormGroup>
            <label>SKU</label>
            <input type="text" placeholder="SKU 코드" />
          </FormGroup>
        </FormRow>

        <BtnGroup>
          <button className="temp">임시저장</button>
          <button className="save">상품 등록</button>
        </BtnGroup>
      </FormContainer>
    </>
  );
};

export default AdminProductRegister;

// --- 스타일 ---
const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  label {
    font-weight: bold;
    font-size: 14px;
    color: #333;
  }
  input,
  select,
  textarea {
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #f9f9f9;
    width: 100%;
  }
  textarea {
    height: 100px;
    resize: none;
  }
`;

const ImageUploadBox = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #888;
  .icon {
    font-size: 30px;
    margin-bottom: 10px;
  }
  button {
    margin-top: 15px;
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  button {
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }
  .temp {
    background: white;
    border: 1px solid #ddd;
    color: #555;
  }
  .save {
    background: #375a55;
    color: white;
  }
`;
