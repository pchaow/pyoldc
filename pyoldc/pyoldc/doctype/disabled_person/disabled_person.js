// Copyright (c) 2024, up.ac.th and contributors
// For license information, please see license.txt





frappe.ui.form.on("Disabled Person", {

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
				frappe.ui.CustomDatePicker({ wrapper: `div#birthdate_thai_field`, frm: frm, field: 'birthdate' ,labelValue:"วัน-เดือน-ปี เกิด (พ.ศ.)" })
				frappe.ui.CustomDatePicker({ wrapper: `div#card_issue_date_field`, frm: frm, field: 'card_issue_date' ,labelValue:"วันออกบัตร (พ.ศ.)"})
				frappe.ui.CustomDatePicker({ wrapper: `div#card_expired_date_field`, frm: frm, field: 'card_expired_date' ,labelValue:"วันบัตรหมดอายุ (พ.ศ.)"})


			});
		}, 500)




	}
});
