import React, { useContext, useEffect, useState } from "react";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import TableData from "../../../components/tableData/TableData";

const INITIAL_VISIBLE_COLUMNS = [
  "personal_number",
  "disabled_center",
  "firstname",
  "lastname",
  "disabled_type",
  "actions",
];

const columns = [
  { name: "หน่วยงานที่ดูแล", uid: "disabled_center", sortable: true },
  { name: "เลขประจำตัวประชาชน", uid: "personal_number", sortable: true },
  { name: "ชื่อ", uid: "firstname", sortable: true },
  { name: "นามสกุล", uid: "lastname", sortable: true },
  { name: "ประเภท", uid: "disabled_type" },
  { name: "สถานะ", uid: "person_status" },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "ปกติ", uid: "ปกติ" },
  { name: "ไม่มีบัตรคนพิการ", uid: "ไม่มีบัตรคนพิการ" },
  { name: "ตาย", uid: "ตาย" },
  { name: "หายสาบสูญ", uid: "หายสาบสูญ" },
  { name: "ย้ายออก", uid: "ย้ายออก" },
];


function DisabledPersonIndex() {

  const { call } = useContext(FrappeContext) as FrappeConfig;
  const fetcher = (url: any) => call.post(url).then((res) => res.message);

  const { data } = useSWR(
    "pyoldc.pyoldc.doctype.disabled_person.disabled_person.get_disabled_persons",
    fetcher
  );

  const [disabledPeople, setDisabledPeople] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (data) {
      console.log("Data received: ", data); // ตรวจสอบข้อมูลที่ได้รับ
      setDisabledPeople(data);
    }
  }, [data]);

  const navigate = useNavigate()


  return (
    <div className="px-5 mt-5 max-w-[400px] sm:max-w-none">
      <Breadcrumbs className="mb-5">
        <BreadcrumbItem onClick={() => { navigate(`/`) }}>หน้าหลัก</BreadcrumbItem>
        <BreadcrumbItem>ข้อมูลผู้พิการทั้งหมด</BreadcrumbItem>
      </Breadcrumbs>
      <section className="mb-10">
        <div className="mb-10">
          <p className="mb-2 text-2xl font-medium">รายชื่อผู้พิการที่ลงทะเบียนแล้ว</p>
          <p className="text-gray-400">ข้อมูลรายชื่อผู้พิการทั้งหมดที่ลงทะเบียนแล้วในจังหวัดพะเยา</p>
        </div>
        <Skeleton isLoaded={loading} className="rounded-lg w-full">
          <TableData columns={columns} users={disabledPeople} statusOptions={statusOptions} INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS} />
        </Skeleton>
      </section>
    </div>
  );
}

export default DisabledPersonIndex;
