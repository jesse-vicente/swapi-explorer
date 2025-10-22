import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./use-search";

describe("useSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchValue).toBe("");
    expect(result.current.debouncedSearchValue).toBe("");
  });

  it("should initialize with provided initial value", () => {
    const { result } = renderHook(() => useSearch("Tatooine"));

    expect(result.current.searchValue).toBe("Tatooine");
    expect(result.current.debouncedSearchValue).toBe("Tatooine");
  });

  it("should update searchValue immediately", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchValue("Alderaan");
    });

    expect(result.current.searchValue).toBe("Alderaan");
    expect(result.current.debouncedSearchValue).toBe("");
  });

  it("should debounce search value after delay", () => {
    const { result } = renderHook(() => useSearch("", 500));

    act(() => {
      result.current.setSearchValue("Hoth");
    });

    expect(result.current.searchValue).toBe("Hoth");
    expect(result.current.debouncedSearchValue).toBe("");

    // Avançar timer
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.debouncedSearchValue).toBe("Hoth");
  });

  it("should only apply last value when multiple rapid changes occur", () => {
    const { result } = renderHook(() => useSearch("", 500));

    act(() => {
      result.current.setSearchValue("A");
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.setSearchValue("Al");
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.setSearchValue("Ald");
    });

    // Ainda não passou os 500ms desde a última mudança
    expect(result.current.debouncedSearchValue).toBe("");

    // Avançar 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.debouncedSearchValue).toBe("Ald");
  });

  it("should clear both values when clearSearch is called", () => {
    const { result } = renderHook(() => useSearch("Tatooine"));

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchValue).toBe("");
    expect(result.current.debouncedSearchValue).toBe("");
  });

  it("should use custom delay", () => {
    const { result } = renderHook(() => useSearch("", 1000));

    act(() => {
      result.current.setSearchValue("Dagobah");
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Ainda não passou 1000ms
    expect(result.current.debouncedSearchValue).toBe("");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Agora passou 1000ms
    expect(result.current.debouncedSearchValue).toBe("Dagobah");
  });
});
