export type ArrayNever = Array<never>

export type TypeCell = {
  Active: boolean
  CellContent: string
}

export class Cell {
  Active = false
  CellContent: string

  constructor(CellContent = "") {
    this.CellContent = CellContent.trim()
  }
}

export type TableDataMap = Map<number, Map<number, TypeCell>>
export type TableDataArray = [[number, [[number, TypeCell]]]]
export type TableData = TableDataMap | TableDataArray
export type CsvData = Array<Array<string>>
export type Row = Map<number, TypeCell>
export type CurrentTable = TableType<TableDataMap>
export type CurrentTables = Map<number, TableType<TableDataMap>>
export type SendTables = Map<number, TableType<TableDataArray>>

export interface LastCurrentCell {
  Row: number
  Column: number
  CellContent: string
  Active: boolean
}

export interface TableType<TableDataType> {
  LastCell: LastCurrentCell
  CurrentCell: LastCurrentCell
  TableName: string
  TableData: TableDataType
}

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

  SetLastAndCurrentCell(
    LastCell: LastCurrentCell,
    CurrentCell: LastCurrentCell
  ) {
    this.LastCell = LastCell
    this.CurrentCell = CurrentCell
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

export type ArrayPage = Array<Page>
export type Page = {
  Number: number
  Start: number
  End: number
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
