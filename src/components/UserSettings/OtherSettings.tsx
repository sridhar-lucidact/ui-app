import { Column, Row } from "~/components/core/BSGrid/BGGrid";
import { Checkbox } from "~/components/core/FormControl/Checkbox/Checkbox";
import { Switch } from "~/components/core/FormControl/Switch/Switch";
import { Typography } from "~/components/core/Typography/Typography";

export default function OtherSettings() {
  return <div>
    <div className="py-3">
      <Row>
        <Column colSize={3}>
          <Typography variant="subtitle-medium" className="text-lucid-grey-600">Alerts & Notifications</Typography>
        </Column>
        <Column colSize={7}>
          <div className="mb-6">
            <Typography variant="subtitle-medium" className="text-lucid-grey-800">Toggle All <Switch className="ml-1" /></Typography>
          </div>
          <div className="mb-2 flex items-start">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
          <div className="mb-2 flex">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
          <div className="mb-2 flex">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
        </Column>
      </Row>
    </div>
    <hr className="my-3" />
    <div className="py-3">
      <Row>
        <Column colSize={3}>
          <Typography variant="subtitle-medium" className="text-lucid-grey-600">Account Activity</Typography>
        </Column>
        <Column colSize={7}>
          <div className="mb-6">
            <Typography variant="subtitle-medium" className="text-lucid-grey-800">Toggle All <Switch className="ml-1" /></Typography>
          </div>
          <div className="mb-2 flex items-start">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
          <div className="mb-2 flex">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
          <div className="mb-2 flex">
            <Checkbox />
            <Typography variant="subtitle-medium" className="text-lucid-grey-800 -mt-[2px] ml-1">Lorem ipsum dolor sit amet,consectetur adipiscing elit. Integer ultricies est eu lectus pharetra bibendum.</Typography> 
          </div>
        </Column>
      </Row>
    </div>
  </div>
}