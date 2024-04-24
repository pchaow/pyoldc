# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Supports(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from pyoldc.pyoldc.doctype.supportevidence.supportevidence import SupportEvidence

		extras: DF.Table[SupportEvidence]
		support_budget_year: DF.Data | None
		support_date: DF.Date | None
		support_detail: DF.SmallText | None
		support_giver: DF.Data | None
		support_image: DF.AttachImage | None
		support_receiver: DF.Link | None
		support_receiver_name: DF.Data | None
		support_receiver_surname: DF.Data | None
		support_type_name: DF.Literal["\u0e21\u0e2d\u0e1a\u0e1a\u0e49\u0e32\u0e19", "\u0e1b\u0e23\u0e31\u0e1a\u0e2a\u0e20\u0e32\u0e1e\u0e41\u0e27\u0e14\u0e25\u0e49\u0e2d\u0e21\u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e2d\u0e32\u0e28\u0e31\u0e22"]
	# end: auto-generated types

	pass
