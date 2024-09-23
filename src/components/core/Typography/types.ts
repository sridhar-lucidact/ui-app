export type FontFamily = 'Inter' | 'Inter Tight';

export type TypographyVariant =
    | 'big-title'
    | 'h1'
    | 'h1-title'
    | 'h2'
    | 'h2-title'
    | 'body'
    | 'body-semibold'
    | 'subtitle'
    | 'subtitle-medium'
    | 'subtitle-semibold'
    | 'subtitle-s2'
    | 'subtitle-medium-s2'
    | 'subtitle-semibold-s2'
    | 'span'
    | 'inline';

export type PartialTypographyProps = Partial<{
    className: string;
    family: FontFamily;
    variant: TypographyVariant;
    tag: string;
    uppercase: boolean;
    enableLetterSpacing: boolean;
    onClick: ()=> void
}>;

export type TypographyProps = {
    children: React.ReactNode;
} & PartialTypographyProps;
