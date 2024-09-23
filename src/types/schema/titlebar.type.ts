import {
  Filter,
  Menu,
  MenuOption,
  TitleBar,
  
  WidgetTitleBar,
} from 'la-ui-schema/lib/TitleBarModule';
import { TFieldControls, TTitleBarControls } from './widget.type';

export interface TFilter extends Filter {}
export interface TMenu extends Menu {}
export interface TMenuOption extends MenuOption {}
export interface TTitleBar extends TitleBar {
  controls?: TTitleBarControls
}

export interface TWidgetTitleBar extends WidgetTitleBar {
  controls?: TFieldControls
}