export type StateMainStore = {
  UserData: {
    Username: string
    _id: string
  }

  CurrentTable: CurrentTable

  CurrentTables: CurrentTables

  CurrentTableId: number

  TableSize: {
    Height: number
    Width: number
  }

  ConfirmationWindow: {
    IsOpen: boolean
    Text: string
  }

  DownloadFileHref: string

  NewTable: {
    IsOpen: boolean
    Error: string
    TableName: string
    NumberOfRows: number
    NumberOfColumns: number
  }

  PageSettings: {
    CurrentPages: ArrayPage
    MaxPageLength: number
    MinPageLength: number
    CellWidth: number
    NumberOfPages: number
    WindowHeight: number

    CurrentPage: {
      Number: number
      Start: number
      End: number
    }
  }

  ApiURLs: {
    CurrentUrl: string
    BaseUrl: string
    LocalBaseUrl: string
    ApiUrlUserSignUp: string
    ApiUrlUserLogin: string
    ApiUrlUserTables: string
    ApiUrlDeleteTable: string
    requestOptions: {
      withCredentials: boolean
      baseURL: string
    }
  }
}

export type LoginData = {
  Email: string
  Password: string
}

export type StateAuthStore = {
  StorageData: LoginData
  SignUpData: {
    Username: string
    Email: string
    Password: string
    PasswordRepeat: string
  }

  SignUpCheck: string

  LoginData: LoginData
  LogoutStatus: number
  LoginCheck: string

  StayConnected: boolean
}
export type StateTableEditStore = {
  IsOpen: boolean
  Error: string

  CurrentSection: string
  Sections: {
    InsertRow: string
    InsertColumn: string
    SwapRows: string
    SwapColumns: string
    SwapCells: string
  }
  Navigation: boolean

  Insert: {
    Rows: {
      Row: number
      Position: "Above" | "Below"
      Amount: number
    }
    Columns: {
      Column: number
      Position: "R" | "L"
      Amount: number
    }
  }

  Swap: {
    Rows: {
      First: number
      Second: number
    }
    Columns: {
      First: number
      Second: number
    }
  }

  SwapCells: {
    FirstCell: {
      Row: number
      Column: number
    }
    SecondCell: {
      Row: number
      Column: number
    }
  }

  TempRow: {
    row: ArrayNever
    InsertPosition: number
  }

  TempColumn: {
    columns: ArrayNever
    InsertPosition: number
  }
}
