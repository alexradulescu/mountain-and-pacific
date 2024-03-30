import { css } from '@acab/ecsstatic'
import { Anchor, Card, Group, SimpleGrid, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { Rocket } from 'iconoir-react'

const mockdata = [
  { title: 'Credit cards', icon: Rocket, color: 'violet' },
  { title: 'Banks nearby', icon: Rocket, color: 'indigo' },
  { title: 'Transfers', icon: Rocket, color: 'blue' },
  { title: 'Refunds', icon: Rocket, color: 'green' },
  { title: 'Receipts', icon: Rocket, color: 'teal' },
  { title: 'Taxes', icon: Rocket, color: 'cyan' },
  { title: 'Reports', icon: Rocket, color: 'pink' },
  { title: 'Payments', icon: Rocket, color: 'red' },
  { title: 'Cashback', icon: Rocket, color: 'orange' }
]

export const CardsGrid = () => {
  const theme = useMantineTheme()

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={ItemStyle}>
      <item.icon color={theme.colors[item.color][6]} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ))

  return (
    <Card withBorder radius="md" className={CardStyle}>
      <Group justify="space-between">
        <Text className={TitleStyle}>Services</Text>
        <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
          + 21 other services
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  )
}
const CardStyle = css`
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
`

const TitleStyle = css`
  font-family:
    Greycliff CF,
    var(--mantine-font-family);
  font-weight: 700;
`

const ItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: var(--mantine-radius-md);
  height: rem(90px);
  background-color: light-dark(var(--mantine-color-white), var(--mantine-color-dark-7));
  transition:
    box-shadow 150ms ease,
    transform 100ms ease;

  @mixin hover {
    box-shadow: var(--mantine-shadow-md);
    transform: scale(1.05);
  }
`
