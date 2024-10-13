export const GenerateTableData = (NumberRows: number, NumberColumns: number) =>
  TableDataToMap(
    CsvDataToTableDataArray(
      Array.from({ length: NumberRows }, () =>
        Array.from({ length: NumberColumns }, () => "")
      )
    )
  )

export const CsvDataToTableDataArray = (CsvData: CsvData): TableDataArray =>
  CsvData.map((RowData, RowIndex) => [
    RowIndex + 1,
    RowData.map((CellValue, CellIndex) => [CellIndex + 1, new Cell(CellValue)]),
  ])

export const TableDataToMap = (TableData: TableDataArray) =>
  new Map(TableData.map(([RowIndex, Cells]) => [RowIndex, new Map(Cells)]))

export const TableDataToArray = (TableData: TableDataMap): TableDataArray =>
  Array.from(TableData).map(([, Row]) =>
    Array.from(Row).map(([, value]) => value)
  )
export function range(start: number, end: number, step = 1): number[] {
  const result = []
  let i = start

  while ((step > 0 && i <= end) || (step < 0 && i >= end)) {
    result.push(i)
    i += step
  }

  return result
}

export const GetEventValue = (e: Event) => (e.target as HTMLInputElement).value
