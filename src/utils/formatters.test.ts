// src/utils/formatters.test.ts

import { formatDuration } from "./formatters";

describe("formatDuration (Чистая функция)", () => {
  it("должна корректно форматировать секунды в минуты и секунды", () => {
    expect(formatDuration(65)).toBe("1:05");
    expect(formatDuration(125)).toBe("2:05");
    expect(formatDuration(60)).toBe("1:00");
  });

  it("должна обрабатывать 0 секунд", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  it("должна обрабатывать крайние случаи (отрицательные числа и NaN)", () => {
    expect(formatDuration(-10)).toBe("0:00");
    expect(formatDuration(NaN)).toBe("0:00");
  });
});