export type Doctype = {
    docstatus: number;
    name: string;
}

export type IPeople<T = unknown> = T & Doctype & {
    address: string
    birthdate: string
    book_account_bank: string
    book_account_number: string
    card_expired_date: string
    card_issue_date: string
    disabled_book_account: string
    disabled_card: string
    disabled_center: string
    disabled_house_register: string
    disabled_type: string
    expired_in_days: number
    firstname: string
    geojson_position: string
    guardian_account_bank: string
    guardian_account_number: string
    guardian_address: string
    guardian_book_account: string
    guardian_card: string
    guardian_firstname: string
    guardian_lastname: string
    lastname: string
    person_status: string
    personal_number: string
}

export type ISupports<T = unknown> = T & Doctype & {
    support_budget_year: string
    support_date: string
    support_detail: string
    support_giver: string
    support_image: string
    support_receiver: string
    support_receiver_name: string
    support_receiver_surname: string
    support_type_name: string
}

export type ICenter<T = unknown> = T & Doctype & {
    center_status: string
    disability_type: string
    responsibility: string
    title: string
    users: string
}