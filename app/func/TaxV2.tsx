import React, { useState } from 'react'

import { Group, NumberFormatter, Stack, Table, TextInput, Title } from '@mantine/core'

function calculateTax(income: number): number {
  if (income <= 20000) {
    return 0
  } else if (income <= 30000) {
    return 200 + (income - 20000) * 0.02
  } else if (income <= 40000) {
    return 350 + (income - 30000) * 0.035
  } else if (income <= 80000) {
    return 550 + (income - 40000) * 0.07
  } else if (income <= 120000) {
    return 3350 + (income - 80000) * 0.115
  } else if (income <= 160000) {
    return 7950 + (income - 120000) * 0.15
  } else if (income <= 200000) {
    return 13950 + (income - 160000) * 0.18
  } else if (income <= 240000) {
    return 21150 + (income - 200000) * 0.19
  } else if (income <= 280000) {
    return 28750 + (income - 240000) * 0.195
  } else if (income <= 320000) {
    return 36550 + (income - 280000) * 0.2
  } else if (income <= 500000) {
    return 44550 + (income - 320000) * 0.22
  } else if (income <= 1000000) {
    return 84150 + (income - 500000) * 0.23
  } else {
    return 199150 + (income - 1000000) * 0.24
  }
}

export const TaxV2: React.FC = () => {
  const [monthlySalary1, setMonthlySalary1] = useState<number | undefined>(undefined)
  const [monthlySalary2, setMonthlySalary2] = useState<number | undefined>(undefined)
  const [bonus1, setBonus1] = useState<number | undefined>(undefined)
  const [bonus2, setBonus2] = useState<number | undefined>(undefined)

  const calcEffectiveRate = (income: number, tax: number): number => {
    return (tax / income) * 100
  }

  const calculateResults = () => {
    const salary1 = monthlySalary1 ? monthlySalary1 * 12 + (bonus1 ?? 0) : 0
    const salary2 = monthlySalary2 ? monthlySalary2 * 12 + (bonus2 ?? 0) : 0

    const tax1 = calculateTax(salary1)
    const tax2 = calculateTax(salary2)

    return {
      salary1,
      salary2,
      tax1,
      tax2,
      monthlySave1: tax1 / 12,
      monthlySave2: tax2 / 12,
      net1: monthlySalary1 ? monthlySalary1 - tax1 / 12 : 0,
      net2: monthlySalary2 ? monthlySalary2 - tax2 / 12 : 0,
      effectiveRate1: calcEffectiveRate(salary1, tax1),
      effectiveRate2: calcEffectiveRate(salary2, tax2)
    }
  }

  const results = calculateResults()

  return (
    <Stack gap={'sm'}>
      <Title fw={400} order={3}>
        Tax Calculator
      </Title>
      <Group gap="sm" grow wrap="nowrap">
        <TextInput
          label="Monthly Salary 1"
          placeholder="30,000"
          value={monthlySalary1}
          type="number"
          className="form-control"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={(e) => setMonthlySalary1(parseFloat(e.target.value) || 0)}
        />
        <TextInput
          label="Annual Bonus 1"
          placeholder="300,000"
          value={bonus1}
          type="number"
          className="form-control"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={(e) => setBonus1(parseFloat(e.target.value) || 0)}
        />
      </Group>
      <Group gap="sm" grow wrap="nowrap">
        <TextInput
          label="Monthly Salary 2"
          placeholder="30,000"
          value={monthlySalary2}
          type="number"
          className="form-control"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={(e) => setMonthlySalary2(parseFloat(e.target.value) || 0)}
        />
        <TextInput
          label="Annual Bonus 2"
          placeholder="300,000"
          value={bonus2}
          type="number"
          className="form-control"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={(e) => setBonus2(parseFloat(e.target.value) || 0)}
        />
      </Group>

      <Table.ScrollContainer minWidth={375}>
        <Table w={'100%'}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Person</Table.Th>
              <Table.Th align="right">Mth tax</Table.Th>
              <Table.Th align="right">Mth left</Table.Th>
              <Table.Th align="right">Yrl tax</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {monthlySalary1 ? (
              <Table.Tr>
                <Table.Th>
                  P1{' '}
                  <small>
                    <NumberFormatter value={results.effectiveRate1} decimalScale={2} suffix="%" />
                  </small>
                </Table.Th>
                <Table.Td align="right">
                  <NumberFormatter value={results.monthlySave1} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
                <Table.Td align="right">
                  <NumberFormatter value={results.net1} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
                <Table.Td align="right">
                  <NumberFormatter value={results.tax1} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
              </Table.Tr>
            ) : null}

            {monthlySalary2 ? (
              <Table.Tr>
                <Table.Th>
                  P2{' '}
                  <small>
                    <NumberFormatter value={results.effectiveRate2} decimalScale={2} suffix="%" />
                  </small>
                </Table.Th>
                <Table.Td align="right">
                  <NumberFormatter value={results.monthlySave2} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
                <Table.Td align="right">
                  <NumberFormatter value={results.net2} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
                <Table.Td align="right">
                  <NumberFormatter value={results.tax2} decimalScale={0} thousandSeparator prefix="$" />
                </Table.Td>
              </Table.Tr>
            ) : null}

            {monthlySalary1 || monthlySalary2 ? (
              <Table.Tr>
                <Table.Th>Family</Table.Th>
                <Table.Td align="right">
                  ${Number((results.monthlySave1 + results.monthlySave2).toFixed()).toLocaleString()}
                </Table.Td>
                <Table.Td align="right">
                  <strong>${Number((results.net1 + results.net2).toFixed()).toLocaleString()}</strong>
                </Table.Td>
                <Table.Td align="right">${Number((results.tax1 + results.tax2).toFixed()).toLocaleString()}</Table.Td>
              </Table.Tr>
            ) : null}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  )
}
