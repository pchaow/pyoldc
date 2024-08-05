import json
import base64
from io import BytesIO

import frappe
import frappe.utils
import frappe.utils.logger
from frappe.utils.password import update_password as _update_password
from frappe.utils.oauth import login_oauth_user, login_via_oauth2_id_token, get_info_via_oauth
from frappe.core.doctype.user.user import User


@frappe.whitelist(allow_guest=True)
def app_register():

    request = frappe.form_dict
    if 'register' in request:
        registerReq = request['register']

        registerReq['doctype'] = 'User'
        registerReq['new_password'] = registerReq['password']
        user = frappe.get_doc(
            registerReq
        )

        user.flags.ignore_permissions = True
        user.flags.ignore_password_policy = True
        user.insert()

        default_role = frappe.db.get_single_value(
            "Portal Settings", "default_role")
        if default_role:
            user.add_roles(default_role)  # type: ignore
        return "Please check your email for verification"
