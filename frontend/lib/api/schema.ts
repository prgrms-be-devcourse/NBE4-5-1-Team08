/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/orders/{orderId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getOrderItemList"];
        put: operations["updateOrderInfo"];
        post?: never;
        delete: operations["deleteOrderInfo"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/orders/{orderId}/{orderItemId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["updateOrderItem"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
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
    "/v1/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["createOrder"];
        delete?: never;
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
    "/v1/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getCategoryList"];
        put?: never;
        post: operations["createCategory"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/statistics/hourly": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getHourlySales"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/statistics/daily": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getDailySales"];
        put?: never;
        post?: never;
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
        UpdateReqBody: {
            /** @enum {string} */
            orderStatus: "ORDERED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
            memberEmail?: string;
            memberAddress?: string;
        };
        Item: {
            /** Format: int64 */
            itemId?: number;
            itemName?: string;
            category?: string;
            description?: string;
            /** Format: int32 */
            stockQuantity?: number;
            /** Format: int32 */
            price?: number;
            imageUrl?: string;
            orderItems?: components["schemas"]["OrderItem"][];
            deleted?: boolean;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            modifiedAt?: string;
        };
        OrderInfo: {
            /** Format: int64 */
            orderId?: number;
            /** @enum {string} */
            orderStatus?: "ORDERED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
            memberEmail?: string;
            memberAddress?: string;
            memberPassword?: string;
            orderItems?: components["schemas"]["OrderItem"][];
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            modifiedAt?: string;
        };
        OrderItem: {
            /** Format: int64 */
            id?: number;
            item?: components["schemas"]["Item"];
            orderInfo?: components["schemas"]["OrderInfo"];
            /** Format: int32 */
            orderPrice?: number;
            /** Format: int32 */
            quantity?: number;
        };
        RsDataOrderInfo: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["OrderInfo"];
        };
        UpdateOrderItemReqBody: {
            /** Format: int64 */
            itemId: number;
            /** Format: int32 */
            quantity: number;
        };
        RsDataOrderItem: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["OrderItem"];
        };
        ItemForm: {
            itemName: string;
            category: string;
            description: string;
            /** Format: int32 */
            stockQuantity: number;
            /** Format: int32 */
            price: number;
            /** Format: binary */
            itemImage?: string;
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
            imageUrl?: string;
        };
        RsDataItemDto: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["ItemDto"];
        };
        OrderForm: {
            itemList?: components["schemas"]["OrderItemDto"][];
            memberEmail?: string;
            memberPassword?: string;
            memberAddress?: string;
        };
        OrderItemDto: {
            /** Format: int64 */
            itemId?: number;
            itemName?: string;
            /** Format: int32 */
            quantity?: number;
            /** Format: int32 */
            price?: number;
        };
        RsDataLong: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            /** Format: int64 */
            data?: number;
        };
        CategoryForm: {
            categoryName?: string;
        };
        CategoryDto: {
            /** Format: int64 */
            categoryId?: number;
            categoryName?: string;
        };
        RsDataCategoryDto: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["CategoryDto"];
        };
        RsDataListEntryIntegerInteger: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: {
                /** Format: int32 */
                value?: number;
                /** Format: int32 */
                key?: number;
            }[];
        };
        RsDataListEntryLocalDateInteger: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: {
                /** Format: int32 */
                value?: number;
                /** Format: date */
                key?: string;
            }[];
        };
        OrderInfoDto: {
            /** Format: int64 */
            orderId?: number;
            /** @enum {string} */
            orderStatus?: "ORDERED" | "SHIPPING" | "DELIVERED" | "CANCELLED";
            memberEmail?: string;
            memberAddress?: string;
            orderItems?: components["schemas"]["OrderItemDto"][];
        };
        RsDataOrderInfoDto: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["OrderInfoDto"];
        };
        RsDataListItemDto: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["ItemDto"][];
        };
        RsDataListCategoryDto: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
            success?: boolean;
            message?: string;
            data?: components["schemas"]["CategoryDto"][];
        };
        RsDataVoid: {
            /** @enum {string} */
            status?: "100 CONTINUE" | "101 SWITCHING_PROTOCOLS" | "102 PROCESSING" | "103 EARLY_HINTS" | "103 CHECKPOINT" | "200 OK" | "201 CREATED" | "202 ACCEPTED" | "203 NON_AUTHORITATIVE_INFORMATION" | "204 NO_CONTENT" | "205 RESET_CONTENT" | "206 PARTIAL_CONTENT" | "207 MULTI_STATUS" | "208 ALREADY_REPORTED" | "226 IM_USED" | "300 MULTIPLE_CHOICES" | "301 MOVED_PERMANENTLY" | "302 FOUND" | "302 MOVED_TEMPORARILY" | "303 SEE_OTHER" | "304 NOT_MODIFIED" | "305 USE_PROXY" | "307 TEMPORARY_REDIRECT" | "308 PERMANENT_REDIRECT" | "400 BAD_REQUEST" | "401 UNAUTHORIZED" | "402 PAYMENT_REQUIRED" | "403 FORBIDDEN" | "404 NOT_FOUND" | "405 METHOD_NOT_ALLOWED" | "406 NOT_ACCEPTABLE" | "407 PROXY_AUTHENTICATION_REQUIRED" | "408 REQUEST_TIMEOUT" | "409 CONFLICT" | "410 GONE" | "411 LENGTH_REQUIRED" | "412 PRECONDITION_FAILED" | "413 PAYLOAD_TOO_LARGE" | "413 REQUEST_ENTITY_TOO_LARGE" | "414 URI_TOO_LONG" | "414 REQUEST_URI_TOO_LONG" | "415 UNSUPPORTED_MEDIA_TYPE" | "416 REQUESTED_RANGE_NOT_SATISFIABLE" | "417 EXPECTATION_FAILED" | "418 I_AM_A_TEAPOT" | "419 INSUFFICIENT_SPACE_ON_RESOURCE" | "420 METHOD_FAILURE" | "421 DESTINATION_LOCKED" | "422 UNPROCESSABLE_ENTITY" | "423 LOCKED" | "424 FAILED_DEPENDENCY" | "425 TOO_EARLY" | "426 UPGRADE_REQUIRED" | "428 PRECONDITION_REQUIRED" | "429 TOO_MANY_REQUESTS" | "431 REQUEST_HEADER_FIELDS_TOO_LARGE" | "451 UNAVAILABLE_FOR_LEGAL_REASONS" | "500 INTERNAL_SERVER_ERROR" | "501 NOT_IMPLEMENTED" | "502 BAD_GATEWAY" | "503 SERVICE_UNAVAILABLE" | "504 GATEWAY_TIMEOUT" | "505 HTTP_VERSION_NOT_SUPPORTED" | "506 VARIANT_ALSO_NEGOTIATES" | "507 INSUFFICIENT_STORAGE" | "508 LOOP_DETECTED" | "509 BANDWIDTH_LIMIT_EXCEEDED" | "510 NOT_EXTENDED" | "511 NETWORK_AUTHENTICATION_REQUIRED";
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
    getOrderItemList: {
        parameters: {
            query?: never;
            header: {
                memberPassword: string;
            };
            path: {
                orderId: number;
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
                    "*/*": components["schemas"]["RsDataOrderInfoDto"];
                };
            };
        };
    };
    updateOrderInfo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateReqBody"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataOrderInfo"];
                };
            };
        };
    };
    deleteOrderInfo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: number;
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
    updateOrderItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderItemId: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateOrderItemReqBody"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataOrderItem"];
                };
            };
        };
    };
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
            query: {
                requestForm: components["schemas"]["ItemForm"];
            };
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
    createOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OrderForm"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataLong"];
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
            query: {
                requestForm: components["schemas"]["ItemForm"];
            };
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
                    "*/*": components["schemas"]["RsDataItemDto"];
                };
            };
        };
    };
    getCategoryList: {
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
                    "*/*": components["schemas"]["RsDataListCategoryDto"];
                };
            };
        };
    };
    createCategory: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CategoryForm"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RsDataCategoryDto"];
                };
            };
        };
    };
    getHourlySales: {
        parameters: {
            query?: {
                date?: string;
            };
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
                    "*/*": components["schemas"]["RsDataListEntryIntegerInteger"];
                };
            };
        };
    };
    getDailySales: {
        parameters: {
            query: {
                startDate: string;
                endDate: string;
            };
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
                    "*/*": components["schemas"]["RsDataListEntryLocalDateInteger"];
                };
            };
        };
    };
}
