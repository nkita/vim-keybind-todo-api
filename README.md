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
        "created_at": 1716378457
    },
    {
        "id": 2,
        "name": "プロジェクトA",
        "created_at":1716378457 
    }
]
```

### Todoリストの作成

- **エンドポイント:** `/api/list`
- **メソッド:** POST
- **リクエスト:**

```json
{
    "name": "新しいリスト",
}
```

- **レスポンス:**  なし

### Todoの取得

- **エンドポイント:** `/api/list/{UUID}/todo`
- **メソッド:** GET
- **リクエスト:** なし
- **レスポンス:**

```json
[
    {
        "id": 1,
        "isCompletion": true,
        "priority": "a",
        "creationDate":"yyyy-mm-dd",
        "text":"洗剤",
        "project":"プライベート",
        "context":"買い物"
    },
   {
        "id": 2,
        "isCompletion": true,
        "priority": "a",
        "creationDate":"yyyy-mm-dd",
        "text":"お昼ご飯",
        "project":"プライベート",
        "context":"買い物"
    }
]
```

### Todoの追加

- **エンドポイント:** `/api/list/{UUID}/todo`
- **メソッド:** POST
- **リクエスト:**

```json
[
   {
        "isCompletion": true,
        "priority": "a",
        "creationDate":"yyyy-mm-dd",
        "text":"お昼ご飯",
        "project":"プライベート",
        "context":"買い物"
    }
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
        "id": 2,
        "isCompletion": true,
        "priority": "a",
        "creationDate":"yyyy-mm-dd",
        "text":"お昼ご飯",
        "project":"プライベート",
        "context":"買い物",
        "detail":"時間が空いたときに買う"
    }
]
```

### タスクの更新

- **エンドポイント:** `/api/list/{UUID}/todo/{UUID}`
- **メソッド:** POST
- **リクエスト:**

```json
[
   {
        "id": 2,
        "isCompletion": true,
        "priority": "a",
        "creationDate":"yyyy-mm-dd",
        "text":"お昼ご飯",
        "project":"プライベート",
        "context":"買い物",
        "detail":"時間が空いたときに買う"
    }
]
```

- **レスポンス:**

## テーブル設計

### TodoList

| カラム名     | データ型    | 説明             |
|--------------|-------------|------------------|
| id           | VARCHAR    | TodoリストのID   |
| name         | VARCHAR    | Todoリストの名前 |
| created_at | INT | 作成日    |
| updated_at | INT | 作成日    |

### Todo

| カラム名        | データ型      | 説明            |
|----------------|-------------|-----------------|
| id             | VARCHAR     | TodoのID        |
| is_complete     | BOOLEAN     | Todoのタイトル   |
| priority       | VARCHAR     ||
| created_at      | DateTime    | 作成日|
| updated_at      | DateTime    | 更新日|
| completedAt    | DateTime    | 更新日|
| text           | VARCHAR     ||
| detail         | VARCHAR     | Todoの締切日     |
| projct_id      | VARCHAR     | fk|
| context_id     | VARCHAR     | fk |
| list_id        | VARCHAR     | fk Todoが所属するリストのID |

### TodoProject

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | VARCHAR | TodoプロジェクトのID |
| name         | VARCHAR     | Todoプロジェクトの名前 |
| todo_id      | VARCHAR | fk  TodoのID|

### TodoLabel

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | INT         | TodoラベルのID       |
| name         | VARCHAR     | Todoラベルの名前     |
| todo_id      | VARCHAR     | fk TodoのID             |

### User

- ユーザーを表します。

| カラム名     | データ型    | 説明                 |
|--------------|-------------|----------------------|
| id           | INT         | ユーザーのID         |
| username     | VARCHAR     | ユーザー名           |
| email        | VARCHAR     | ユーザーのメールアドレス |
