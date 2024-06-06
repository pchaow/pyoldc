# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Province(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		id: DF.Data
		name_en: DF.Data | None
		name_th: DF.Data | None
	# end: auto-generated types

	pass
