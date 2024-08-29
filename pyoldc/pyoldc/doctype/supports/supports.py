# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

import frappe
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
        support_type_name: DF.Literal["\u0e21\u0e2d\u0e1a\u0e1a\u0e49\u0e32\u0e19",
                                      "\u0e1b\u0e23\u0e31\u0e1a\u0e2a\u0e20\u0e32\u0e1e\u0e41\u0e27\u0e14\u0e25\u0e49\u0e2d\u0e21\u0e17\u0e35\u0e48\u0e2d\u0e22\u0e39\u0e48\u0e2d\u0e32\u0e28\u0e31\u0e22"]
    # end: auto-generated types

    pass


@frappe.whitelist()
def get_supports_lsit_by_support_receiver():

    req = frappe.form_dict
    assert 'personal_number' in req

    personal_number = req['personal_number']
    support = frappe.get_list('Supports', fields=['*'], filters={'support_receiver': personal_number})

    return support


@frappe.whitelist()
def get_supports_by_name():

    req = frappe.form_dict
    assert 'name' in req

    name = req['name']
    support = frappe.get_doc('Supports', name)

    return support


@frappe.whitelist()
def get_supports():

    query = frappe.qb.from_('Supports').select('name', 'support_receiver',
                                               'support_receiver_name', 'support_receiver_surname', 'support_date')
    result = query.run(as_dict=True)

    return result


@frappe.whitelist()
def update_support():

    req = frappe.form_dict
    assert 'name' in req

    name = req['name']
    if 'doctype' not in name:
        name['doctype'] = 'Supports'

    name = frappe.get_doc(name)
    name.save()

    return name


@frappe.whitelist()
def create_support():
    req = frappe.form_dict

    assert 'support_receiver' in req

    s: Supports = frappe.new_doc('Supports')  # type: ignore

    s.support_date = req['support_date'].strip()
    s.support_budget_year = req['support_budget_year'].strip()
    s.support_type_name = req['support_type_name'].strip()
    s.support_giver = req['support_giver'].strip()
    s.support_receiver = req['support_receiver'].strip()
    s.support_receiver_name = req['support_receiver_name'].strip()
    s.support_receiver_surname = req['support_receiver_surname'].strip()
    s.support_detail = req['support_detail'].strip()
    s.support_image = req['support_image'].strip()

    s.manager = frappe.session.user

    s.save()

    return s


@frappe.whitelist()
def clear_image():

    req = frappe.form_dict
    assert 'doc' in req
    support_receiver = req['doc']

    if 'doctype' not in support_receiver:
        support_receiver['doctype'] = 'Supports'

    support_receiver = frappe.get_doc(support_receiver)

    support_receiver.support_image = None

    support_receiver.save()

    return support_receiver


@frappe.whitelist()
def upload_image():

    req = frappe.form_dict
    assert 'disabled_person' in req
    assert 'fileresponse' in req
    disabled_person = req['disabled_person']
    fileReq = req['fileresponse']

    if 'doctype' not in disabled_person:
        disabled_person['doctype'] = 'Supports'

    disabled_person = frappe.get_doc(disabled_person)

    disabled_person.support_image = fileReq['file_url']

    disabled_person.save()

    return disabled_person


@frappe.whitelist()
def count_supports():
    total = frappe.db.count('Supports')
    return total
