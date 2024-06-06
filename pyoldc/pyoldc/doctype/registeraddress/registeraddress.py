# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class RegisterAddress(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		birthdate: DF.Date | None
		fullname: DF.Data
		name: DF.Int | None
		register_address_amphur: DF.Link
		register_address_district: DF.Link
		register_address_moo: DF.Data | None
		register_address_no: DF.Data | None
		register_address_owner_ethnicity: DF.Data | None
		register_address_owner_identification_number: DF.Data
		register_address_owner_nationality: DF.Data | None
		register_address_province: DF.Link
		register_address_road: DF.Data | None
		register_address_soi: DF.Data | None
		tel: DF.Data | None
	# end: auto-generated types

	pass
