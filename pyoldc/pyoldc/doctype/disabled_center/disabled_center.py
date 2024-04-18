# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class DisabledCenter(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		center_status: DF.Literal["\u0e2d\u0e1b\u0e17", "\u0e23\u0e1e\u0e2a\u0e15", "\u0e2d\u0e37\u0e48\u0e19\u0e46"]
		title: DF.Data | None
	# end: auto-generated types

	pass
