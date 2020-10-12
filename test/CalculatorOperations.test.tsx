import React from "react";
import { mount } from "enzyme";
import App from "../src/js/App";

describe.only("Calculator operations", () => {
	let app;
	beforeEach(() => {
		app = mount(<App />);
	});

	afterEach(() => {
		app.unmount();
	});

	test("Calculator can be cleared", () => {
		const numberBtns = app.find(".calc__btn").filterWhere((btn) => {
			const btnNumber = btn.prop("data-symbol");
			return !Number.isNaN(Number(btnNumber));
		});
		const screen = app.find(".calc__screen");
		const clearBtn = app.find('.calc__btn[data-symbol="C"]').simulate("click");

		numberBtns.at(0).simulate("click");
		expect(screen.text().length).toBeGreaterThan(0);
		clearBtn.simulate("click");
		expect(screen.text().length).toBe(0);
	});

	test("Number symbol toggle works", () => {
		const symbolBtn = app.find('.calc__btn[data-symbol="-/+"]');
		const numberBtns = app.find(".calc__btn").filterWhere((btn) => {
			const btnNumber = btn.prop("data-symbol");
			return !Number.isNaN(Number(btnNumber));
		});
		numberBtns.at(0).simulate("click");
		numberBtns.at(1).simulate("click");
		numberBtns.at(2).simulate("click");
		symbolBtn.simulate("click");

		const screen = app.find(".calc__screen");
		expect(Number(screen.text())).toBeLessThan(0);
	});

	test("2+2", () => {
		const screen = app.find(".calc__screen");
		const plusBtn = app.find('.calc__btn[data-symbol="+"]');
		const twoBtn = app.find('.calc__btn[data-symbol="2"]');

		twoBtn.simulate("click");
		plusBtn.simulate("click");
		twoBtn.simulate("click");

		expect(screen.text()).toBe("2+2");
	});
});
