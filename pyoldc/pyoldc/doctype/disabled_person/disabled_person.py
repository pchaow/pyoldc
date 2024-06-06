# Copyright (c) 2024, up.ac.th and contributors
# For license information, please see license.txt

import frappe
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
        expired_in_days: DF.Int
        firstname: DF.Data | None
        geojson_position: DF.JSON | None
        guardian_account_bank: DF.Data | None
        guardian_account_number: DF.Data | None
        guardian_address: DF.Data | None
        guardian_book_account: DF.Attach | None
        guardian_card: DF.Attach | None
        guardian_firstname: DF.Data | None
        guardian_lastname: DF.Data | None
        lastname: DF.Data | None
        person_status: DF.Literal["\u0e1b\u0e01\u0e15\u0e34", "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e1a\u0e31\u0e15\u0e23\u0e04\u0e19\u0e1e\u0e34\u0e01\u0e32\u0e23", "\u0e15\u0e32\u0e22", "\u0e2b\u0e32\u0e22\u0e2a\u0e32\u0e1a\u0e2a\u0e39\u0e0d", "\u0e22\u0e49\u0e32\u0e22\u0e2d\u0e2d\u0e01"]
        personal_number: DF.Data | None
    # end: auto-generated types

    @property
    def expired_in_days(self):

        from datetime import datetime, date
        import math
        from frappe.utils import getdate

        try :
            if (self.card_expired_date) :
                
                if (type(self.card_expired_date) is str) :
                    exp_date = getdate(self.card_expired_date)
                    exp_date = self.card_expired_date
                    cur_date = date.today()
                    diff_date = (exp_date - cur_date).days
                    return diff_date
                    pass
                else :

                    exp_date = self.card_expired_date
                    cur_date = date.today()
                    diff_date = (exp_date - cur_date).days
                    return diff_date
            else :
                return 0
        except :
            return 0

    pass

def get_disabled_center_list(user=None) :
    if not user :
        user = frappe.session.user
    disabled_center_list = frappe.get_all("Disabled Center User",fields='*',filters={
        'user' : user
    },pluck="parent")

    return disabled_center_list if disabled_center_list else []


def check_user_is_admin():
    if frappe.user == 'Administrator' :
        return True
    
    return False

def get_permission_query_conditions(user=None):
    from frappe.core.doctype.user.user import User

    if not user :
        user = frappe.session.user
    disabled_center_list = get_disabled_center_list(user)
    if check_user_is_admin() :
        return ""
    if len(disabled_center_list) > 0 :
        disabled_center_list_str = ','.join([f"'{x}'" for x in disabled_center_list])
        return '(`tabDisabled Person`.disabled_center in ({disabled_center_list}))'.format(disabled_center_list=disabled_center_list_str)
    return ''

def has_permission(doc, user=None, permission_type=None):
    if not user :
        user = frappe.session.user
    # when reading a document allow if event is Public
    disabled_center_list = get_disabled_center_list(user)

    if doc.disabled_center in disabled_center_list :
        return True

    return False


@frappe.whitelist()
def disabled_people_map() :
    from datetime import datetime,date
    import math
    x = frappe.get_list("Disabled Person",fields="*",limit=0)

    for i in x :
        exp_date_str = i['card_expired_date']
        exp_date = exp_date_str
        cur_date = date.today()
        diff_date = (exp_date - cur_date).days
        if diff_date > 90 : 
            i['expired_date_group'] = 'ปกติ'
        elif diff_date > 60 : 
            i['expired_date_group'] = 'น้อยกว่า 90 วัน'
        elif diff_date > 30 : 
            i['expired_date_group'] = 'น้อยกว่า 60 วัน'
        elif diff_date > 15 : 
            i['expired_date_group'] = 'น้อยกว่า 30 วัน'
        elif diff_date > 0 : 
            i['expired_date_group'] = 'น้อยกว่า 15 วัน'
        elif diff_date == 0 : 
            i['expired_date_group'] = 'หมดอายุวันนี้'
        elif diff_date < 0 : 
            i['expired_date_group'] = 'หมดอายุ'


    return x
