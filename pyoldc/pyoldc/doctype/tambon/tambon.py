# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Tambon(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amphure_th: DF.Link | None
		id: DF.Data
		name_eng: DF.Data | None
		name_th: DF.Data | None
		province_th: DF.Link | None
		zipcode: DF.Data | None
	# end: auto-generated types

	pass
