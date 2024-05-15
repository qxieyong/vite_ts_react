
function updateDecimal(value: number | string, len?: number) {
    if (typeof value === 'number' && isNaN(value)) return '--';
    if (typeof value === 'string') value = Number(value);
    // 将数字转换为字符串，并按小数点分割
    const parts = value.toFixed(len || 4).split('.');
    // 获取小数点后面的部分
    let decimal = parts[1];
    if(!decimal) return '--';
    // 移除尾部的零
    while (decimal && decimal.endsWith('0')) {
        decimal = decimal.slice(0, -1);
    }

    // 如果小数点后没有数字了，则直接返回整数部分
    if (decimal.length === 0) {
        return parts[0];
    }

    // 否则，返回包含小数点的结果
    return `${parts[0]}.${decimal}`;
}

export default updateDecimal;