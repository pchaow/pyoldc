// Copyright (c) 2024, up.ac.th and contributors
// For license information, please see license.txt





frappe.ui.form.on("Disabled Person", {
	setup(frm){
		frappe.require("reactmap.bundle.jsx")
	},
	refresh(frm) {

		$("#disabled-person-location_tab-tab").click(() => {
			setTimeout(() => {
				frappe.require("reactmap.bundle.jsx").then(() => {
					frappe.ui.ReactMapControl({ wrapper: `div#react_app_field`, frm: frm, field: 'geojson_position' })
				});
			}, 500)
		})

		setTimeout(() => {
			frappe.require("reactmap.bundle.jsx").then(() => {
				frappe.ui.ReactMapControl({ wrapper: `div#react_app_field`, frm: frm, field: 'geojson_position' })

				frappe.ui.CustomDatePicker({ wrapper: `div#birthdate_thai_field`, frm: frm, field: 'birthdate' })
			});
		}, 500)


	}
});
