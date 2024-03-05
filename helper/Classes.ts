export type NumberUndefined = number | undefined
export type StringUndefined = string | undefined
export type ArrayNever = Array<never>

export interface Zelle {
  Activ: Boolean
  ZellenInhalt: string
}

export const Zelle = class {
  Activ: Boolean = false
  ZellenInhalt: string
  constructor(ZellenInhalt: string = "") {
    this.ZellenInhalt = ZellenInhalt.trim()
  }
}

export type TableDataMap = Map<number, Map<number, Zelle>>
export type TableDataArray = Array<Array<Zelle>>
export type TableData = TableDataMap | TableDataArray
export type parsCsvDatei = Array<Array<string>>
export type Zeile = Map<Number, Zelle>
export type CurrentTable = Table<TableDataMap>
export type CurrentTables = Array<Table<TableDataMap>>
export type SendTables = Array<Table<TableDataArray>>

export interface LastCurrentZelle {
  Zeile: number
  Spalte: number
  ZellenInhalt: string
  Activ: Boolean
}

export interface Table<TableDataType> {
  LastZelle: LastCurrentZelle
  CurrentZelle: LastCurrentZelle
  TableName: string
  TableData: TableDataType
}

export const Table = class {
  private LastZelle: LastCurrentZelle
  private CurrentZelle: LastCurrentZelle
  private TableName: string
  private TableData: TableData

  constructor(TableName: string) {
    this.CurrentZelle = {
      Zeile: 0,
      Spalte: 0,
      ZellenInhalt: "",
      Activ: false,
    }

    this.LastZelle = {
      Zeile: 0,
      Spalte: 0,
      ZellenInhalt: "",
      Activ: false,
    }

    this.TableName = TableName
    this.TableData = new Map()
  }
  static PrepareTableToStore(
    SendTables: Array<Table<TableDataArray>>
  ): CurrentTables {
    const CurrentTables: CurrentTables = []

    SendTables.forEach(({ TableName, TableData, LastZelle, CurrentZelle }) => {
      const CurrentTable = new Table(TableName)
      CurrentTable.TableDataToMap(TableData)
      CurrentTable.SetLastUndCurrentZelle(LastZelle, CurrentZelle)
      CurrentTables.push(CurrentTable)
    })
    return CurrentTables
  }
  static PrepareTableToSend(
    CurrentTables: CurrentTables
  ): Array<Table<TableDataArray>> {
    const SendTables: SendTables = []
    CurrentTables.forEach(
      ({ TableName, TableData, LastZelle, CurrentZelle }) => {
        const SendTable = new Table(TableName)
        SendTable.TableDataToArray(TableData)
        SendTable.SetLastUndCurrentZelle(LastZelle, CurrentZelle)
        SendTables.push(SendTable)
      }
    )
    return SendTables
  }

  SetLastUndCurrentZelle(
    LastZelle: LastCurrentZelle,
    CurrentZelle: LastCurrentZelle
  ) {
    this.LastZelle = LastZelle
    this.CurrentZelle = CurrentZelle
  }

  CreateTableData(NewTableData: parsCsvDatei) {
    NewTableData.forEach((Zeile, ZeileIndex) => {
      const NewZeile: Zeile = new Map()
      this.TableData.set(ZeileIndex + 1, NewZeile)
      Zeile.forEach((ZelleValue, ZelleIndex) => {
        NewZeile.set(ZelleIndex + 1, new Zelle(ZelleValue))
      })
    })
  }
  GenerateTableData(AnzahlZeilen: number, AnzahlSpalten: number) {
    const Zeile: Array<string> = Array(Number(AnzahlZeilen)).fill("")

    const NewTableData: Array<Array<string>> = Array(
      Number(AnzahlSpalten)
    ).fill(Zeile)
    this.CreateTableData(NewTableData)
  }

  TableDataToMap(TableData: TableDataArray) {
    TableData.forEach((Zeile, ZeileIndex) => {
      const NewZeile = new Map()
      this.TableData.set(ZeileIndex + 1, NewZeile)
      Zeile.forEach((Zelle, ZelleIndex) => {
        NewZeile.set(ZelleIndex + 1, Zelle)
      })
    })
  }

  TableDataToArray(TableData: TableDataMap) {
    this.TableData = []
    TableData.forEach((Zeile) => {
      this.TableData.push(Array.from(Zeile).map(([name, value]) => value))
    })
  }
}

export type ArraySeite = Array<Seite>
export type Seite = {
  Zahl: number
  Start: number
  Ende: number
}

export const Seite = class {
  private Zahl: number
  private Start: number
  private Ende: number

  constructor(
    Zahl: number = 1,
    Start: number = 1,
    Ende: number = store.SeitenVerwenden.SeitenLängeMax - 1
  ) {
    this.Zahl = Zahl
    this.Start = Start
    this.Ende = Ende
  }
}
