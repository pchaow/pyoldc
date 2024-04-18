# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class DisabledPerson(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		address: DF.Data | None
		birthdate: DF.Date | None
		book_account_bank: DF.Data | None
		book_account_number: DF.Data | None
		card_expired_date: DF.Date | None
		card_issue_date: DF.Date | None
		disabled_book_account: DF.Attach | None
		disabled_card: DF.Attach | None
		disabled_center: DF.Link | None
		disabled_house_register: DF.Attach | None
		disabled_type: DF.Literal["1. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e2b\u0e47\u0e19", "2. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e44\u0e14\u0e49\u0e22\u0e34\u0e19\u0e2b\u0e23\u0e37\u0e2d\u0e2a\u0e37\u0e48\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2b\u0e21\u0e32\u0e22", "3. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e04\u0e25\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e2b\u0e27\u0e2b\u0e23\u0e37\u0e2d\u0e17\u0e32\u0e07\u0e23\u0e48\u0e32\u0e07\u0e01\u0e32\u0e22", "4. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e08\u0e34\u0e15\u0e43\u0e08\u0e2b\u0e23\u0e37\u0e2d\u0e1e\u0e24\u0e15\u0e34\u0e01\u0e23\u0e23\u0e21", "5. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e2a\u0e15\u0e34\u0e1b\u0e31\u0e0d\u0e0d\u0e32", "6. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49", "7. \u0e1e\u0e34\u0e01\u0e32\u0e23\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e17\u0e34\u0e2a\u0e15\u0e34\u0e01"]
		firstname: DF.Data | None
		guardian_account_bank: DF.Data | None
		guardian_account_number: DF.Data | None
		guardian_address: DF.Data | None
		guardian_book_account: DF.Attach | None
		guardian_card: DF.Attach | None
		guardian_firstname: DF.Data | None
		guardian_lastname: DF.Data | None
		lastname: DF.Data | None
		personal_number: DF.Data | None
	# end: auto-generated types

	pass
