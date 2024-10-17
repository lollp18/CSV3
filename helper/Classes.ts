const LastCurrentCell = {
  Row: 0,
  Column: 0,
  CellContent: "",
  Active: false,
}

export class Table {
  LastCell: LastCurrentCell
  CurrentCell: LastCurrentCell
  TableName: string
  TableData: TableDataMap

  constructor({
    CurrentCell = LastCurrentCell,
    LastCell = LastCurrentCell,
    TableName,
    TableData,
  }: TableType<TableDataMap>) {
    this.CurrentCell = CurrentCell
    this.LastCell = LastCell
    this.TableName = TableName
    this.TableData = TableData
  }

  CreateTableData(NewTableData: CsvData) {
    NewTableData.forEach((RowData, RowIndex) => {
      const NewRow: Row = new Map()
      this.TableData.set(RowIndex + 1, NewRow)
      RowData.forEach((CellValue, CellIndex) => {
        NewRow.set(CellIndex + 1, new Cell(CellValue))
      })
    })
  }
}

export class Cell {
  Active = false
  CellContent: string

  constructor(CellContent = "") {
    this.CellContent = CellContent.trim()
  }
}
export const Page = class {
  Number: number
  Start: number
  End: number

  constructor(End: number, Number: number = 1, Start: number = 1) {
    this.Number = Number
    this.Start = Start
    this.End = End
  }
}
