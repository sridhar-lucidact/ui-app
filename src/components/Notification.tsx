import toast, { Toast } from 'react-hot-toast';
import IconButton from "~/components/core/Button/IconButton";
import { Progress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { TEvent } from '~/types/schema/common.type';
import Button from './core/Button/Button';
import { executeEvents } from '~/executableEvents/eventHandler';

const progressDurations: { [key: number]: string } = {
  2000: '!duration-1500',
  3000: '!duration-2500',
  4000: '!duration-3500',
  5000: '!duration-4500',
  6000: '!duration-5500',
  7000: '!duration-6500',
  8000: '!duration-7500',
  9000: '!duration-8500',
  10000: '!duration-9500',
}

export interface TNotify {
  message: string
  hyperlink?: string
  hyperLinkOnclick?: TEvent,
  type?: 'soft' | 'hard',
  title: string
  duration?: number
}

const isDuration = (duration?: number) => duration && duration != Infinity;

const ToasterContainer = ({ t, notify }: { t: Toast, notify: TNotify }) => {

  const [duration, setDuration] = useState(isDuration(t.duration) ? t.duration : null);
  const interval = useRef<NodeJS.Timeout>();

  const clearSetInterval = () => {
    if (interval.current) { clearInterval(interval.current); }
  }

  useEffect(() => {
    clearSetInterval();
    if (duration) {
      interval.current = setInterval(() => {
        setDuration((duration) => {
        if (duration === 0) { handleClose(); }
        return duration && duration > 1000 ? duration - 1000 : 0
      });
      }, 1000);
    }
  }, []);

  const handleClose = () => {
    clearSetInterval();
    toast.dismiss(t.id);
  }

  const handleHyperLinkOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (notify.hyperLinkOnclick) {
      executeEvents([notify.hyperLinkOnclick]);
    } else {
      window.open(notify.hyperlink, '_blank');
    }
  }

  return (
    <div
      className='border border-lucid-grey-500 max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden min-w-[240px]'
    >
      {isDuration(t.duration) && <Progress
        size="sm"
        value={100}
        className="max-w-md"
        classNames={{
          indicator: `${progressDurations[t.duration as number]} ease-linear`,
          track: 'h-[6px]'
        }}
      />}

      <div className="p-4 relative">
        <IconButton
          icon='lucid-icon lucid-icon-cross'
          className="!border-0 absolute top-2 right-1 z-10"
          onClick={handleClose}
        />
        <div className="flex justify-between mb-2">
          <div className="text-lucid-grey-900 text-sm font-medium">{notify.title}</div>
          {duration && <div className="text-lucid-grey-800 text-xs opacity-50 pr-4">{ duration/1000 } sec remains</div>}
        </div>
        <div className="text-lucid-grey-700 text-xs">{notify.message}</div>
        {notify.hyperlink && <Button onClick={handleHyperLinkOnclick} variant='text'>{notify.hyperlink}</Button>}
      </div>
    </div>
  )
}

export const notify = (notify: TNotify) => toast((t) => <ToasterContainer t={t} notify={notify} />, {
  duration: notify.duration
});