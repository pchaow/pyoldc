import { Input, Select, SelectItem, Button, Tabs, Tab, Skeleton, Textarea, DatePicker } from "@nextui-org/react"
import Map from "../disabledPersonMap/DisabledPersonmap";
import { ICenter, IPeople } from "../../interfaces";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { useContext, useEffect, useRef, useState } from "react";
import { RiDeleteBin2Fill, RiEyeFill } from "react-icons/ri";
import { BiSolidCloudUpload } from "react-icons/bi";
import GeneralInformationFrom from "./DisabledPersonFrom/GeneralInformationFrom";
import HealthFrom from "./DisabledPersonFrom/HealthFrom";
import ProblemStatusFrom from "./DisabledPersonFrom/ProblemStatus";

interface FormProps {
  createForm: IPeople;
  loading: boolean;
  updateForm: (key: string, value: string) => void;
}

const DisabledPersonFrom: React.FC<FormProps> = ({
  createForm,
  loading,
  updateForm,
}) => {
  const { call } = useContext(FrappeContext) as FrappeConfig
  const fetcher = (url: any) => call.post(url).then((res) => res.message);

  const handlePositionChange = (newPosition) => {
    updateForm('geojson_position', JSON.stringify(newPosition));
  }

  return (
    <div className="px-5 mt-5">
      <Tabs aria-label="Options">
        <Tab key="General information" title="ข้อมูลทั่วไป">
          <div className="flex justify-center">
            <div className="max-w-[62.5%] w-full">
              <GeneralInformationFrom createForm={createForm} updateForm={updateForm} />
            </div>
          </div>
        </Tab>
        <Tab key="Map" title="แผนที่">
          <Map data={createForm} onPositionChange={handlePositionChange} />
        </Tab>
        <Tab key="Health" title="สุขภาพ">
          <div className="flex justify-center">
            <div className="max-w-[62.5%] w-full">
              <HealthFrom />
            </div>
          </div>
        </Tab>
        <Tab key="Problem status" title="ข้อมูลสภาพปัญหา">
          <div className="flex justify-center">
            <div className="max-w-[62.5%] w-full">
              <ProblemStatusFrom />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div >
  );
};

export default DisabledPersonFrom;
