import * as React from "react";
import { ThaiDatePicker } from "thaidatepicker-react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

export function CustomDatePicker({ frm, field, labelValue }) {

  const ConvertToThaiYear = (christYear) => {
    return christYear + 543;
  };



  const ExampleCustomInput = React.forwardRef((props, ref) => {
    return (
      <div className="frappe-control input-max-width">
        <div className="form-group">
          <div className="clearfix">
            <label className="control-label" style={{ paddingRight: '0px' }} >{labelValue}</label>
            <span className="help"></span>
          </div>
          <div className="control-input-wrapper">
            <div className="control-input">
              <input className="input-with-feedback form-control" type="text" defaultValue={props.value} onClick={props.onClick}></input>
            </div>
            <div className="control-value like-disabled-input" style={{ display: 'none' }}>06-01-2000</div>
            <p className="help-box small text-muted"></p>
          </div>
        </div>
      </div>
    )
  })

  const [startDate, setStartDate] = React.useState(frm.get_field(field).get_value());

  const refresh = () => {
    if (frm.get_field(field).get_value()) {
      setStartDate(frm.get_field(field).get_value())
    }
  }

  React.useEffect(() => {
    refresh()
  }, [frm, field])

  const _setStartDate = (date) => {
    setStartDate(date)
    frm.set_value(field, date)
  }

  return (
    <ThaiDatePicker value={startDate}
      inputProps={{ displayFormat: "DD MMMM YYYY" }}
      clearable={false}
      onChange={(date) => _setStartDate(date)}
      customInput={ExampleCustomInput}
    />
  );
}