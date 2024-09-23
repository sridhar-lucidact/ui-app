import cloneDeep from "lodash/cloneDeep";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TFieldSpec, TForm, TWidget } from "~/types/schema/widget.type";
import { addOrUpdateAppData, getAppData } from "~/store/appData";
import { executeEventOption } from "~/executableEvents/eventHandler";
import dottie from "dottie";
import { EventType } from "~/types/schema/enum.type";
import { TCardBarSchema } from "~/types/schema/card.type";
import { TEventOptions, TEvent } from "~/types/schema/common.type";
import { parseResponses } from "~/executableEvents/parseEventResponse"
import { isEmpty } from "lodash";
import { addOrUpdateUiConf } from "~/store/uiConf";
import { addOrUpdateRepeatData, addOrUpdateRepeatUiConf } from "~/store/repeatConf";
import { TAnyValue } from "~/components/core/FormElements/formFieldTypes";
import { deepMerge } from "~/utils/objectHelper";


export function useEvents(conf?: TForm | TWidget | TCardBarSchema | TFieldSpec, id?: string, load?: boolean ) {
  const dispatch = useDispatch();
  let formData: any = id ? useSelector(getAppData(id)) || null : null
  if (conf && conf.hasOwnProperty("fieldType")) {
    formData = { [(conf as TFieldSpec).name as string]: formData}
  } 

  useEffect(() => {
    if (load !== false) {
      processOnLoad(null)
    }
  }, []);

  const verifyEventsOptionsExists = () => {
    const eventOptions: TEventOptions[] | TEventOptions | undefined = conf?.event
    if (!eventOptions) {
      console.debug("No event provided for conf", conf);
      return false;
    }
    return true
  }

  const processOnLoad = (data: any) => {
    return verifyAndProcessEvents(EventType.OnLoad, data);
  }

  const processOnClick = async (data: any) => {
    return verifyAndProcessEvents(EventType.OnClick, data);
  }

  const processOnSubmit = async (data: any) => {
    return verifyAndProcessEvents(EventType.OnSubmit, data);
  }

  const processOnBlur = (data: any) => {
    return verifyAndProcessEvents(EventType.OnBlur, data);
  }

  const processOnRowClick = (data: any) => {
    return verifyAndProcessEvents(EventType.OnRowClick, data);
  }

  const processOnCellClick = (cellName: string, data: any) => {
    return verifyAndProcessEventsWithFields(cellName, null,  EventType.OnCellClick, data);
  }

  const processOnCellDoubleClick = (cellName: string, data: any) => {
    return verifyAndProcessEventsWithFields(cellName, null, EventType.OnCellDoubleClick, data);
  }

  const processOnChange = (data: any, fieldValue?: TAnyValue) => {
    return verifyAndProcessEventsWithFields(null, fieldValue || null, EventType.OnChange, data);
  }

  const processOnExpand = (data: any) => {
    return verifyAndProcessEvents(EventType.OnExpand, data);
  }

  const processOnFocus = (data: any) => {
    return verifyAndProcessEvents(EventType.OnFocus, data);
  }


  const processOnKeydown = (data: any) => {
    return verifyAndProcessEvents(EventType.OnKeydown, data);
  }

  const processOnKeyup = (data: any) => {
    return verifyAndProcessEvents(EventType.OnKeyup, data);
  }

  const processOnRefresh = (data: any) => {
    return verifyAndProcessEvents(EventType.OnRefresh, data);
  }

  const processOnPointClick = (seriesName: string, data: any) => {
    return verifyAndProcessEventsWithFields(seriesName, null, EventType.OnPointClick, data);
  }

  const processOnSelect = (data: any) => {
    return verifyAndProcessEvents(EventType.OnSelect, data);
  }

  const processOnPageChange = (data: any) => {
    return verifyAndProcessEvents(EventType.OnGridPageChange, data);
  }

  const processOnPrev = (data: any) => {
    return verifyAndProcessEvents(EventType.OnPrevious, data);
  }

  const processOnNext = (data: any) => {
    return verifyAndProcessEvents(EventType.OnNext, data);
  }

  const verifyAndProcessEvents = async (eventType: EventType, data: any) => {
    if (!verifyEventsOptionsExists()) return [];
    const eventOptions = conf?.event as TEventOptions[] | TEventOptions;
    const { responses } = await processEvents(eventOptions, eventType, data);
    // console.log('verifyAndProcessEvents', responses)
    return responses;
  }

  const processEvents = async (eventOptions: TEventOptions[] | TEventOptions, type: EventType, data: any) => {
    if (!conf) return { responses: []};
    
    let responses: any[] = [];
    let dataUpdates: {[key: string]: any } = {
      data: {},
      uiConf: {},
      repeat: {
        data: {},
        uiConf: {}
      }
    }
    const multipleResponses = Array.isArray(eventOptions);
    if (!Array.isArray(eventOptions)) eventOptions = [eventOptions]

    for(let [executeEventOptionIndex, option] of eventOptions.entries()) {
      responses[executeEventOptionIndex] = []
      const events: TEvent[] = getEventOptionsToProcess(null, null, option, type);
      if (!events) continue;

      const eventResponses = await executeEventOption({
        executeEventOptionIndex, events: events as TEvent[], conf, data: getAllData(data), responses, id});
      if (multipleResponses) {
        responses[executeEventOptionIndex] = cloneDeep(eventResponses);          
      } else {
        responses = cloneDeep(eventResponses);          
      }

      parseResponses(eventResponses, dataUpdates);
    }
    
    if (!isEmpty(dataUpdates.data)) {
      dispatch(addOrUpdateAppData(dataUpdates.data));
    }
    if (!isEmpty(dataUpdates.uiConf)) {
      dispatch(addOrUpdateUiConf(dataUpdates.uiConf));
    }
    if (dataUpdates.repeat && !isEmpty(dataUpdates.repeat.data)) {
      dispatch(addOrUpdateRepeatData(dataUpdates.repeat.data));
    }
    if (dataUpdates.repeat && !isEmpty(dataUpdates.repeat.uiConf)) {
      dispatch(addOrUpdateRepeatUiConf(dataUpdates.repeat.uiConf));
    }
    // console.log('processEvents', responses, dataUpdates);
    return {responses, dataUpdates};
  }

  const verifyAndProcessEventsWithFields = async (seriesName: string | null, fieldValue: TAnyValue | null, eventType: EventType, data: any) => {
    if (!verifyEventsOptionsExists()) return [];
    const eventOptions = conf?.event as TEventOptions[] | TEventOptions;
    const { responses } = await processEventsWithFields(seriesName, fieldValue, eventOptions, eventType, data);
    return responses;
  }

  const processEventsWithFields = async (fieldName: string | null, fieldValue: TAnyValue | null, eventOptions: TEventOptions[] | TEventOptions, type: EventType, data: any) => {
    if (!conf) return { responses: []};
    
    let responses: any[] = [];
    let dataUpdates: {[key: string]: any } = {
      data: {},
      uiConf: {},
      repeat: {
        data: {},
        uiConf: {}
      }
    }

    const multipleResponses = Array.isArray(eventOptions);
    if (!Array.isArray(eventOptions)) eventOptions = [eventOptions]

    for(let [executeEventOptionIndex, option] of eventOptions.entries()) {
      responses[executeEventOptionIndex] = []
      const events: TEvent[] = getEventOptionsToProcess(fieldName, fieldValue, option, type);
      if (events) {
        const eventResponses = await executeEventOption({
          executeEventOptionIndex, events: events as TEvent[], conf, data: getAllData(data), responses, id});
        if (multipleResponses) {
          responses[executeEventOptionIndex] = cloneDeep(eventResponses);          
        } else {
          responses = cloneDeep(eventResponses);    
        }
        parseResponses(eventResponses, dataUpdates);
      }
    }
    
    if (!isEmpty(dataUpdates.data)) {
      dispatch(addOrUpdateAppData(dataUpdates.data));
    }
    if (!isEmpty(dataUpdates.uiConf)) {
      dispatch(addOrUpdateUiConf(dataUpdates.uiConf));
    }
    if (dataUpdates.repeat && !isEmpty(dataUpdates.repeat.data)) {
      dispatch(addOrUpdateRepeatData(dataUpdates.repeat.data));
    }
    if (dataUpdates.repeat && !isEmpty(dataUpdates.repeat.uiConf)) {
      dispatch(addOrUpdateRepeatUiConf(dataUpdates.repeat.uiConf));
    }
    return {responses, dataUpdates};
  }

  const filterEventFieldValue = (fieldValue: TAnyValue, events: TEvent[]) => {
    return events.filter((event: TEvent) => {
      if (Array.isArray(fieldValue) && Array.isArray(event.fieldValue)) {
        return event.fieldValue.some(value => fieldValue.includes(value));
      } else if (Array.isArray(fieldValue)) {
        return fieldValue.includes(event.fieldValue);
      } else if (Array.isArray(event.fieldValue)) {
        return event.fieldValue.includes(fieldValue)
      } else {
        return event.fieldValue === fieldValue
      }
    })
  }

  const getEventOptionsToProcess = (fieldName: string | null, fieldValue: TAnyValue | null, eventOptions: TEventOptions, type: EventType) => {
    const allEvents: TEvent[] = dottie.get(eventOptions, type);
    let events: TEvent[] = []; 
    if (fieldName && allEvents) {
      events = allEvents.filter((event: TEvent) => event.seriesName === fieldName || event.cellFieldName === fieldName)
    } else if (fieldValue && allEvents) {
      events = filterEventFieldValue(fieldValue, allEvents)
      if (events.length === 0) events = filterEventFieldValue("", allEvents)
    } else if (allEvents) {
      events = allEvents.filter((event: TEvent) => !event.fieldValue && !event.seriesName && !event.cellFieldName);
    }
    return events || [];
  }

  const getAllData = (data: any) => {
    return deepMerge({}, formData, data)
  }

  const hasEvent = (type: EventType, fieldName?: string, fieldValue?: TAnyValue) => {
    if (!verifyEventsOptionsExists()) return false;
    let eventOptions = conf?.event as TEventOptions[] | TEventOptions;
    let eventExists = false
    
    if (!Array.isArray(eventOptions)) {
      eventOptions = [eventOptions as TEventOptions];
    }

    for(let [__, option] of eventOptions.entries()) {
      const events: TEvent[] = getEventOptionsToProcess(fieldName || null, fieldValue || null , option, type);
      eventExists = events.length > 0
      if (eventExists) {
        break;
      }
    }
    return eventExists;
  }

  return {
    processOnClick,
    processOnSubmit,
    processOnBlur,
    processOnChange,
    processOnExpand,
    processOnFocus,
    processOnKeydown,
    processOnKeyup,
    processOnRefresh,
    processOnRowClick,
    processOnCellClick,
    processOnCellDoubleClick,
    processOnPointClick,
    processOnSelect,
    processOnPageChange,
    processOnLoad,
    processOnPrev,
    processOnNext,
    verifyAndProcessEvents,
    verifyAndProcessEventsWithFields,
    hasEvent
  }
}