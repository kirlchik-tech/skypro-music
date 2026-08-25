import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("Компонент SearchBar", () => {
  it("рендерится корректно", () => {
    const setSearchValue = jest.fn();
    render(<SearchBar searchValue="" setSearchValue={setSearchValue} />);
    
    // Проверяем, что инпут появился на экране
    const input = screen.getByPlaceholderText("Поиск");
    expect(input).toBeInTheDocument();
  });

  it("вызывает функцию setSearchValue при вводе текста", () => {
    const setSearchValue = jest.fn();
    render(<SearchBar searchValue="" setSearchValue={setSearchValue} />);
    
    const input = screen.getByPlaceholderText("Поиск");
    
    // Эмулируем ввод текста пользователем
    fireEvent.change(input, { target: { value: "Rock" } });
    
    // Проверяем, что функция обновления стейта вызвалась
    expect(setSearchValue).toHaveBeenCalledTimes(1);
  });
});