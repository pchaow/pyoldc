frappe.pages["disabledpeoplemap"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("แผนที่ตำแหน่งคนพิการ"),
		single_column: true,
	});
};

frappe.pages["disabledpeoplemap"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("disabledpeoplemap.bundle.jsx").then(() => {
		frappe.disabledpeoplemap = new frappe.ui.Disabledpeoplemap({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}