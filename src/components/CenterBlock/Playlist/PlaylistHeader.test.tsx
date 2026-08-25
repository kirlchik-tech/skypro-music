import { render, screen } from "@testing-library/react";
import PlaylistHeader from "./PlaylistHeader";

describe("Компонент PlaylistHeader", () => {
  it("отображает правильные заголовки колонок", () => {
    render(<PlaylistHeader />);
    
    // Проверяем наличие текста (игнорируя регистр)
    expect(screen.getByText(/трек/i)).toBeInTheDocument();
    expect(screen.getByText(/исполнитель/i)).toBeInTheDocument();
    expect(screen.getByText(/альбом/i)).toBeInTheDocument();
  });
});