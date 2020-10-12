import React from "react";
import { mount } from "enzyme";
import App from "../src/js/App";

describe("Calculator App basic FE functionality", () => {
	let app;
	beforeEach(() => {
		app = mount(<App />);
	});
	afterEach(() => {
		app.unmount();
	});

	test("Renders calculator with keypad", () => {
		expect(app.find(".calc__btn").length).toBeGreaterThan(0);
	});

	test("Calculator displays expressions after clicking", () => {
		const numberBtns = app.find(".calc__btn").filterWhere((btn) => {
			const btnNumber = btn.prop("data-symbol");
			return !Number.isNaN(Number(btnNumber));
		});
		numberBtns.at(0).simulate("click");

		const screen = app.find(".calc__screen");
		expect(screen.text().length).toBeGreaterThan(0);
	});
});
