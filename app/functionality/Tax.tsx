import React, { useState } from 'react'

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

interface SalaryInputProps {
  label: string
  value: number | undefined
  onChange: (value: number) => void
}

const SalaryInput: React.FC<SalaryInputProps> = ({ label, value, onChange }) => (
  <label>
    <span>{label}</span>
    <input
      type="number"
      className="form-control"
      pattern="[0-9]*"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    />
  </label>
)

export const TaxCalculator: React.FC = () => {
  const [monthlySalary1, setMonthlySalary1] = useState<number | undefined>(undefined)
  const [monthlySalary2, setMonthlySalary2] = useState<number | undefined>(undefined)
  const [bonus1, setBonus1] = useState<number | undefined>(undefined)
  const [bonus2, setBonus2] = useState<number | undefined>(undefined)

  const calcEffectiveRate = (income: number, tax: number): string => {
    return ((tax / income) * 100).toFixed(2) + '%'
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
    <form>
      <h1>Tax Calculator</h1>
      <aside>
        <SalaryInput label="Monthly Salary 1" value={monthlySalary1} onChange={(value) => setMonthlySalary1(value)} />
        <SalaryInput label="Bonus 1" value={bonus1} onChange={(value) => setBonus1(value)} />
      </aside>
      <aside>
        <SalaryInput label="Monthly Salary 2" value={monthlySalary2} onChange={(value) => setMonthlySalary2(value)} />
        <SalaryInput label="Bonus 2" value={bonus2} onChange={(value) => setBonus2(value)} />
      </aside>
      <hr />
      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Person</th>
              <th style={{ textAlign: 'right' }}>Mth tax</th>
              <th style={{ textAlign: 'right' }}>Mth left</th>
              <th style={{ textAlign: 'right' }}>Yrl tax</th>
            </tr>
          </thead>
          <tbody>
            {monthlySalary1 ? (
              <tr>
                <th>
                  P1 <small>{results.effectiveRate1}</small>
                </th>
                <td style={{ textAlign: 'right' }}>${Number(results.monthlySave1.toFixed()).toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>${Number(results.net1.toFixed()).toLocaleString()}</strong>
                </td>
                <td style={{ textAlign: 'right' }}>${Number(results.tax1.toFixed()).toLocaleString()}</td>
              </tr>
            ) : null}

            {monthlySalary2 ? (
              <tr>
                <th>
                  P2 <small>{results.effectiveRate2}</small>
                </th>
                <td style={{ textAlign: 'right' }}>${Number(results.monthlySave2.toFixed()).toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>${Number(results.net2.toFixed()).toLocaleString()}</strong>
                </td>
                <td style={{ textAlign: 'right' }}>${Number(results.tax2.toFixed()).toLocaleString()}</td>
              </tr>
            ) : null}

            {monthlySalary1 || monthlySalary2 ? (
              <tr>
                <th>Family</th>
                <td style={{ textAlign: 'right' }}>
                  ${Number((results.monthlySave1 + results.monthlySave2).toFixed()).toLocaleString()}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <strong>${Number((results.net1 + results.net2).toFixed()).toLocaleString()}</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  ${Number((results.tax1 + results.tax2).toFixed()).toLocaleString()}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </form>
  )
}
