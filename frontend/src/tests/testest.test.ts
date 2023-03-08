/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://localhost:3000/" }
 */
import { sum } from "./sumtest";
import { listCookies } from "../redux/app/hooks";

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('use jsdom and set the URL in this test file', () => {
    expect(window.location.href).toBe("http://localhost:3000/");
});
