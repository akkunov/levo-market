export function normalizeToJson(input: string): string {
    return input
        // ключи в кавычки
        .replace(/([А-Яа-яA-Za-z0-9\s]+):/g, '"$1":')
        // значения в кавычки (если не число)
        .replace(/:\s*([^\n,{}]+)/g, (_, val) => {
            const trimmed = val.trim()
            // если это число (например "25" или "743"), оставляем как строку тоже
            return `: "${trimmed}"`
        })
        // добавляем запятые в конце строк
        .replace(/"\s*\n\s*"/g, '",\n"')
}