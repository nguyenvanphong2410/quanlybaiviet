module.exports = {
    PAGE_SIZE: 9,
    SORT_BY: "created_at",
    REGEX_VALIDATE_PASSWORD:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
    REGEX_VALIDATE_PHONE: /^(0[35789])[0-9]{8}$/,
    REGEX_VALIDATE_TAX_CODE: /^[0-9]{10}$/,
    REGEX_VALIDATE_FAX_NUMBER: /^\+[0-9]{1,3}\([0-9]{1,3}\)[0-9]{7,}$/,
    REGEX_VALIDATE_URL:
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
    ENTITY_TYPE: {
        ADMIN: 0,
        USER: 1,
    },
    MESSAGES: {
        // string
        "string.base": "{#label} phải là một chuỗi văn bản",
        "string.empty": "{#label} không được bỏ trống",
        "string.min": "{#label} không được ít hơn {#limit} ký tự",
        "string.max": "{#label} không được vượt quá {#limit} ký tự",
        "string.pattern.base": "{#label} không đúng định dạng",
        "string.email": "{#label} không đúng định dạng",
        // number
        "number.base": "{#label} phải là một số",
        "number.integer": "{#label} phải là một số nguyên",
        "number.min": "{#label} không được nhỏ hơn {#limit}",
        "number.max": "{#label} không được lớn hơn {#limit}",
        // array
        "array.base": "{#label} phải là một mảng",
        "array.unique": "{#label} không được giống nhau",
        "array.min": "{#label} không được ít hơn {#limit} phần tử",
        "array.max": "{#label} không được vượt quá {#limit} phần tử",
        "array.length": "{#label} phải đủ {#limit} phần tử",
        "array.includesRequiredUnknowns": "{#label} không hợp lệ",
        "array.includesRequiredKnowns": "{#label} không hợp lệ",
        // object
        "object.base": "{#label} không hợp lệ",
        "object.unknown": "Trường {#label} không được xác định",
        // any
        "any.only": "{#label} phải là một trong {#valids}",
        "any.required": "{#label} không được bỏ trống",
    },
};
