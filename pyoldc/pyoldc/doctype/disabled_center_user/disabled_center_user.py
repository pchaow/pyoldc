# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class DisabledCenterUser(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		user: DF.Link
	# end: auto-generated types

	pass
