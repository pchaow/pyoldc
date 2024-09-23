import { Tabs, Tab} from "@nextui-org/react"
import Map from "../../map/Map";
import { IPeople } from "../../../interfaces";
import { FrappeConfig, FrappeContext, useSWR } from "frappe-react-sdk";
import { useContext, useEffect, useRef, useState } from "react";
import GeneralInformationFrom from "./GeneralInformationFrom";
import HealthFrom from "./HealthFrom";
import ProblemStatusFrom from "./ProblemStatus";

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
              <GeneralInformationFrom createForm={createForm} updateForm={updateForm} />
            </div>
        </Tab>
        <Tab key="Map" title="แผนที่">
          <Map data={createForm} onPositionChange={handlePositionChange} />
        </Tab>
        <Tab key="Health" title="สุขภาพ">
          <div className="flex justify-center">
              <HealthFrom />
          </div>
        </Tab>
        <Tab key="Problem status" title="ข้อมูลสภาพปัญหา">
          <div className="flex justify-center">
              <ProblemStatusFrom />
          </div>
        </Tab>
      </Tabs>
    </div >
  );
};

export default DisabledPersonFrom;
