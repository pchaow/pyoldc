import * as React from "react";
import { App } from "./App";
import { CustomDatePicker } from "./CustomDatePicker";
import { createRoot } from "react-dom/client";



export function react_map_control({ wrapper, frm, field }) {
	const $wrapper = $(wrapper);
	console.log($wrapper)
	const root = createRoot($wrapper.get(0));
	root.render(<App frm={frm} field={field} />);
	return root
}

export function react_thai_datepicker_control({ wrapper, frm, field, labelValue }) {
	const $wrapper = $(wrapper);
	const root = createRoot($wrapper.get(0));

	root.render(<CustomDatePicker frm={frm} field={field} labelValue={labelValue} />);

	return root
}

frappe.provide("frappe.ui");
frappe.ui.ReactMapControl = react_map_control
frappe.ui.CustomDatePicker = react_thai_datepicker_control