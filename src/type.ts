export interface TodoProps {
    id: string,
    is_complete?: boolean
    priority?: string    // a character. A-Z Uppercase
    completionDate?: string    // format yyyy-mm-dd
    created_at: string    // format yyyy-mm-dd
    text: string
    detail: string
    project_id?: string    // +projctname
    context_id?: string    // @context    
}

export type Sort = "text" | "priority" | "context" | "creationDate" | "isCompletion" | undefined
export type Mode = "normal" | "edit" | "editOnSort" | "sort" | "command" | "number" | "search"

export interface ListProps {
    id?: string
    name: string
    created_at?: string
    updated_at?: string
}