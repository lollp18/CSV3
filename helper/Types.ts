export type TableDataMap = Map<number, Map<number, TypeCell>>
export type TableDataArray = [[number, [[number, TypeCell]]]]
export type TableData = TableDataMap | TableDataArray
export type CsvData = Array<Array<string>>
export type Row = Map<number, TypeCell>
export type CurrentTable = TableType<TableDataMap>
export type CurrentTables = Map<number, TableType<TableDataMap>>
export type SendTables = Map<number, TableType<TableDataArray>>
export type ArrayPage = Array<Page>
export type ArrayNever = Array<never>
export type TypeCell = {
  Active: boolean
  CellContent: string
}
export type LastCurrentCell = {
  Row: number
  Column: number
  CellContent: string
  Active: boolean
}

export type TableType<TableDataType> = {
  LastCell: LastCurrentCell
  CurrentCell: LastCurrentCell
  TableName: string
  TableData: TableDataType
}
export type Page = {
  Number: number
  Start: number
  End: number
}
