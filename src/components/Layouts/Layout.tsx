import Content, { TContentConf } from "~/components/Content/Content";
import { isCardBar } from "~/components/CardsBar/CardsBar";
import { isWidget } from "~/components/Widgets/Widgets";
import { isRow, Row, Column } from "~/components/core/BSGrid/BGGrid";
import { TTab } from "~/types/schema/tab.type";
import { TFluidLayout, TLayoutContent, TOneColumnLayout, TRow, TTwoColumnLayout } from "~/types/schema/page.type";
import { TWidget } from "~/types/schema/widget.type";

interface TLayoutProps {
  conf: TTab,
  id: string
}

export function isFluid(conf: TLayoutContent): conf is TFluidLayout {
  if (!Array.isArray(conf)) {
    console.debug("Not FluidLayout. Conf is not an array", conf)
  }

  let item = (conf as TFluidLayout)[0];
  return isCardBar(item) || isWidget(item)
}

export function isOneColumn(conf: TLayoutContent): conf is TOneColumnLayout {
  if (!Array.isArray(conf)) {
    console.debug("Not OneColumnLayout. Conf is not an array", conf)
  }
  const item = (conf as TOneColumnLayout)[0];
  return isRow(item)
}

export function isTwoColumn(conf: TLayoutContent): conf is TTwoColumnLayout {
  if (!Array.isArray(conf) && !Array.isArray(conf[0])) {
    console.debug("Not TwoColumnLayout. Conf is not an array", conf)
  }
  const item = (conf as TTwoColumnLayout)[0][0];
  return isRow(item)
}

export function Layout({ conf, id }: TLayoutProps) {
  let layout = null
  switch(true) {
    case isCardBar(conf.layoutContent):
    case isWidget(conf.layoutContent):
    case isRow(conf.layoutContent):
      console.debug("layout for cardbar, widget and row", conf.layoutContent);
      layout = <div><Content conf={conf.layoutContent as TContentConf} id={id} /></div>
      break;
    case Array.isArray(conf.layoutContent) && isFluid(conf.layoutContent):
      console.debug("fluid layout", conf.layoutContent);
      layout = <Row>
        {(conf.layoutContent as TFluidLayout).map((content, index) => {
          const contentId = content.hasOwnProperty("id") ? `${id}/${(content as TWidget).id}` : id;
          return <Column
          colSize={content.colSize}
          key={`${contentId}-${index}`}
        >
          <Content conf={content} id={contentId} />
        </Column>})}
      </Row>
      break;
    case Array.isArray(conf.layoutContent) && isOneColumn(conf.layoutContent):
      console.debug("one column layout", conf.layoutContent);
      layout= <Row>
          <Column colSize={12}>
            <Content conf={conf.layoutContent} id={id} />
          </Column>
        </Row>
      break;
    case Array.isArray(conf.layoutContent) && Array.isArray(conf.layoutContent[0]) && isTwoColumn(conf.layoutContent):
      console.debug("two column layout", conf.layoutContent);
      layout = <Row>
        <Column colSize={6}>
          <Content conf={conf.layoutContent[0]} id={id} />
        </Column>
        <Column colSize={6}>
          <Content conf={conf.layoutContent[1]} id={id} />
        </Column>
      </Row>
      break;
    default:
      console.log("No matching layout found for conf", conf)
  }
  return layout;
}