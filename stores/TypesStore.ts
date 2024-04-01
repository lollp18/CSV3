export type state = {
  UserData:
    | {
        Username: string
        _id: string
      }
    | undefined

  CurrentTable: CurrentTable | undefined

  CurrentTables: CurrentTables | ArrayNever

  CurrentTabelleID: NumberUndefined

  TabelenGröße: {
    höhe: number
    breite: number
  }

  ConfirmationWindow: {
    ConfirmationWindowOpen: Boolean
    Text: string
  }

  DownloadFileHref: string

  TableBearbeitenOpen: Boolean
  TableBearbeiten: {
    Error: StringUndefined

    Sections: {
      ZeileEinfügen: Boolean
      SpalteEinfügen: Boolean
      ZeileTauschen: Boolean
      SpalteTauschen: Boolean
      ZellenTauschen: Boolean
      Aside: Boolean
    }

    Einfügen: {
      Zeilen: {
        Zeile: NumberUndefined
        Position: "Über" | "Unter"
        Anzahl: NumberUndefined
      }
      Spalten: {
        Spalte: NumberUndefined
        Position: "R" | "L"
        Anzahl: NumberUndefined
      }
    }

    Tauschen: {
      Zeilen: {
        Erste: NumberUndefined
        Zweite: NumberUndefined
      }
      Spalten: {
        Erste: NumberUndefined
        Zweite: NumberUndefined
      }
    }
    ZellenTauschen: {
      ErsteZelle: {
        Zeile: NumberUndefined
        Spalte: NumberUndefined
      }
      ZweiteZelle: {
        Zeile: NumberUndefined
        Spalte: NumberUndefined
      }
    }
    ZeileTemp: {
      zeile: ArrayNever
      InsertPositon: NumberUndefined
    }
    SpalteTemp: {
      spalten: ArrayNever
      InsertPositon: NumberUndefined
    }
  }

  NewTableIsOpen: Boolean

  NewTable: {
    Error: StringUndefined
    TableName: string
    AnzahlZeilen: NumberUndefined
    AnzahlSpalten: NumberUndefined
  }

  Registrieren: {
    Username: StringUndefined
    Email: StringUndefined
    Passwort: StringUndefined
    PasswortWiederholen: StringUndefined
  }

  RegistrierenCheck: StringUndefined

  Anmelden: {
    Email: string
    Passwort: string
  }
  AbmeldenStatus: NumberUndefined
  AnmeldenCheck: StringUndefined

  AngemedetBleiben: Boolean
  SeitenVerwenden: {
    CurrentSeiten: ArraySeite | ArrayNever
    SeitenLängeMax: number
    SeitenLängeMin: number
    ZellenWidth: number
    SeitenAnzahl: number
    WindowHeight: number

    CurrentSeite: {
      Zahl: number
      Start: number
      Ende: NumberUndefined
    }
  }

  ApiURLs: {
    CurrentUrl: string
    BaseUrl: string
    BaseUrlLocl: string
    ApiUrlUsersRegistrieren: string
    ApiUrlUsersAnmelden: string
    ApiUrlUserTablen: StringUndefined
    ApiUrlDeletTable: StringUndefined
    requestOptions: {
      withCredentials: boolean
      baseURL: string
    }
  }
}
