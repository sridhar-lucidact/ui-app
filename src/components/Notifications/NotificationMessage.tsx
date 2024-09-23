import React, { useMemo, useState } from 'react';
import { NotificationMessageProps } from './types';
import { cn } from '@nextui-org/react';
import { Typography } from '~/components/core/Typography/Typography';
import CoreDropdown from '~/components/core/Dropdown';
import Button from '~/components/core/Button/Button';
import { Checkbox } from '~/components/core/FormControl/Checkbox/Checkbox';

const Dot = ()=> {
  return (
    <div className={'px-1 flex items-center justify-start' }>
      <div className={' h-[.125rem] w-[.125rem] rounded-full bg-lucid-grey-600' }></div>
    </div>
  );
};

// Using Dummy icon for "more" options
const More = ({ className, ...props }: React.ComponentProps<'svg'>)=> {
  return (
    <svg 
      className={cn('h-4 w-4', className)}
      viewBox="0 0 24 24"
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/>
      <circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="currentColor"/>
    </svg>
  );
};

export const NotificationMessage = ({
  id,
  isRead,
  isSelected,
  tag,
  time,
  title,
  content,
  className,
  handleNotificationSelection,
  menuOptions,
  handleSelectedMenuOption,
}: NotificationMessageProps)=> {

  const [seeMoreEnabled, setSeeMoreEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleOnViewMore = ()=> {
    setSeeMoreEnabled((seeMoreEnabled) => !seeMoreEnabled);
  };

  const computedContent = useMemo(()=> {
    return seeMoreEnabled 
      ? content 
      : content?.length < 200 
        ? content 
        : `${content?.slice(0, 200)}...`;
  }, [seeMoreEnabled, content]);

  const handleSelectedOption = (optionKey:string|number)=> {
    handleSelectedMenuOption?.(id, optionKey);   
  };

  const handleNotiSelection = (_:boolean)=> {
    handleNotificationSelection?.(id);
  };

  const enableHovering = ()=> {
    setHovered(true);
  };

  const disableHovering = ()=> {
    setHovered(false);
  };

  const computedMenuOptions = useMemo(()=> {
    if(isRead){
      let opts:Record<string,any>[] = [];
      if(menuOptions?.length > 0){
        menuOptions.forEach(op=> {
          if(op?.key !== "read"){
            opts.push(op);
          }
        })
      }
      return opts;
    } 
    return menuOptions;
  }, [menuOptions, isRead]);

  return (
    <div onMouseOver={enableHovering} onMouseOut={disableHovering} className={cn(` 
      w-[21.25rem] 
      min-h-[8.875rem] 
      p-4
      border-b border-b-lucid-grey-300
      space-y-2
      bg-white
    `, {
      "bg-lucid-grey-100": hovered
    } , className)}>
      <div className=' flex justify-between items-start gap-x-4'>
        <div className=' space-y-2'>
          <div className=' flex items-center text-lucid-grey-600'>
            <Checkbox onValueChange={handleNotiSelection} isSelected={isSelected}/>
            <Typography variant="subtitle-s2" className=' flex items-center'>
              {tag}
              <Dot/>
              {time}
            </Typography>
          </div>

          <div className='flex items-center space-x-1'>
            {!isRead ? <span className=' rounded-full h-[.375rem] w-[.375rem] bg-lucid-blue-500'></span> : ""}
            <Typography variant="subtitle-medium-s2" className=' text-lucid-grey-900'> 
              {title}
            </Typography>
          </div>
        </div>

        { 
          hovered ? (
            <CoreDropdown 
              placement="bottom-end" 
              triggerNode={
                <Button isIconOnly variant="light" size="icon-medium" className='rounded-full bg-lucid-grey-100 hover:bg-lucid-grey-200 active:bg-lucid-grey-300'>
                  <More/>
                </Button>
              } 
              options={computedMenuOptions} 
              classNames={{
                content: "min-w-[9.9375rem] p-0"
              }}
              menuProps={{ 
                onAction: handleSelectedOption, 
                "aria-label": "option label", 
                classNames: {
                  base: "w-[9.9375rem] border border-lucid-grey-300 rounded-lg shadow-elevated-lite"
                }
              }}
              itemProps={{
                className: " py-2  data-[hover=true]:bg-lucid-grey-200 [&>*]:font-sans [&>*]:text-xs [&>*]:leading-[0.9rem] [&>*]:font-medium [&>*]:tracking-[-.24px] ",
              }}
            /> 
          ) : ""
        }
        
      </div>

      <div className=' space-y-2 select-none'>
        <Typography variant="subtitle-s2" className=' text-lucid-grey-700'>
          {computedContent}
        </Typography>

        <Typography 
          onClick={handleOnViewMore} 
          variant='subtitle-medium-s2' 
          className=' cursor-pointer text-lucid-blue-500'
        >
          View { seeMoreEnabled ? "Less" : "More" }
        </Typography>
      </div>
    </div>
  );
};

