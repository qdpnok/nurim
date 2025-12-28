// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 로컬 스토리지에서 장바구니 데이터 불러오기 (새로고침 해도 유지되도록)
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 장바구니 추가
  const addToCart = (item) => {
    setCartItems((prev) => [
      ...prev,
      { ...item, id: Date.now(), checked: true },
    ]);
    // id는 고유값 생성을 위해 Date.now() 사용
  };

  // 장바구니 삭제
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 수량 변경
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // 체크박스 토글
  const toggleCheck = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // 전체 선택/해제
  const toggleAllCheck = (type, isAllChecked) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.type === type ? { ...item, checked: !isAllChecked } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCheck,
        toggleAllCheck,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
