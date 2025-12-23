import React from "react";
import styled from "styled-components";

// --- Styled Components ---
const CategoryListContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 150px;
`;

const CategoryItem = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 10px;
  background-color: ${(props) => (props.$active ? "#eefbfd" : "#fff")};
  border: 1px solid ${(props) => (props.$active ? "#356469" : "#e0e0e0")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #356469;
    background-color: #f9f9f9;
  }

  p {
    font-weight: bold;
    font-size: 16px;
    color: ${(props) => (props.$active ? "#356469" : "#333")};
  }
`;

const CategoryImg = styled.img`
  width: auto;
  height: 80px;
  object-fit: contain;
`;

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <CategoryListContainer>
      {categories.map((cat, idx) => (
        <CategoryItem
          key={idx}
          onClick={() => onSelectCategory(cat.name)}
          $active={selectedCategory === cat.name}
        >
          <p>{cat.name}</p>
          <CategoryImg src={cat.img} alt={cat.name} />
        </CategoryItem>
      ))}
    </CategoryListContainer>
  );
};

export default CategoryFilter;
