import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("Компонент ProgressBar", () => {
  it("рендерится с правильными пропсами (max и value)", () => {
    const handleChange = jest.fn();
    render(<ProgressBar max={200} value={50} step={1} onChange={handleChange} />);
    
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("max", "200");
    expect(slider).toHaveAttribute("value", "50");
  });

  it("вызывает onChange при перемотке", () => {
    const handleChange = jest.fn();
    render(<ProgressBar max={200} value={50} step={1} onChange={handleChange} />);
    
    const slider = screen.getByRole("slider");
    
    fireEvent.change(slider, { target: { value: "100" } });
    expect(handleChange).toHaveBeenCalled();
  });


  it("рендерится корректно с max=0 (крайний случай до загрузки аудио)", () => {
    const handleChange = jest.fn();
    // Передаем 0, чтобы код прошел по ветке `|| 0`
    render(<ProgressBar max={0} value={0} step={1} onChange={handleChange} />);
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("max", "0");
  });
});