/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/items/{itemId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getItemById"];
        put: operations["updateItem"];
        post?: never;
        delete: operations["deleteItemById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getItemList"];
        put?: never;
        post: operations["createItem"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}

export type webhooks = Record<string, never>;

export interface components {
    schemas: {
        ItemForm: {
            itemName?: string;
            category?: string;
            description?: string;
            /** Format: int32 */
            stockQuantity?: number;
            /** Format: int32 */
            price?: number;
        };
        ItemDto: {
            /** Format: int64 */
            itemId?: number;
            itemName?: string;
            category?: string;
            description?: string;
            /** Format: int32 */
            stockQuantity?: number;
            /** Format: int32 */
            price?: number;
        };
        RsDataItemDto: {
            success?: boolean;
            message?: string;
            data?: components["schemas"]["ItemDto"];
        };
        RsDataListItemDto: {
            success?: boolean;
            message?: string;
            data?: components["schemas"]["ItemDto"][];
        };
        RsDataVoid: {
            success?: boolean;
            message?: string;
            data?: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

export type $defs = Record<string, never>;

export interface operations {
    getItemById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                itemId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataItemDto"];
                };
            };
        };
    };
    updateItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                itemId: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ItemForm"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataItemDto"];
                };
            };
        };
    };
    deleteItemById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                itemId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataVoid"];
                };
            };
        };
    };
    getItemList: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataListItemDto"];
                };
            };
        };
    };
    createItem: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ItemForm"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataItemDto"];
                };
            };
        };
    };
}
