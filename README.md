# Todoアプリ REST API

このAPIはTodoアプリのバックエンド機能を提供します。

## REST API

以下は、REST APIのエンドポイントとリクエスト・レスポンスの仕様です。

### Todoリストの取得

- **エンドポイント:** `/api/list`
- **メソッド:** GET
- **リクエスト:** なし
- **レスポンス:**

```json
[
    {
        "id": 1,
        "name": "買い物リスト",
        "user_id": 123
    },
    {
        "id": 2,
        "name": "プロジェクトA",
        "user_id": 123
    }
]
```

### 新しいTodoリストの作成

- **エンドポイント:** `/api/list`
- **メソッド:** POST
- **リクエスト:**

```json
{
    "name": "新しいリスト",
    "user_id": 123
}
```

- **レスポンス:**

```json
{
    "id": 3,
    "name": "新しいリスト",
    "user_id": 123
}
```

### Todoの取得

- **エンドポイント:** `/api/list/{UUID}/todo`
- **メソッド:** GET
- **リクエスト:** なし
- **レスポンス:**

```json
[
    {
        "id": 1,
        "name": "買い物リスト",
        "user_id": 123
    },
]
```

### Todoの追加

- **エンドポイント:** `/api/list/{UUID}/todo`
- **メソッド:** POST
- **リクエスト:**

```json
[
    {
        "id": 1,
        "name": "買い物リスト",
        "user_id": 123
    },
]
```

### タスクの取得

- **エンドポイント:** `/api/list/{UUID}/todo/{UUID}`
- **メソッド:** GET
- **リクエスト:** なし
- **レスポンス:**

```json
[
    {
        "id": 1,
        "name": "買い物リスト",
        "user_id": 123
    },
]
```

### タスクの更新

- **エンドポイント:** `/api/list/{UUID}/todo/{UUID}`
- **メソッド:** POST
- **リクエスト:**

```json
[
    {
        "id": 1,
        "name": "買い物リスト",
        "user_id": 123
    },
]
```

- **レスポンス:**


### TodoList

- Todoリストを表します。

#### テーブル設計

| カラム名     | データ型    | 説明             |
|--------------|-------------|------------------|
| id           | INT         | TodoリストのID   |
| name         | VARCHAR     | Todoリストの名前 |
| user_id      | INT         | ユーザーのID     |

### Todo

- Todo項目を表します。

#### テーブル設計

| カラム名       | データ型    | 説明             |
|----------------|-------------|------------------|
| id             | INT         | TodoのID         |
| title          | VARCHAR     | Todoのタイトル   |
| description    | TEXT        | Todoの説明       |
| due_date       | DATE        | Todoの締切日     |
| list_id        | INT         | Todoが所属するリストのID |

### TodoProject

- Todoプロジェクトを表します。

#### テーブル設計

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | INT         | TodoプロジェクトのID |
| name         | VARCHAR     | Todoプロジェクトの名前 |
| user_id      | INT         | ユーザーのID         |

### TodoLabel

- Todoラベルを表します。

#### テーブル設計

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | INT         | TodoラベルのID       |
| name         | VARCHAR     | Todoラベルの名前     |
| todo_id      | INT         | TodoのID             |

### User

- ユーザーを表します。

#### テーブル設計

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | INT         | ユーザーのID         |
| username     | VARCHAR     | ユーザー名           |
| email        | VARCHAR     | ユーザーのメールアドレス |
| password     | VARCHAR     | ユーザーのパスワード     |
