# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class District(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amphure_id: DF.Link | None
		is_govern: DF.Check
		moo: DF.Data
		name: DF.Int | None
		province_id: DF.Link
		tambon_id: DF.Link
	# end: auto-generated types

	pass
