import { FC } from 'react'

import { css } from '@acab/ecsstatic'
import { Button, Paper, Text, Title } from '@mantine/core'

interface Props {
  bgImage?: string
  category?: string
  title: string
}

export const ArticleCardImage: FC<Props> = ({ bgImage, category, title }) => {
  return (
    <Paper shadow="md" p="md" radius="md" className={Card} style={{ backgroundImage: bgImage }}>
      <div>
        {category ? (
          <Text className={Category} size="xs">
            {category}
          </Text>
        ) : null}
        <Title order={3} className={TitleCss}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  )
}

const Card = css`
  height: rem(440px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
`

const TitleCss = css`
  font-family:
    Greycliff CF,
    var(--mantine-font-family);
  font-weight: 900;
  color: var(--mantine-color-white);
  line-height: 1.2;
  font-size: rem(32px);
  margin-top: var(--mantine-spacing-xs);
`

const Category = css`
  color: var(--mantine-color-white);
  opacity: 0.7;
  font-weight: 700;
  text-transform: uppercase;
`
