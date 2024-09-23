import CardsBar, { isCardBar } from "~/components/CardsBar/CardsBar";
import Widgets, { isWidget } from "~/components/Widgets/Widgets";
import { Column, Row, isRow } from "~/components/core/BSGrid/BGGrid";
import { TCardBarSchema } from "~/types/schema/card.type";
import { TContainer, TRow } from "~/types/schema/page.type";
import { TWidget } from "~/types/schema/widget.type";

export type TContentConf = TCardBarSchema | TWidget | TRow[] | TRow | TContainer

interface TContentProps {
  conf: TContentConf,
  id: string
}

export const isContainer = (conf: TContainer) => {
  return conf.hasOwnProperty("containerContent");
}

export default function Content({ conf, id }: TContentProps) {
  if (isCardBar(conf)) {
    console.debug('card bar content', conf)
    return <CardsBar conf={conf} id={id} />
  } else if (isWidget(conf)) {
    console.debug('widget content', conf)
    return <Widgets conf={conf} id={id} />
  } else if (conf && isContainer(conf as TContainer)) {
    console.debug('container content', conf)
    return <Row>
      {(conf as TContainer)?.containerContent.map((content, i) => {
        const contentId = content.hasOwnProperty("id") ? `${id}/${(content as TWidget).id}` : id;
        return <Column key={`${contentId}-${i}`}>
        <Content conf={content as TContentConf} id={contentId} />
      </Column>})}
    </Row>
  } else if (conf && isRow(conf)) {
    console.debug('row content', conf)
    return <Row>
      {(conf as TRow)?.rowContent.map((content, i) => {
        const contentId = content.hasOwnProperty("id") ? `${id}/${(content as TWidget).id}` : id;
        return <Column key={`${contentId}-${i}`}>
        <Content conf={content as TContentConf} id={contentId} />
      </Column>})}
    </Row>
  }
  
  if (Array.isArray(conf)) {
    return (conf as TRow[]).map((c, i) => <Content key={`layout-content-${id}-${i}`} conf={c} id={id} />)
  }
}