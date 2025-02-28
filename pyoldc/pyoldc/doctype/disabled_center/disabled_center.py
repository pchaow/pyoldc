# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class DisabledCenter(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from pyoldc.pyoldc.doctype.disabled_center_user.disabled_center_user import DisabledCenterUser

		center_status: DF.Literal["\u0e2d\u0e1b\u0e17", "\u0e23\u0e1e\u0e2a\u0e15", "\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32", "\u0e2d\u0e37\u0e48\u0e19\u0e46"]
		disability_type: DF.Literal["1. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e2b\u0e47\u0e19", "2. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19\u0e2b\u0e23\u0e37\u0e2d\u0e2a\u0e37\u0e48\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2b\u0e21\u0e32\u0e22", "3. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e04\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e2b\u0e27\u0e2b\u0e23\u0e37\u0e2d\u0e17\u0e32\u0e07\u0e23\u0e48\u0e32\u0e07\u0e01\u0e32\u0e22", "4. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e08\u0e34\u0e15\u0e43\u0e08\u0e2b\u0e23\u0e37\u0e2d\u0e1e\u0e24\u0e15\u0e34\u0e01\u0e23\u0e23\u0e21", "5. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e2a\u0e15\u0e34\u0e1b\u0e31\u0e0d\u0e0d\u0e32", "6. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49", "7. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e17\u0e34\u0e2a\u0e15\u0e34\u0e01"]
		responsibility: DF.Literal["\u0e15\u0e32\u0e21\u0e1e\u0e37\u0e49\u0e19\u0e17\u0e35\u0e48", "\u0e15\u0e32\u0e21\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17\u0e04\u0e27\u0e32\u0e21\u0e1e\u0e34\u0e01\u0e32\u0e23", "\u0e14\u0e49\u0e32\u0e19\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32", "\u0e2d\u0e37\u0e48\u0e19\u0e46"]
		title: DF.Data | None
		users: DF.Table[DisabledCenterUser]
	# end: auto-generated types

	pass

@frappe.whitelist()
def get_disabled_center_lsit():

    query = frappe.qb.from_('Disabled Center').select('title')
    result = query.run(as_dict=True)

    return result
