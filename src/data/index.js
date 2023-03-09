export const mockData = () => {
    const areaArr = []
    const string = '哈哈哈哈哈哈'
    for (let i = 1; i < 13; i++) {
        const area = {id: i, name: `地区${string.substring(0, Math.ceil(Math.random() * 4))}`, children: []}
        for (let j = 1; j < Math.ceil(Math.random() * 8) + 1; j++) {
            area.children.push({id: i * 10 + j, name: `方位${string.substring(0, Math.ceil(Math.random() * 4))}`})
        }
        areaArr.push(area)
    }
    return areaArr
}
